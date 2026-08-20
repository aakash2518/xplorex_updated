"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, User, Phone, Plane, Loader2, Send } from "lucide-react";
import { FORM_OPTIONS } from "@/constants/theme";
import { sendLeadToCRM } from "@/services/api";
import { vibrate } from "@/utils/helpers";
import { toast } from "sonner";

export const LeadPopup = React.memo(function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
    month: "",
    travelers: "",
  });
  const [pending, setPending] = useState(false);

  // Show after 3s, once per session
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("xplorex_popup_seen")) return;
    const t = setTimeout(() => {
      setOpen(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("xplorex_popup_seen", "1");
      }
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape key listener
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  // Lock body scroll
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = open ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [open]);

  const handleChange = useCallback((key: keyof typeof form) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };
  }, []);

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
          phone: form.phone,
          destination: form.destination || "Any",
          month: form.month || "Any",
          travelers: form.travelers || "Any"
        });
        toast.success("Quote request sent successfully!");
        setForm({ name: "", phone: "", destination: "", month: "", travelers: "" });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        toast.error("Failed to send request: " + msg);
      } finally {
        setOpen(false);
        setPending(false);
      }
    },
    [form]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[500] bg-black/55 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            key="dlg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{   opacity: 0, scale: 0.93, y: 20  }}
            transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-[501] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-[420px] pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">

                {/* Header */}
                <div className="relative bg-gradient-to-br from-primary via-[#2d2a9e] to-accent px-6 pt-7 pb-9 text-white overflow-hidden">
                  <motion.div
                    animate={{ x: ["-5%", "115%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-3 left-0 opacity-15 pointer-events-none"
                  >
                    <Plane className="w-7 h-7 -rotate-12" />
                  </motion.div>

                  <button
                    type="button"
                    onClick={close}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 grid place-items-center transition-colors focus:outline-none"
                    aria-label="Close popup"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-widest mb-3">
                    ✈️ Free Trip Planning
                  </span>
                  <h2 id="popup-title" className="font-display text-2xl sm:text-[1.65rem] font-bold leading-snug mb-1">
                    Plan Your Dream Trip
                  </h2>
                  <p className="text-white/70 text-sm">
                    Fill details &amp; get a free custom quote instantly!
                  </p>
                </div>

                <div className="h-5 bg-white -mt-5 rounded-t-[2rem]" />

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-5 pb-6 bg-white space-y-3">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      aria-label="Full Name"
                      value={form.name}
                      onChange={handleChange("name")}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm placeholder:font-normal placeholder:text-primary/35"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      aria-label="Phone Number"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      pattern="[0-9+\s\-]{7,15}"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm placeholder:font-normal placeholder:text-primary/35"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <select
                      title="Select destination"
                      aria-label="Destination"
                      value={form.destination}
                      onChange={handleChange("destination")}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Where do you want to go?</option>
                      {FORM_OPTIONS.destinations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                      <select
                        title="Select travel month"
                        aria-label="Travel Month"
                        value={form.month}
                        onChange={handleChange("month")}
                        className="w-full pl-9 pr-3 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Month?</option>
                        {FORM_OPTIONS.months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <select
                        title="Select number of travelers"
                        aria-label="Number of Travelers"
                        value={form.travelers}
                        onChange={handleChange("travelers")}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Travelers?</option>
                        {FORM_OPTIONS.travelers.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.96] disabled:opacity-75 disabled:scale-100 disabled:pointer-events-none text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-[15px] mt-1 touch-target"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Get Free Quote
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-primary/30 font-medium pt-0.5">
                    ⚡ Free · No spam · Reply within 2 hours
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default LeadPopup;
