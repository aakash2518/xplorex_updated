"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Plane, Loader2, ShieldCheck, Lock } from "lucide-react";
import { sendLeadToCRM } from "@/services/api";
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
        await sendLeadToCRM({
          name: form.name,
          email: form.email,
          phone: form.phone,
        });
        toast.success("Quote request sent successfully!");
        setForm({
          name: "",
          email: "",
          phone: "",
          travelers: "2",
          notes: "",
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to send request: " + msg);
      } finally {
        setPending(false);
      }
    },
    [form]
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

            <motion.button
              type="submit"
              disabled={pending}
              whileHover={{ scale: pending ? 1 : 1.03, boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 bg-[#25D366] hover:bg-[#20c05c] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none text-white font-bold py-4.5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg touch-target"
            >
              {pending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get a Free Quote
                </>
              )}
            </motion.button>

            {/* Trust Strip */}
            <div className="flex items-center justify-center gap-4 mt-2 pt-4 border-t border-primary/5">
              <div className="flex items-center gap-1.5 text-primary/40">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Razorpay Secure</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-primary/10" />
              <div className="flex items-center gap-1.5 text-primary/40">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">256-bit SSL</span>
              </div>
            </div>

            <p className="text-xs text-center text-primary/30 font-bold mt-2">⚡ Reply within 2 hours · Best Price Guaranteed</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
});

export default QuotationForm;
