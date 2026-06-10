"use client";

import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { sendWhatsAppEnquiry } from "@/services/api";
import { vibrate } from "@/utils/helpers";
import { toast } from "sonner";

export const ContactForm = React.memo(function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    notes: "",
  });
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      vibrate([20, 50, 20]);

      if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
        toast.error("Please fill in your name, email and phone number.");
        return;
      }

      setPending(true);
      try {
        await sendWhatsAppEnquiry(
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            subject: form.subject,
            notes: form.notes,
          },
          "contact"
        );
        toast.success("Redirecting to WhatsApp...");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to redirect: " + msg);
      } finally {
        setTimeout(() => setPending(false), 2000);
      }
    },
    [form]
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-3d-lg border border-primary/5">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
              placeholder="+91 ..."
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
            placeholder="you@email.com"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">
            What are you interested in?
          </label>
          <div className="relative">
            <select
              title="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
            >
              {[
                "General Inquiry",
                "Tour Package Question",
                "Business Partnership",
                "Custom Trip Request",
              ].map((o) => (
                <option key={o} value={o} className="bg-white">
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">
            Message Details
          </label>
          <textarea
            required
            rows={4}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-medium leading-relaxed text-sm resize-none"
            placeholder="Tell us about your travel plans..."
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.96] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-base touch-target"
        >
          {pending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send on WhatsApp
            </>
          )}
        </button>
        <p className="text-xs text-center text-primary/30 font-bold">
          ⚡ We typically respond within 2 hours
        </p>
      </form>
    </div>
  );
});

export default ContactForm;
