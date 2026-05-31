"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const WA_NUMBER = "XXXXXXXXXXXX";
const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General Inquiry", notes: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `📩 *Contact Message – Xplorex*`, ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📧 *Email:* ${form.email}`,
      `📋 *Subject:* ${form.subject}`,
      form.notes ? `💬 *Message:* ${form.notes}` : "",
      ``, `_Sent from xplorex.com_`,
    ].filter(Boolean).join("\n");
    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-4 shadow-3d-sm">
              Get in Touch
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Let's Plan Your <span className="text-gradient">Adventure</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about a destination? Need a customized itinerary? Our travel experts are available 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Contact Info */}
            <div className="space-y-4 lg:col-span-1">
              {[
                { icon: Phone,  label: "Call Us",    value: "+91 XXXX XXX XXX",        sub: "Available 24/7" },
                { icon: Mail,   label: "Email Us",   value: "XXXXXXXXXX@XXXXXXXXXX.in", sub: "Replies within 2 hours" },
                { icon: MapPin, label: "Visit Us",   value: "XXXXXXXXXX, India",        sub: "Serving travelers globally" },
                { icon: Clock,  label: "Work Hours", value: "Mon - Sat",                sub: "10:00 AM - 7:00 PM" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-3d border border-primary/5"
                >
                  <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary grid place-items-center text-white shadow-glow flex-shrink-0">
                    <item.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold mb-0.5">{item.label}</div>
                    <div className="text-primary font-bold text-sm sm:text-base">{item.value}</div>
                    <div className="text-xs text-accent font-bold">{item.sub}</div>
                  </div>
                </motion.div>
              ))}

              {/* Social */}
              <div className="bg-primary/5 rounded-2xl p-5 sm:p-6 border border-primary/10">
                <h4 className="text-primary font-bold mb-4 flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Follow Our Journey
                </h4>
                <div className="flex gap-3">
                  {[
                    { Icon: Instagram, href: "https://www.instagram.com/XXXXXXXXXX", label: "Instagram" },
                    { Icon: Facebook,  href: "https://www.facebook.com/XXXXXXXXXX", label: "Facebook" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                      className="w-10 h-10 grid place-items-center rounded-xl bg-white hover:bg-primary hover:text-white transition-all border border-primary/10 shadow-3d-sm">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-3d-lg border border-primary/5"
            >
              <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
                      placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Phone Number</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
                      placeholder="+91 ..." />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm"
                    placeholder="you@email.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">What are you interested in?</label>
                  <select title="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
                    {["General Inquiry", "Tour Package Question", "Business Partnership", "Custom Trip Request"].map(o => (
                      <option key={o} className="bg-white">{o}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 ml-1">Message Details</label>
                  <textarea required rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-medium leading-relaxed text-sm resize-none"
                    placeholder="Tell us about your travel plans..." />
                </div>

                <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-base">
                  {WA_ICON}
                  Send on WhatsApp
                </button>
                <p className="text-xs text-center text-primary/30 font-bold">⚡ We typically respond within 2 hours</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
