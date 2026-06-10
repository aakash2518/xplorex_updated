import { CONTACT_INFO } from "@/constants/theme";

export interface EnquiryData {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  month?: string;
  travelers?: string;
  budget?: string;
  notes?: string;
  subject?: string;
}

/**
 * Formats a clean, readable text template for WhatsApp.
 */
export function formatWhatsAppMessage(data: EnquiryData, type: "quote" | "lead" | "contact"): string {
  const title = type === "quote"
    ? `🌍 *Quote Request – Xplorex*`
    : type === "lead"
      ? `🌍 *New Trip Enquiry – Xplorex*`
      : `📩 *Contact Message – Xplorex*`;

  const lines: string[] = [
    title,
    "",
    `👤 *Name:* ${data.name}`,
    `📞 *Phone:* ${data.phone}`,
  ];

  if (data.email) {
    lines.push(`📧 *Email:* ${data.email}`);
  }

  if (data.destination) {
    lines.push(`📍 *Destination:* ${data.destination}`);
  }

  if (data.month) {
    lines.push(`📅 *Travel Month:* ${data.month}`);
  }

  if (data.travelers) {
    lines.push(`👥 *Travelers:* ${data.travelers}`);
  }

  if (data.budget) {
    lines.push(`💰 *Budget:* ${data.budget}`);
  }

  if (data.subject) {
    lines.push(`📋 *Subject:* ${data.subject}`);
  }

  if (data.notes) {
    lines.push(type === "contact" ? `💬 *Message:* ${data.notes}` : `📝 *Notes:* ${data.notes}`);
  }

  lines.push("", `_Sent from xplorex.com_`);

  return lines.join("\n");
}

/**
 * Handles redirecting the user to WhatsApp with the formatted message.
 */
export function sendWhatsAppEnquiry(
  data: EnquiryData,
  type: "quote" | "lead" | "contact",
  waNumber?: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const message = formatWhatsAppMessage(data, type);
      const recipient = waNumber || CONTACT_INFO.whatsapp;
      const url = `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
      if (typeof window !== "undefined") {
        window.location.href = url;
        resolve(true);
      } else {
        reject(new Error("Cannot redirect: window is undefined (SSR)"));
      }
    } catch (error) {
      reject(error);
    }
  });
}
export type { Destination, Trip } from "@/data/destinations";
