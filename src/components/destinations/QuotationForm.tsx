"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plane, Loader2 } from "lucide-react";
import { sendWhatsAppEnquiry } from "@/services/api";
import { vibrate } from "@/utils/helpers";
import { FORM_OPTIONS } from "@/constants/theme";
import { toast } from "sonner";

interface QuotationFormProps {
  destinationName: string;
}

export const QuotationForm = React.memo(function QuotationForm({
  destinationName,
}: QuotationFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    notes: "",
  });
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      vibrate([20, 50, 20]);

      if (!form.name.trim() || !form.phone.trim()) {
        toast.error("Please fill in your name and phone number.");
        return;
      }

      setPending(true);
      try {
        await sendWhatsAppEnquiry(
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            destination: destinationName,
            travelers: form.travelers,
            notes: form.notes,
          },
          "quote"
        );
        toast.success("Redirecting to WhatsApp...");
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to redirect: " + msg);
      } finally {
        // Keep the loading state briefly to match redirect behavior
        setTimeout(() => setPending(false), 2000);
      }
    },
    [form, destinationName]
  );

  return (
    <section id="quote-form" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-primary/5">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(hsl(246_67%_29%)_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <div className="container relative px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-primary"
        >
          <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-5 shadow-3d-sm">
            Request Quotation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
            Plan your <br />
            <span className="font-script text-accent text-3xl sm:text-5xl">personalized</span> trip
          </h2>
          <p className="text-primary/65 font-medium text-base sm:text-lg mb-8 max-w-md leading-relaxed">
            Share your travel dates and preferences. We'll send a customized {destinationName} itinerary with transparent pricing within 2 hours.
          </p>

          <div className="space-y-3">
            {[
              { k: "Direct Call",    v: "+91 84487706518" },
              { k: "Official Email", v: "info@xplorex.in" },
              { k: "Support Hours",  v: "24 / 7 — Always Available" },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-3d border border-primary/5">
                <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold w-16 sm:w-20 flex-shrink-0">{c.k}</div>
                <div className="font-bold text-primary text-sm sm:text-base">{c.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-3d-lg border border-primary/5"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-primary">Get a Free Quote</h3>
          <p className="text-sm text-primary/40 font-bold mb-6">For your {destinationName} tour package</p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-2">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-2">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1.5 block ml-2">Travelers</label>
              <div className="relative">
                <select
                  title="Number of travelers"
                  value={form.travelers}
                  onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                  className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                >
                  {FORM_OPTIONS.travelersSimple.map((o) => (
                    <option key={o} value={o} className="bg-white">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-2">Anything specific?</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                placeholder={`Honeymoon, family trip, adventure focus in ${destinationName}...`}
                className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-medium leading-relaxed text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full mt-4 bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.96] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none text-white font-bold py-4.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg touch-target"
            >
              {pending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 fill-white flex-shrink-0" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send on WhatsApp
                </>
              )}
            </button>
            <p className="text-xs text-center text-primary/30 font-bold mt-4">⚡ Reply within 2 hours · Best Price Guaranteed</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
});

export default QuotationForm;
