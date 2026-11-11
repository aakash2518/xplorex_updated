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
  const header = type === "quote"
    ? "*\u2708\uFE0F  XPLOREX HOLIDAYS | QUOTE REQUEST*"
    : type === "lead"
      ? "*\u2708\uFE0F  XPLOREX HOLIDAYS | ENQUIRY*"
      : "*\u2708\uFE0F  XPLOREX HOLIDAYS | CONTACT MESSAGE*";

  const lines: string[] = [
    "*━━━━━━━━━━━━━━━━━━━━*",
    header,
    "*━━━━━━━━━━━━━━━━━━━━*",
    "",
    `\u{1F464} *Customer Name:* ${data.name}`,
    `\u{1F4DE} *Phone Number:* ${data.phone}`,
  ];

  if (data.email) {
    lines.push(`\u{1F4E7} *Email ID:* ${data.email}`);
  }

  if (data.destination) {
    lines.push(`\u{1F4CD} *Destination:* ${data.destination}`);
  }

  if (data.month) {
    lines.push(`\u{1F5D3}\uFE0F *Travel Month / Date:* ${data.month}`);
  }

  if (data.travelers) {
    lines.push(`\u{1F465} *Travelers:* ${data.travelers}`);
  }

  if (data.budget) {
    lines.push(`\u{1F4B0} *Budget:* ${data.budget}`);
  }

  if (data.subject) {
    lines.push(`\u{1F4CB} *Subject:* ${data.subject}`);
  }

  if (data.notes) {
    lines.push(type === "contact" ? `\u{1F4AC} *Message:* ${data.notes}` : `\u{1F4DD} *Notes:* ${data.notes}`);
  }

  lines.push("", "────────────────────", "\u{1F310} *Source:* xplorex.in", "*━━━━━━━━━━━━━━━━━━━━*");

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

export interface CRMLeadPayload {
  name: string;
  phone?: string;
  email?: string;
  destination?: string;
  month?: string;
  travelers?: string;
  notes?: string;
  source?: string;
}

/**
 * Sends lead data to the external CRM webhook.
 */
export async function sendLeadToCRM(data: {
  name: string;
  email?: string;
  phone: string;
  destination?: string;
  month?: string;
  travelers?: string;
  notes?: string;
}): Promise<boolean> {
  const payload: CRMLeadPayload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    destination: data.destination,
    month: data.month,
    travelers: data.travelers,
    notes: data.notes,
  };

  const crmUrl = process.env.NEXT_PUBLIC_CRM_API_URL || "http://localhost:3000/api/webhook/website-lead";

  const response = await fetch(crmUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`CRM API Error: ${response.status} ${errorText}`);
  }

  return true;
}

/**
 * Sends a distinct Booking Request to the CRM webhook.
 * This classifies the lead differently in the CRM (e.g. higher priority).
 */
export async function sendBookingRequestToCRM(data: {
  name: string;
  email?: string;
  phone: string;
  destination: string;
  travelers: string;
  month: string;
  notes?: string;
}): Promise<boolean> {
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    destination: data.destination,
    travelers: data.travelers,
    month: data.month,
    notes: data.notes || "Booking Request",
  };

  const crmUrl = process.env.NEXT_PUBLIC_CRM_API_URL || "http://localhost:3000/api/webhook/website-lead";

  const response = await fetch(crmUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`CRM API Error: ${response.status} ${errorText}`);
  }

  return true;
}
