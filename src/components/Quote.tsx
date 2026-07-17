"use client";

import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  ChevronDown,
  Star,
  Palmtree,
  CircleDollarSign,
  Luggage,
  Pencil,
  MapPin,
  Clock,
  Globe
} from "lucide-react";
import React, { useState } from "react";

const WA_NUMBER = "918447706518"; // India country code + number

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contacts = [
  {
    icon: <Phone className="w-5 h-5 text-[#0284c7]" />,
    title: "Call Us",
    value: "+91 8447706518",
    sub: "24/7 Available",
    href: "tel:+918447706518",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#22c55e]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    title: "WhatsApp",
    value: "Chat Instantly",
    sub: "We reply in 5 mins",
    href: `https://wa.me/${WA_NUMBER}?text=Hi%20Xplorex%20team%2C%20I%20have%20a%20query%20regarding%20a%20trip.`,
  },
  {
    icon: <Mail className="w-5 h-5 text-[#0284c7]" />,
    title: "Email Us",
    value: "info@xplorex.in",
    sub: "We reply in 2 hours",
    href: "mailto:info@xplorex.in",
  },
  {
    icon: <MapPin className="w-5 h-5 text-[#0284c7]" />,
    title: "Our Office",
    value: "Faridabad, India",
    sub: "Mon - Sat (10AM - 7PM)",
    href: "https://maps.google.com/?q=Faridabad,India",
  },
];

const stats = [
  {
    value: "4.9/5",
    label: "Google Rating",
    stars: true,
    icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
  },
  {
    value: "12,000+",
    label: "Happy Travelers",
    icon: <Users className="w-5 h-5 text-sky-500" />,
  },
  {
    value: "< 2 Hours",
    label: "Average Response",
    icon: <Clock className="w-5 h-5 text-sky-500" />,
  },
  {
    value: "120+",
    label: "Destinations",
    icon: <Globe className="w-5 h-5 text-sky-500" />,
  },
];

const Quote = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Bali, Indonesia",
    budget: "₹19k - ₹50k",
    travelDate: "",
    travelers: 2,
    tripType: "Honeymoon",
    notes: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `🌍 *Quote Request – Xplorex*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📧 *Email:* ${form.email}`,
      `📍 *Destination:* ${form.destination}`,
      `💰 *Budget:* ${form.budget}`,
      `📅 *Travel Date:* ${form.travelDate || "Not specified"}`,
      `👥 *Travelers:* ${form.travelers}`,
      `💼 *Trip Type:* ${form.tripType}`,
      form.notes ? `📝 *Notes:* ${form.notes}` : "",
      ``,
      `_Sent from xplorex.com_`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/20 to-indigo-50/30">
      {/* Decorative blurred background blobs for Glassmorphism visual context */}
      <div className="absolute top-12 left-1/4 w-[350px] h-[350px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-16 right-1/4 w-[450px] h-[450px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/2 left-2/3 w-[300px] h-[300px] bg-violet-200/30 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="container relative px-4 sm:px-6 lg:px-8 z-10">
        {/* Mobile-only Header */}
        <div className="lg:hidden text-center mb-8 px-4">
          <div className="inline-block px-3 py-1 rounded-full bg-sky-50/80 border border-sky-100 text-sky-600 text-[10px] font-extrabold uppercase tracking-widest mb-3">
            Get a Quotation
          </div>
          <h2 className="font-display text-3xl font-black text-slate-800 mb-3 tracking-tight">
            Your dream trip, <span className="text-sky-500">priced perfectly.</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md mx-auto">
            Tell us where you'd like to go. We'll send a customized itinerary with transparent pricing within 2 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
          {/* Left Column: Custom Visual Section with traveler and stats */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-3d-lg border border-white/50 min-h-[620px] lg:min-h-none h-full bg-white/30 backdrop-blur-md p-8 flex flex-col justify-between hidden lg:flex">
            {/* Overlay grid mesh lines */}
            <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, transparent 80%, #bae6fd 100%)" }} />

            {/* Header & Stats layout */}
            <div className="flex justify-between items-start gap-6 relative z-10 w-full">
              {/* Header text */}
              <div className="max-w-[55%]">
                <div className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 text-sky-600 text-[10px] font-extrabold uppercase tracking-widest mb-4">
                  Get a Quotation
                </div>
                <h2 className="font-display text-4xl font-black text-slate-850 leading-tight mb-4 tracking-tight">
                  Your dream trip, <span className="text-sky-500">priced perfectly.</span>
                </h2>
                <p className="text-slate-600 font-semibold text-sm leading-relaxed">
                  Tell us where you'd like to go. We'll send a customized itinerary with transparent pricing within <span className="font-bold text-slate-800">2 hours</span>.
                </p>
              </div>

              {/* Stats stack on the right - Glassmorphic cards */}
              <div className="flex flex-col gap-3.5 w-[210px] flex-shrink-0">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl p-3.5 shadow-3d flex items-center gap-3 transition-transform hover:scale-[1.02]">
                    <div className="p-2 bg-white/80 rounded-xl flex-shrink-0 shadow-sm border border-white/60">
                      {s.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-black text-slate-800 leading-none">{s.value}</p>
                        {s.stars && (
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="w-2.5 h-2.5 fill-current" />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 mt-1 leading-none">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Transparent Traveler Graphic */}
            <img
              src="/assets/quote-traveler.png"
              alt="Traveler illustration"
              className="absolute bottom-16 left-4 w-[62%] h-auto max-h-[65%] object-contain object-left-bottom pointer-events-none z-0"
            />

            {/* Clickable footer contact links - Glassmorphism */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/70 backdrop-blur-md rounded-3xl p-4 border border-white/50 shadow-3d-lg grid grid-cols-4 gap-2 z-10">
              {contacts.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:bg-white/80 p-2 rounded-2xl transition-all"
                >
                  <div className="flex-shrink-0 p-1.5 bg-white/90 border border-white/85 rounded-xl shadow-sm">
                    {c.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-none mb-1">
                      {c.title}
                    </p>
                    <p className="text-[11px] font-extrabold text-slate-800 truncate leading-none mb-0.5">
                      {c.value}
                    </p>
                    <p className="text-[8px] font-semibold text-slate-400 leading-none">
                      {c.sub}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form Card - Glassmorphism */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/50 shadow-3d-lg flex flex-col justify-between relative z-10"
          >
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-850 tracking-tight mb-1">
                Request Quotation
              </h3>
              <div className="w-10 h-0.5 bg-sky-500 rounded-full mb-6" />

              <div className="space-y-4">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWithIcon
                    label="Your Name"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="John Doe"
                    icon={<User className="w-4 h-4 text-slate-400" />}
                    required
                  />
                  <FieldWithIcon
                    label="Phone"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="+91 8447706518"
                    icon={<Phone className="w-4 h-4 text-slate-400" />}
                    required
                  />
                </div>

                {/* Email */}
                <FieldWithIcon
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@email.com"
                  icon={<Mail className="w-4 h-4 text-slate-400" />}
                  required
                />

                {/* Destination + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectWithIcon
                    label="Destination"
                    value={form.destination}
                    onChange={(v) => setForm({ ...form, destination: v })}
                    icon={<Palmtree className="w-4 h-4 text-slate-400" />}
                    options={[
                      "Bali, Indonesia",
                      "Andaman",
                      "Thailand",
                      "Dubai",
                      "Europe",
                      "Maldives",
                      "Himachal",
                      "Kashmir",
                      "Sikkim",
                      "Kerala",
                      "Ladakh",
                      "Rajasthan",
                      "Singapore",
                      "Spiti",
                      "Sri Lanka",
                      "Switzerland",
                      "Turkey",
                      "Uttarakhand",
                      "Vietnam",
                    ]}
                  />
                  <SelectWithIcon
                    label="Budget (Per Person)"
                    value={form.budget}
                    onChange={(v) => setForm({ ...form, budget: v })}
                    icon={<CircleDollarSign className="w-4 h-4 text-slate-400" />}
                    options={["₹19k - ₹50k", "₹50k - ₹1L", "₹1L - ₹2L", "₹2L+"]}
                  />
                </div>

                {/* Travel Date + Travelers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWithIcon
                    label="Travel Date"
                    type="date"
                    value={form.travelDate}
                    onChange={(v) => setForm({ ...form, travelDate: v })}
                    placeholder="Select Date"
                    icon={<Calendar className="w-4 h-4 text-slate-400" />}
                    required
                  />
                  <CounterWithIcon
                    label="Travelers"
                    value={form.travelers}
                    onChange={(v) => setForm({ ...form, travelers: v })}
                    icon={<Users className="w-4 h-4 text-slate-400" />}
                  />
                </div>

                {/* Trip Type + Anything Specific */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectWithIcon
                    label="Trip Type"
                    value={form.tripType}
                    onChange={(v) => setForm({ ...form, tripType: v })}
                    icon={<Luggage className="w-4 h-4 text-slate-400" />}
                    options={["Honeymoon", "Family", "Adventure", "Group Tour", "Solo", "Friends"]}
                  />
                  <FieldWithIcon
                    label="Anything Specific?"
                    value={form.notes}
                    onChange={(v) => setForm({ ...form, notes: v })}
                    placeholder="Special requirements..."
                    icon={<Pencil className="w-4 h-4 text-slate-400" />}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#22c55e] hover:bg-[#1abc54] active:scale-[0.98] text-white font-extrabold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-base"
              >
                {WA_ICON}
                Send on WhatsApp
              </button>
              <p className="text-xs text-center text-slate-500 font-bold mt-3 flex items-center justify-center gap-1">
                <span>⚡</span> Reply within 2 hours • No spam, ever.
              </p>

              {/* Google Reviews Badge */}
              <ReviewsBadge />
            </div>
          </motion.form>
        </div>

        {/* Mobile-only contacts grid - Glassmorphic */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3 px-4">
          {contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-3 shadow-3d hover:shadow-3d-lg transition-all"
            >
              <div className="p-2 bg-white/90 border border-white/80 rounded-xl flex-shrink-0 shadow-sm">
                {c.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold leading-none mb-1">
                  {c.title}
                </p>
                <p className="text-[11px] font-extrabold text-slate-800 truncate leading-none mb-0.5">
                  {c.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const FieldWithIcon = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon: React.ReactNode;
  required?: boolean;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block ml-1">{label}</label>
    <div className="flex items-center w-full px-3 py-2 rounded-2xl border border-slate-200/80 bg-white/80 focus-within:bg-white focus-within:border-sky-500/50 transition-all text-sm font-semibold h-[48px]">
      <div className="flex items-center gap-2 mr-2">
        {icon}
        <span className="text-slate-300 font-medium">|</span>
      </div>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-300 font-semibold text-xs"
      />
    </div>
  </div>
);

const SelectWithIcon = ({
  label,
  value,
  onChange,
  options,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  icon: React.ReactNode;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block ml-1">{label}</label>
    <div className="flex items-center w-full px-3 py-2 rounded-2xl border border-slate-200/80 bg-white/80 focus-within:bg-white focus-within:border-sky-500/50 transition-all text-sm font-semibold h-[48px] relative">
      <div className="flex items-center gap-2 mr-2">
        {icon}
        <span className="text-slate-300 font-medium">|</span>
      </div>
      <select
        title={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-slate-800 outline-none font-bold appearance-none cursor-pointer pr-6 text-xs"
      >
        {options.map((o: string) => (
          <option key={o} value={o} className="bg-white text-slate-850 font-semibold">
            {o}
          </option>
        ))}
      </select>
      <div className="absolute right-4 pointer-events-none text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const CounterWithIcon = ({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  icon: React.ReactNode;
}) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block ml-1">{label}</label>
      <div className="flex items-center w-full px-3 py-2 rounded-2xl border border-slate-200/80 bg-white/80 focus-within:bg-white focus-within:border-sky-500/50 transition-all text-slate-800 text-sm font-semibold h-[48px]">
        <div className="flex items-center gap-2 flex-grow">
          {icon}
          <span className="text-slate-300 font-medium">|</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(Math.max(1, value - 1))}
            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200 transition-all select-none text-xs"
          >
            -
          </button>
          <span className="w-4 text-center font-bold text-slate-800 text-xs">{value}</span>
          <button
            type="button"
            onClick={() => onChange(value + 1)}
            className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200 transition-all select-none text-xs"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewsBadge = () => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100/80">
      <div className="flex items-center gap-3">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {[
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=60"
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Reviewer avatar"
              className="w-7 h-7 rounded-full border-2 border-white/80 object-cover"
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-slate-800 text-sm">4.9</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-[9px] font-bold text-slate-500 leading-none">
            Based on 1,200+ Google Reviews
          </p>
        </div>
      </div>

      {/* Google logo & verified badge - glass */}
      <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/60 shadow-sm">
        <span className="text-[11px] font-black tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>
        </span>
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">
          Verified
        </span>
        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
          <svg viewBox="0 0 24 24" className="w-2 h-2 fill-current">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Quote;
