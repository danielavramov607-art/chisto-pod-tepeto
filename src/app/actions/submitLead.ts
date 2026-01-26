"use server";

import { getSupabaseServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type LeadFormData = {
  name: string;
  phone: string;
  serviceType: string;
  preferredDateTime: string;
  message: string;
};

export type SubmitLeadResult = {
  success: boolean;
  message: string;
};

const serviceLabels: Record<string, string> = {
  "home-office": "Почистване на домове и офиси",
  furniture: "Пране на мека мебел",
  carpets: "Пране на килими и мокети",
  renovation: "Почистване след ремонт",
};

function formatPreferredDateTime(dateTimeString: string): string {
  if (!dateTimeString) return "";
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString("bg-BG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateTimeString;
  }
}

function getEmailTemplate(data: LeadFormData): string {
  const serviceLabel = serviceLabels[data.serviceType] || data.serviceType;
  const messageContent = data.message.trim() || "Няма допълнително съобщение";
  const preferredDateTimeFormatted = formatPreferredDateTime(data.preferredDateTime);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14b8a6 0%, #22c55e 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Ново запитване</h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">Получихте ново запитване от уебсайта</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <!-- Customer Name -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Име на клиента</p>
                <p style="margin: 0; font-size: 18px; font-weight: 600; color: #111827;">${data.name.trim()}</p>
              </div>

              <!-- Phone -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Телефон</p>
                <p style="margin: 0;">
                  <a href="tel:${data.phone.trim()}" style="font-size: 18px; font-weight: 600; color: #14b8a6; text-decoration: none;">${data.phone.trim()}</a>
                </p>
              </div>

              <!-- Service Type -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Тип услуга</p>
                <span style="display: inline-block; padding: 8px 16px; background-color: #f0fdfa; color: #0d9488; font-size: 14px; font-weight: 600; border-radius: 8px;">${serviceLabel}</span>
              </div>

              ${preferredDateTimeFormatted ? `
              <!-- Preferred Date and Time -->
              <div style="margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Предпочитана дата и час</p>
                <span style="display: inline-block; padding: 8px 16px; background-color: #fef3c7; color: #92400e; font-size: 14px; font-weight: 600; border-radius: 8px;">📅 ${preferredDateTimeFormatted}</span>
              </div>
              ` : ''}

              <!-- Message -->
              <div style="margin-bottom: 0;">
                <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Съобщение</p>
                <div style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #14b8a6;">
                  <p style="margin: 0; font-size: 15px; color: #374151; line-height: 1.6;">${messageContent}</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #6b7280; text-align: center;">
                Това съобщение е изпратено автоматично от контактната форма на вашия уебсайт.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

async function sendEmailNotification(data: LeadFormData): Promise<void> {
  const contactEmail = process.env.CONTACT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;

  console.log("[Email] Starting email notification...");
  console.log("[Email] RESEND_API_KEY exists:", !!resendApiKey);
  console.log("[Email] CONTACT_EMAIL exists:", !!contactEmail);

  if (!resendApiKey) {
    console.error("[Email] ERROR: RESEND_API_KEY environment variable is not set");
    return;
  }

  if (!contactEmail) {
    console.error("[Email] ERROR: CONTACT_EMAIL environment variable is not set");
    return;
  }

  try {
    console.log("[Email] Sending email to:", contactEmail);
    const response = await resend.emails.send({
      from: "Чисто под Тепето <onboarding@resend.dev>",
      to: contactEmail,
      subject: `Ново запитване от ${data.name.trim()}`,
      html: getEmailTemplate(data),
    });
    console.log("[Email] SUCCESS - Email sent. Response:", JSON.stringify(response));
  } catch (error) {
    console.error("[Email] ERROR - Failed to send email notification:");
    if (error instanceof Error) {
      console.error("[Email] Error name:", error.name);
      console.error("[Email] Error message:", error.message);
      console.error("[Email] Error stack:", error.stack);
    } else {
      console.error("[Email] Error details:", JSON.stringify(error));
    }
  }
}

async function sendTelegramNotification(data: LeadFormData, leadId: string, isPromo: boolean): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[Telegram] Starting Telegram notification...");
  console.log("[Telegram] TELEGRAM_BOT_TOKEN exists:", !!botToken);
  console.log("[Telegram] TELEGRAM_CHAT_ID exists:", !!chatId);
  console.log("[Telegram] Lead ID:", leadId);
  console.log("[Telegram] Is Promo:", isPromo);

  if (!botToken) {
    console.error("[Telegram] ERROR: TELEGRAM_BOT_TOKEN environment variable is not set");
    return;
  }

  if (!chatId) {
    console.error("[Telegram] ERROR: TELEGRAM_CHAT_ID environment variable is not set");
    return;
  }

  const serviceLabel = serviceLabels[data.serviceType] || data.serviceType;
  const messageContent = data.message.trim() || "Няма допълнително съобщение";
  const phone = data.phone.trim();
  const preferredDateTimeFormatted = formatPreferredDateTime(data.preferredDateTime);

  // Build the message with promo header if applicable
  const promoHeader = isPromo
    ? `🎁 <b>НОВО ЗАПИТВАНЕ ПО КАМПАНИЯТА "ПЪРВИТЕ 10" (-20%)</b>\n\n`
    : '';

  const telegramMessage = `${promoHeader}🆕 <b>Ново запитване от сайта!</b>

👤 <b>Име:</b> ${data.name.trim()}
📞 <b>Телефон:</b> <a href="tel:${phone}">${phone}</a>
🧹 <b>Услуга:</b> ${serviceLabel}${preferredDateTimeFormatted ? `
📅 <b>Предпочитана дата и час:</b> ${preferredDateTimeFormatted}` : ''}
💬 <b>Съобщение:</b> ${messageContent}${isPromo ? '\n\n✨ <i>VIP клиент с 20% отстъпка!</i>' : ''}`;

  // Telegram callback_data has a 64-byte limit. UUID is 36 chars, so use short prefix "cal:"
  const callbackData = `cal:${leadId}`;
  console.log("[Telegram] Callback data:", callbackData, "Length:", callbackData.length, "bytes");

  const inlineKeyboard = {
    inline_keyboard: [
      [
        {
          text: "📅 Добави в Google Календар",
          callback_data: callbackData,
        },
      ],
    ],
  };

  try {
    console.log("[Telegram] Sending message to chat ID:", chatId);
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
          reply_markup: inlineKeyboard,
        }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("[Telegram] ERROR - API returned non-OK status:");
      console.error("[Telegram] HTTP Status:", response.status, response.statusText);
      console.error("[Telegram] Error response:", JSON.stringify(responseData));
    } else {
      console.log("[Telegram] SUCCESS - Message sent. Response:", JSON.stringify(responseData));
    }
  } catch (error) {
    console.error("[Telegram] ERROR - Failed to send notification:");
    if (error instanceof Error) {
      console.error("[Telegram] Error name:", error.name);
      console.error("[Telegram] Error message:", error.message);
      console.error("[Telegram] Error stack:", error.stack);
    } else {
      console.error("[Telegram] Error details:", JSON.stringify(error));
    }
  }
}

const MAX_PROMO_SLOTS = 10;

async function getPromoLeadsCount(): Promise<number> {
  try {
    const supabase = getSupabaseServiceClient();
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("is_promo", true);

    if (error) {
      console.error("[submitLead] Error fetching promo leads count:", error);
      return 0;
    }

    return count ?? 0;
  } catch (error) {
    console.error("[submitLead] Failed to get promo leads count:", error);
    return 0;
  }
}

export async function submitLead(data: LeadFormData, isPromoRequest: boolean = false): Promise<SubmitLeadResult> {
  // Validation
  if (!data.name || data.name.trim().length < 2) {
    return { success: false, message: "Моля, въведете валидно име" };
  }

  if (!data.phone || data.phone.trim().length < 6) {
    return { success: false, message: "Моля, въведете валиден телефонен номер" };
  }

  if (!data.serviceType) {
    return { success: false, message: "Моля, изберете тип услуга" };
  }

  try {
    const supabase = getSupabaseServiceClient();

    // Check if promo slots are still available
    let isPromo = false;
    if (isPromoRequest) {
      const currentPromoCount = await getPromoLeadsCount();
      console.log("[submitLead] Current promo leads count:", currentPromoCount);

      if (currentPromoCount < MAX_PROMO_SLOTS) {
        isPromo = true;
        console.log("[submitLead] Promo slot available, marking lead as promo");
      } else {
        console.log("[submitLead] All promo slots taken, lead will not be marked as promo");
      }
    }

    const { data: insertedLead, error } = await supabase
      .from("leads")
      .insert([
        {
          name: data.name.trim(),
          phone: data.phone.trim(),
          service_type: data.serviceType,
          preferred_date_time: data.preferredDateTime || null,
          message: data.message.trim(),
          is_promo: isPromo,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: "Възникна грешка. Моля, опитайте отново." };
    }

    const leadId = insertedLead?.id;
    console.log("[submitLead] Lead inserted successfully. ID:", leadId);

    // Send notifications in parallel, each wrapped in try-catch to ensure independence
    // Using Promise.allSettled ensures one failure doesn't affect the other
    const notificationPromises: Promise<void>[] = [];

    // Always send email notification
    notificationPromises.push(
      sendEmailNotification(data).catch((err) => {
        console.error("[submitLead] Email notification promise rejected:", err);
      })
    );

    // Send Telegram notification if we have the leadId
    if (leadId) {
      notificationPromises.push(
        sendTelegramNotification(data, leadId, isPromo).catch((err) => {
          console.error("[submitLead] Telegram notification promise rejected:", err);
        })
      );
    } else {
      console.warn("[submitLead] No leadId available, skipping Telegram notification");
    }

    // Wait for all notifications to complete (or fail gracefully)
    // This ensures we see all logs before the function returns
    await Promise.allSettled(notificationPromises);
    console.log("[submitLead] All notifications processed");

    // Return appropriate success message
    if (isPromo) {
      return {
        success: true,
        message: "Поздравления! Вие сте сред първите 10 клиенти с 20% отстъпка! Ще се свържем с вас скоро."
      };
    }

    return { success: true, message: "Благодарим ви! Ще се свържем с вас скоро." };
  } catch (error) {
    console.error("Submit lead error:", error);
    return { success: false, message: "Възникна грешка. Моля, опитайте отново." };
  }
}
