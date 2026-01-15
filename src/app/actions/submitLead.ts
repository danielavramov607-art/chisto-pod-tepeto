"use server";

import { supabase } from "@/lib/supabase";

export type LeadFormData = {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
};

export type SubmitLeadResult = {
  success: boolean;
  message: string;
};

export async function submitLead(data: LeadFormData): Promise<SubmitLeadResult> {
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
    const { error } = await supabase.from("leads").insert([
      {
        name: data.name.trim(),
        phone: data.phone.trim(),
        service_type: data.serviceType,
        message: data.message.trim(),
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, message: "Възникна грешка. Моля, опитайте отново." };
    }

    return { success: true, message: "Благодарим ви! Ще се свържем с вас скоро." };
  } catch (error) {
    console.error("Submit lead error:", error);
    return { success: false, message: "Възникна грешка. Моля, опитайте отново." };
  }
}
