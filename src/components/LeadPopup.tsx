"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, User, Phone, Plane } from "lucide-react";

const WHATSAPP_NUMBER = "XXXXXXXXXXXX";

const DESTINATIONS = [
  "Bali", "Dubai", "Thailand", "Maldives", "Singapore", "Vietnam",
  "Georgia", "Sri Lanka", "Japan", "Europe", "Switzerland", "Australia",
  "Turkey", "Kazakhstan",
  "Kashmir", "Kerala", "Andaman", "Rajasthan", "Himachal Pradesh",
  "Uttarakhand", "Ladakh", "Spiti", "Meghalaya", "Sikkim",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TRAVELERS = ["1 Person", "2 People", "3-4 People", "5-8 People", "9+ People"];

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    destination: "",
    month: "",
    travelers: "",
  });

  // Show after 3s, once per session
  useEffect(() => {
    if (sessionStorage.getItem("xplorex_popup_seen")) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("xplorex_popup_seen", "1");
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, close]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [key]: e.target.value }));

  // Submit → instantly open WhatsApp with pre-filled message → close popup
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `🌍 *New Trip Enquiry – Xplorex*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📍 *Destination:* ${form.destination || "Not specified"}`,
      `📅 *Travel Month:* ${form.month || "Not specified"}`,
      `👥 *Travelers:* ${form.travelers || "Not specified"}`,
      ``,
      `_Sent from xplorex.com_`,
    ].join("\n");

    // Direct redirect — no delay, no intermediate screen
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    setOpen(false);
  };

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
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed inset-0 z-[501] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-[420px] pointer-events-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10">

                {/* ── Header ── */}
                <div className="relative bg-gradient-to-br from-primary via-[#2d2a9e] to-accent px-6 pt-7 pb-9 text-white overflow-hidden">
                  {/* Flying plane decoration */}
                  <motion.div
                    animate={{ x: ["-5%", "115%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-3 left-0 opacity-15 pointer-events-none"
                  >
                    <Plane className="w-7 h-7 -rotate-12" />
                  </motion.div>

                  {/* Close */}
                  <button
                    type="button"
                    onClick={close}
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 grid place-items-center transition-colors"
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
                    Fill details &amp; get a free quote on WhatsApp instantly!
                  </p>
                </div>

                {/* Curved white top */}
                <div className="h-5 bg-white -mt-5 rounded-t-[2rem]" />

                {/* ── Form ── */}
                <form onSubmit={handleSubmit} className="px-5 pb-6 bg-white space-y-3">

                  {/* Name */}
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={form.name}
                      onChange={set("name")}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm placeholder:font-normal placeholder:text-primary/35"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone Number"
                      value={form.phone}
                      onChange={set("phone")}
                      pattern="[0-9+\s\-]{7,15}"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm placeholder:font-normal placeholder:text-primary/35"
                    />
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                    <select
                      title="Select destination"
                      value={form.destination}
                      onChange={set("destination")}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Where do you want to go?</option>
                      {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* Month + Travelers */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 pointer-events-none" />
                      <select
                        title="Select travel month"
                        value={form.month}
                        onChange={set("month")}
                        className="w-full pl-9 pr-3 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Month?</option>
                        {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <select
                      title="Select number of travelers"
                      value={form.travelers}
                      onChange={set("travelers")}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-primary/10 bg-primary/[0.03] focus:bg-white focus:border-primary/30 text-primary outline-none transition-all font-semibold text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Travelers?</option>
                      {TRAVELERS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  {/* ── Send Button ── */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-lg transition-all text-[15px] mt-1"
                  >
                    {/* WhatsApp SVG icon */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send
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
}
