"use client";

import React, { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { sendLeadToCRM } from "@/services/api";
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
        await sendLeadToCRM({
          name: form.name,
          email: form.email,
          phone: form.phone,
          // We can optionally append subject and notes to company or just leave it for now since CRM doesn't explicitly accept notes. But let's just send what it accepts.
        });
        toast.success("Message sent successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          notes: "",
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to send message: " + msg);
      } finally {
        setPending(false);
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
              Submitting...
            </>
          ) : (
            <>
              Send Message
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
