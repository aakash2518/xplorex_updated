"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { useState } from "react";

const WA_NUMBER = "XXXXXXXXXXXX";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Quote = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", destination: "Bali", budget: "₹19k - ₹50k", travelers: "2", notes: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `🌍 *Quote Request – Xplorex*`, ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📧 *Email:* ${form.email || "Not provided"}`,
      `📍 *Destination:* ${form.destination}`,
      `💰 *Budget:* ${form.budget}`,
      `👥 *Travelers:* ${form.travelers}`,
      form.notes ? `📝 *Notes:* ${form.notes}` : "",
      ``, `_Sent from xplorex.com_`,
    ].filter(Boolean).join("\n");
    window.location.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background">
      <div aria-hidden className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(hsl(246_67%_29%)_1px,transparent_1px)] [background-size:40px_40px]" />

      <motion.div animate={{ x: ["-10%", "110%"], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute top-20 left-0 text-primary/10 hidden sm:block">
        <Plane className="w-12 h-12 -rotate-12" />
      </motion.div>

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-primary">
            <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-5 shadow-3d-sm">
              Get a Quotation
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Your dream trip,{" "}
              <span className="text-gradient font-script text-4xl sm:text-5xl">priced perfectly.</span>
            </h2>
            <p className="text-primary/60 font-medium text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              Tell us where you'd like to go. We'll send a customized itinerary with transparent pricing within 2 hours.
            </p>

            <div className="space-y-3">
              {[
                { k: "Call",  v: "+91 XXXX XXX XXX" },
                { k: "Email", v: "XXXXXXXXXX@XXXXXXXXXX.in" },
                { k: "Hours", v: "24 / 7 — Always Available" },
              ].map((c) => (
                <div key={c.k} className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-3d border border-primary/5">
                  <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold w-12 sm:w-16 flex-shrink-0">{c.k}</div>
                  <div className="font-bold text-primary text-sm sm:text-base">{c.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-3d-lg border border-primary/5"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-6 text-primary">Request Quotation</h3>

            <div className="space-y-4">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name"    value={form.name}  onChange={(v: string) => setForm({ ...form, name: v })}  placeholder="John Doe"   required />
                <Field label="Phone"        value={form.phone} onChange={(v: string) => setForm({ ...form, phone: v })} placeholder="+91 ..."    required />
              </div>
              <Field label="Email" type="email" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} placeholder="you@email.com" required />

              {/* Destination + Budget + Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select label="Destination" value={form.destination} onChange={(v: string) => setForm({ ...form, destination: v })}
                  options={["Bali","Bhutan","Dubai","Georgia","India","Kazakhstan","Maldives","Singapore","Sri Lanka","Thailand","Turkey","Vietnam"]} />
                <Select label="Budget" value={form.budget} onChange={(v: string) => setForm({ ...form, budget: v })}
                  options={["₹19k - ₹50k","₹50k - ₹1L","₹1L - ₹2L","₹2L+"]} />
                <Select label="Travelers" value={form.travelers} onChange={(v: string) => setForm({ ...form, travelers: v })}
                  options={["1","2","3","4","5+"]} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-1">Anything specific?</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder="Honeymoon, family trip, adventure focus..."
                  className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-medium leading-relaxed text-sm resize-none"
                />
              </div>

              <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.98] text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-base">
                {WA_ICON}
                Send on WhatsApp
              </button>
              <p className="text-xs text-center text-primary/30 font-bold">⚡ Reply within 2 hours · No spam, ever.</p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

interface FieldProps { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; }
const Field = ({ label, value, onChange, type = "text", placeholder, required }: FieldProps) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-1">{label}</label>
    <input type={type} value={value} required={required} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-sm" />
  </div>
);

interface SelectProps { label: string; value: string; onChange: (v: string) => void; options: string[]; }
const Select = ({ label, value, onChange, options }: SelectProps) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-1">{label}</label>
    <select title={label} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-bold text-sm appearance-none cursor-pointer">
      {options.map((o: string) => <option key={o} className="bg-white">{o}</option>)}
    </select>
  </div>
);

export default Quote;
