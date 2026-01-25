import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { supabase } from "@/lib/supabase";

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
        const leadId = parseInt(callbackData.replace("approve_cal_", ""), 10);

        if (isNaN(leadId)) {
          if (chatId) {
            await sendTelegramMessage(chatId, "❌ Невалиден ID на запитване.");
          }
          return NextResponse.json({ ok: true });
        }

        // Fetch lead from database
        const { data: lead, error } = await supabase
          .from("leads")
          .select("id, name, phone, service_type, preferred_date_time")
          .eq("id", leadId)
          .single();

        if (error || !lead) {
          if (chatId) {
            await sendTelegramMessage(chatId, "❌ Запитването не беше намерено.");
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
