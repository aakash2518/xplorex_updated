"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MessageCircle, Clock, MapPin,
  Instagram, Facebook, Send, CheckCircle, AlertCircle,
  ChevronDown, Users, Wallet, Sparkles, ShieldCheck, Lock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT_INFO, FORM_OPTIONS } from "@/constants/theme";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  phone: string;
  email: string;
  destination: string;
  budget: string;
  travelers: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  destination?: string;
  budget?: string;
  travelers?: string;
  message?: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Please enter your full name (min 2 characters).";
  if (!data.phone.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (!data.destination)
    errors.destination = "Please select a destination.";
  if (!data.budget)
    errors.budget = "Please select a budget range.";
  if (!data.travelers)
    errors.travelers = "Please select number of travelers.";
  if (!data.message.trim() || data.message.trim().length < 10)
    errors.message = "Tell us more about your trip (min 10 characters).";
  return errors;
}

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({
  label, error, required, children,
}: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-primary/70 uppercase tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-[11px] font-medium flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (error?: string) =>
  `w-full px-4 py-3 rounded-xl border text-sm font-medium text-primary placeholder:text-primary/30 focus:outline-none focus:ring-2 transition-all ${
    error
      ? "border-red-400 bg-red-50/50 focus:ring-red-300"
      : "border-primary/15 bg-white focus:ring-primary/25 hover:border-primary/30"
  }`;

// ─── Contact Cards ────────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Call Us",
    value: `+91 ${CONTACT_INFO.phone}`,
    sub: "Mon–Sun, 9am–9pm",
    href: `tel:+91${CONTACT_INFO.phone}`,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with Us",
    sub: "Usually replies in minutes",
    href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=Hi! I'd like to enquire about a trip.`,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT_INFO.email,
    sub: "We reply within 2 hours",
    href: `mailto:${CONTACT_INFO.email}`,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    icon: Clock,
    title: "Office Hours",
    value: "9 AM – 9 PM",
    sub: "All 7 days of the week",
    href: CONTACT_INFO.mapsLink,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ show, onClose }: { show: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-[9000] flex items-center gap-3 bg-white border border-emerald-200 shadow-2xl rounded-2xl px-5 py-4 max-w-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 grid place-items-center shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="font-bold text-primary text-sm">Message Sent! 🎉</div>
            <div className="text-primary/55 text-xs font-medium mt-0.5">
              Our team will call you back within 2 hours.
            </div>
          </div>
          <button onClick={onClose} className="ml-2 text-primary/30 hover:text-primary/60 text-lg leading-none">×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", destination: "",
    budget: "", travelers: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const set = useCallback((key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      const updated = { ...form, [key]: value };
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [key]: errs[key] }));
    }
  }, [form, touched]);

  const blur = useCallback((key: keyof FormData) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [key]: errs[key] }));
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true, destination: true, budget: true, travelers: true, message: true });
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // Build WhatsApp message
    const msg = `Hi Xplorex! 👋\n\n*New Trip Enquiry*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email}\n🌏 Destination: ${form.destination}\n💰 Budget: ${form.budget}\n👥 Travelers: ${form.travelers}\n\n📝 Message:\n${form.message}`;
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;

    await new Promise((r) => setTimeout(r, 600)); // simulate
    setLoading(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    window.open(url, "_blank");
    setForm({ name: "", phone: "", email: "", destination: "", budget: "", travelers: "", message: "" });
    setTouched({});
    setErrors({});
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <Toast show={showToast} onClose={() => setShowToast(false)} />

      {/* ── Hero Header ───────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-10">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Get in Touch
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Let's Plan Your <span className="text-gradient">Adventure</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Fill the form and we'll send a custom itinerary to your WhatsApp in under 2 hours. 
              No spam, no obligation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Two-Column Layout ─────────────────────────────────── */}
      <section className="pb-16 sm:pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

            {/* ═══ RIGHT COLUMN: Info (above on mobile) ════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="order-first lg:order-last flex flex-col gap-6"
            >
              {/* Map */}
              <div className="relative rounded-3xl overflow-hidden border border-primary/8 shadow-lg">
                <div className="absolute top-3 left-3 right-3 z-10">
                  <div className="bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-md border border-primary/10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary grid place-items-center shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-primary text-xs">Xplorex Office, New Delhi</div>
                      <div className="text-[10px] text-primary/45 font-medium truncate">{CONTACT_INFO.address}</div>
                    </div>
                    <a
                      href={CONTACT_INFO.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[10px] font-bold text-white bg-accent px-2.5 py-1.5 rounded-lg whitespace-nowrap hover:bg-primary transition-colors"
                    >
                      Open →
                    </a>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121593!2d77.2764!3d28.5016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1a9e47d2b17%3A0x7b0e7e8d!2sMohan+Cooperative+Industrial+Estate%2C+Badarpur%2C+New+Delhi%2C+Delhi+110044!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Xplorex Office Location"
                />
              </div>

              {/* Contact Cards Grid */}
              <div className="grid grid-cols-2 gap-3">
                {CONTACT_CARDS.map((card, i) => (
                  <motion.a
                    key={card.title}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(30,27,110,0.14)" }}
                    className={`flex flex-col gap-2.5 p-4 rounded-2xl border ${card.bg} ${card.border} shadow-sm transition-shadow cursor-pointer`}
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} grid place-items-center shadow-sm`}>
                      <card.icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary/40">{card.title}</div>
                      <div className="font-bold text-primary text-xs sm:text-sm leading-snug mt-0.5">{card.value}</div>
                      <div className="text-[10px] text-primary/40 font-medium mt-0.5">{card.sub}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social row */}
              <div className="bg-white border border-primary/8 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div>
                  <div className="font-bold text-primary text-sm">Follow Our Journeys</div>
                  <div className="text-primary/45 text-xs font-medium mt-0.5">Real trips · Real travelers</div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 grid place-items-center shadow-md hover:scale-110 transition-transform"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={CONTACT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 grid place-items-center shadow-md hover:scale-110 transition-transform"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ═══ LEFT COLUMN: Form ════════════════════════════════════ */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-last lg:order-first"
            >
              <div className="bg-white border border-primary/8 rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Form header */}
                <div className="mb-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-3">
                    <Send className="w-3 h-3" /> Request a Quote
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary leading-tight">
                    Get Your Custom Itinerary
                  </h2>
                  <p className="text-primary/50 text-sm font-medium mt-1.5">
                    We'll craft a personalised plan and send it to your WhatsApp within 2 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" error={errors.name} required>
                      <input
                        type="text"
                        placeholder="Rahul Sharma"
                        value={form.name}
                        onChange={set("name")}
                        onBlur={blur("name")}
                        className={inputCls(errors.name)}
                      />
                    </Field>
                    <Field label="Mobile Number" error={errors.phone} required>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={form.phone}
                        onChange={set("phone")}
                        onBlur={blur("phone")}
                        className={inputCls(errors.phone)}
                        maxLength={10}
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email Address" error={errors.email} required>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                      onBlur={blur("email")}
                      className={inputCls(errors.email)}
                    />
                  </Field>

                  {/* Destination */}
                  <Field label="Destination" error={errors.destination} required>
                    <div className="relative">
                      <select
                        value={form.destination}
                        onChange={set("destination")}
                        onBlur={blur("destination")}
                        className={`${inputCls(errors.destination)} appearance-none pr-10`}
                      >
                        <option value="">Select destination…</option>
                        {FORM_OPTIONS.destinations.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                    </div>
                  </Field>

                  {/* Budget + Travelers */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Budget Range" error={errors.budget} required>
                      <div className="relative">
                        <select
                          value={form.budget}
                          onChange={set("budget")}
                          onBlur={blur("budget")}
                          className={`${inputCls(errors.budget)} appearance-none pr-10`}
                        >
                          <option value="">Select budget…</option>
                          {FORM_OPTIONS.budgets.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                        <Wallet className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                      </div>
                    </Field>
                    <Field label="No. of Travelers" error={errors.travelers} required>
                      <div className="relative">
                        <select
                          value={form.travelers}
                          onChange={set("travelers")}
                          onBlur={blur("travelers")}
                          className={`${inputCls(errors.travelers)} appearance-none pr-10`}
                        >
                          <option value="">Select…</option>
                          {FORM_OPTIONS.travelers.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40 pointer-events-none" />
                      </div>
                    </Field>
                  </div>

                  {/* Message */}
                  <Field label="Your Message" error={errors.message} required>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your dream trip — preferred dates, special requirements, anything…"
                      value={form.message}
                      onChange={set("message")}
                      onBlur={blur("message")}
                      className={`${inputCls(errors.message)} resize-none`}
                    />
                  </Field>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.03, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all text-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Opening WhatsApp…
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Send via WhatsApp
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

                  <p className="text-center text-[11px] text-primary/35 font-medium mt-2">
                    🔒 Your information is 100% private. No spam, no cold calls.
                  </p>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
