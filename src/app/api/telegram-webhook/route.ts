import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getSupabaseServiceClient } from "@/lib/supabase";

const serviceLabels: Record<string, string> = {
  "home-office": "Почистване на домове и офиси",
  furniture: "Пране на мека мебел",
  carpets: "Пране на килими и мокети",
  renovation: "Почистване след ремонт",
};

function getGoogleAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("Google credentials are not configured");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

async function sendTelegramMessage(chatId: string, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error("TELEGRAM_BOT_TOKEN is not set");
    return;
  }

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) return;

  await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text || "Обработва се...",
    }),
  });
}

async function createCalendarEvent(lead: {
  id: number;
  name: string;
  phone: string;
  service_type: string;
  preferred_date_time: string | null;
}) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!calendarId) {
    throw new Error("GOOGLE_CALENDAR_ID is not configured");
  }

  const auth = getGoogleAuth();
  const calendar = google.calendar({ version: "v3", auth });

  // Use preferred date/time or default to tomorrow
  let startTime: Date;
  if (lead.preferred_date_time) {
    startTime = new Date(lead.preferred_date_time);
  } else {
    startTime = new Date();
    startTime.setDate(startTime.getDate() + 1);
    startTime.setHours(10, 0, 0, 0); // Default to 10:00 AM
  }

  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 2); // 2-hour appointment

  const serviceLabel = serviceLabels[lead.service_type] || lead.service_type;

  const event = {
    summary: `🧹 Почистване: ${lead.name}`,
    description: `📞 Телефон: ${lead.phone}\n🧹 Услуга: ${serviceLabel}`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: "Europe/Sofia",
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: "Europe/Sofia",
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
  });

  return response.data;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle callback query (button click)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const callbackData = callbackQuery.data as string;
      const chatId = callbackQuery.message?.chat?.id?.toString();

      // Answer the callback query immediately
      await answerCallbackQuery(callbackQuery.id);

      // Check if this is a calendar approval
      if (callbackData.startsWith("approve_cal_")) {
        const leadIdString = callbackData.replace("approve_cal_", "").trim();
        const leadId = Number(leadIdString);

        console.log("[Telegram Webhook] ========== DEBUG START ==========");
        console.log("[Telegram Webhook] Raw callback_data:", JSON.stringify(callbackData));
        console.log("[Telegram Webhook] Extracted leadIdString:", JSON.stringify(leadIdString));
        console.log("[Telegram Webhook] leadIdString length:", leadIdString.length);
        console.log("[Telegram Webhook] leadIdString charCodes:", [...leadIdString].map(c => c.charCodeAt(0)));
        console.log("[Telegram Webhook] Parsed leadId (using Number()):", leadId);
        console.log("[Telegram Webhook] typeof leadId:", typeof leadId);
        console.log("[Telegram Webhook] isNaN(leadId):", isNaN(leadId));
        console.log("[Telegram Webhook] leadId > 0:", leadId > 0);

        if (isNaN(leadId) || leadId <= 0) {
          console.error("[Telegram Webhook] Invalid leadId - not a valid positive number");
          if (chatId) {
            await sendTelegramMessage(chatId, `❌ Невалиден ID на запитване: "${leadIdString}"`);
          }
          return NextResponse.json({ ok: true });
        }

        // Fetch lead from database using service role client to bypass RLS
        let supabaseService;
        try {
          supabaseService = getSupabaseServiceClient();
          console.log("[Telegram Webhook] Supabase service client created successfully");
        } catch (clientError) {
          console.error("[Telegram Webhook] Failed to create Supabase client:", clientError);
          if (chatId) {
            await sendTelegramMessage(chatId, "❌ Грешка при свързване с базата данни.");
          }
          return NextResponse.json({ ok: true });
        }

        // First, let's check what's in the leads table
        console.log("[Telegram Webhook] Checking all leads in table...");
        const { data: allLeads, error: allLeadsError } = await supabaseService
          .from("leads")
          .select("id")
          .order("id", { ascending: false })
          .limit(5);

        console.log("[Telegram Webhook] Recent lead IDs:", JSON.stringify(allLeads));
        console.log("[Telegram Webhook] All leads error:", JSON.stringify(allLeadsError));

        console.log("[Telegram Webhook] Querying leads table for id:", leadId, "type:", typeof leadId);

        const { data: lead, error } = await supabaseService
          .from("leads")
          .select("id, name, phone, service_type, preferred_date_time")
          .eq("id", leadId)
          .single();

        console.log("[Telegram Webhook] Supabase query completed");
        console.log("[Telegram Webhook] Lead data:", JSON.stringify(lead));
        console.log("[Telegram Webhook] Error:", JSON.stringify(error));
        console.log("[Telegram Webhook] ========== DEBUG END ==========");

        if (error || !lead) {
          console.error("[Telegram Webhook] Lead not found. Error details:", {
            errorCode: error?.code,
            errorMessage: error?.message,
            errorDetails: error?.details,
            errorHint: error?.hint,
          });
          if (chatId) {
            await sendTelegramMessage(chatId, `❌ Запитването с ID ${leadId} не беше намерено.`);
          }
          return NextResponse.json({ ok: true });
        }

        // Create Google Calendar event
        try {
          await createCalendarEvent(lead);

          if (chatId) {
            await sendTelegramMessage(
              chatId,
              "✅ Събитието е добавено успешно в календара!"
            );
          }
        } catch (calendarError) {
          console.error("Failed to create calendar event:", calendarError);
          if (chatId) {
            await sendTelegramMessage(
              chatId,
              "❌ Грешка при добавяне в календара. Моля, проверете настройките."
            );
          }
        }
      }

      return NextResponse.json({ ok: true });
    }

    // For other update types, just acknowledge
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

// Telegram sends GET requests to verify the webhook
export async function GET() {
  return NextResponse.json({ status: "Webhook is active" });
}
