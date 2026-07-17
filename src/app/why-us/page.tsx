"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Globe2, Star, Users, Award, ShieldCheck, BadgeCheck,
  PhoneCall, Headphones, FileCheck2, MapPinned, Quote,
  CheckCircle2, Sparkles
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { CORE_VALUES } from "@/constants/theme";
import type { LucideIcon } from "lucide-react";

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Users,  value: "10K+",   label: "Happy Travelers" },
  { icon: Globe2, value: "12+",    label: "Countries" },
  { icon: Star,   value: "4.9/5",  label: "Avg Rating" },
  { icon: Award,  value: "8+ Yrs", label: "Experience" },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const STEPS = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Enquiry",
    desc: "Share your travel dates, budget & dream destination. We listen, we understand.",
    color: "from-indigo-500 to-primary",
    accent: "#1e1b6e",
  },
  {
    icon: FileCheck2,
    step: "02",
    title: "Custom Itinerary in 2 hrs",
    desc: "Receive a fully personalised itinerary built around your preferences — in under 2 hours.",
    color: "from-amber-400 to-orange-500",
    accent: "#f59e0b",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Confirm & Pay",
    desc: "Review, tweak, and lock your plan. Secure payment with zero hidden charges.",
    color: "from-emerald-400 to-teal-500",
    accent: "#10b981",
  },
  {
    icon: Headphones,
    step: "04",
    title: "24/7 Trip Support",
    desc: "From departure to return, our team is reachable round the clock — WhatsApp, call, or email.",
    color: "from-violet-500 to-purple-600",
    accent: "#8b5cf6",
  },
];

// ─── Trust logos (text fallback since no logo assets) ────────────────────────
const TRUST_BADGES = [
  { label: "Govt. of India Registered", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { label: "IATA Affiliated",            icon: BadgeCheck,  color: "text-blue-600",    bg: "bg-blue-50 border-blue-200"    },
  { label: "Google Verified Business",   icon: CheckCircle2,color: "text-primary",     bg: "bg-primary/5 border-primary/20"},
  { label: "5-Star Rated on Google",     icon: Star,        color: "text-amber-500",   bg: "bg-amber-50 border-amber-200"  },
];

// ─── Photo collage grid ───────────────────────────────────────────────────────
const COLLAGE = [
  { src: "/assets/dest-kashmir.jpg",   cls: "col-span-2 row-span-2" },
  { src: "/assets/dest-bali.jpg",      cls: "col-span-1 row-span-1" },
  { src: "/assets/dest-ladakh.png",    cls: "col-span-1 row-span-1" },
  { src: "/assets/dest-rajasthan.png", cls: "col-span-1 row-span-2" },
  { src: "/assets/dest-meghalaya.png", cls: "col-span-2 row-span-1" },
];

// ─── Animated connecting line ─────────────────────────────────────────────────
function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36 bg-primary/3 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            How It Works
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Your Journey, <span className="text-gradient">Effortlessly Planned</span>
          </h2>
          <p className="text-primary/60 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            From your first message to the last day of your trip — we've got every detail covered.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-primary/10 mx-[12.5%]">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-amber-400 via-emerald-400 to-violet-500 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${step.color} shadow-lg shadow-black/15 flex items-center justify-center mb-6 z-10 transition-shadow group-hover:shadow-xl`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-[11px] font-black text-primary shadow-md"
                      style={{ borderColor: step.accent }}>
                      {step.step}
                    </div>
                  </motion.div>

                  {/* Mobile connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="sm:hidden w-0.5 h-8 bg-primary/15 mb-2 rounded-full" />
                  )}

                  <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-primary/55 text-sm font-medium leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function WhyUsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* ── Section 1: Hero + Mission ──────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        {/* BG accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/4 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="container px-4 sm:px-6 lg:px-8 relative">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Our Story
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight mb-6">
                More Than Just a <br />
                <span className="text-gradient">Travel Agency</span>
              </h1>
              <p className="text-primary/60 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl">
                At Xplorex, we believe travel is the greatest teacher. Our mission is to make world-class
                travel <strong className="text-primary">accessible</strong>, deeply <strong className="text-primary">personal</strong>, and absolutely <strong className="text-primary">worry-free</strong> for
                every Indian explorer — no matter the budget.
              </p>

              {/* Founder quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-primary/10 rounded-3xl p-6 shadow-md mb-10 relative"
              >
                <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
                <p className="text-primary/70 text-sm sm:text-base italic leading-relaxed font-medium mb-4">
                  "We started Xplorex with one simple belief — that every Indian deserves to see the world without
                  breaking the bank or stressing over logistics. Every itinerary we build carries that promise."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow">
                    AK
                  </div>
                  <div>
                    <div className="font-bold text-primary text-sm">Founder, Xplorex</div>
                    <div className="text-primary/40 text-xs font-medium">8+ Years in Travel Industry</div>
                  </div>
                </div>
              </motion.div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-primary/5 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary font-display">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-primary/35 font-bold">{s.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image with overlay card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/assets/dest-kashmir.jpg"
                  alt="Xplorex team at work"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                {/* Floating customer quote */}
                <div className="absolute bottom-5 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-primary/10">
                  <div className="text-amber-500 flex gap-0.5 mb-1.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-primary text-xs sm:text-sm font-semibold italic leading-snug mb-2">
                    "Best travel agency I've ever used. The itinerary was perfect and team was available 24/7!"
                  </p>
                  <div className="text-primary/40 text-[11px] font-bold">— The Sharma Family, Kashmir Trip 2024</div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 py-3 rounded-2xl shadow-xl font-bold text-sm"
              >
                <div className="text-2xl font-display leading-none">8+</div>
                <div className="text-[10px] uppercase tracking-wider font-bold opacity-90">Years of<br/>Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Process Timeline ────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── Core Values ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-3">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="text-primary/55 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              The principles that guide every itinerary we build and every traveler we support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CORE_VALUES.map((v, i) => {
              const Icon = v.icon as LucideIcon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(30,27,110,0.14)" }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/6 shadow-md"
                >
                  <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${v.color} w-14 h-14 grid place-items-center mb-5 shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{v.title}</h3>
                  <p className="text-primary/60 text-sm leading-relaxed font-medium">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: Trust Strip + Photo Collage ─────────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted & Verified
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary mb-3">
              Certified. Safe. <span className="text-gradient">Reliable.</span>
            </h2>
            <p className="text-primary/55 text-base max-w-xl mx-auto font-medium">
              We're backed by industry certifications and thousands of real traveler experiences.
            </p>
          </motion.div>

          {/* Partner/certification badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {TRUST_BADGES.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center gap-2.5 px-4 py-5 rounded-2xl border ${badge.bg} text-center`}
              >
                <badge.icon className={`w-7 h-7 ${badge.color}`} />
                <span className="text-xs font-bold text-primary/70 leading-tight">{badge.label}</span>
              </motion.div>
            ))}
          </div>

          {/* 10K+ milestone + photo collage */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Big stat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <div className="font-display text-7xl sm:text-8xl font-black text-primary leading-none">
                  10,000
                  <span className="text-accent">+</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary/60 mt-2">Happy Travelers &amp; Counting</div>
              </div>
              <p className="text-primary/55 text-base sm:text-lg font-medium leading-relaxed max-w-md">
                Every photo, every video, every smile in our gallery represents a real life transformed by travel.
                These are not stock photos — these are our people.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Kashmir ❄️", "Bali 🌺", "Ladakh 🏔️", "Rajasthan 🏰", "Kerala 🌿", "Meghalaya 🌧️"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-primary/10 rounded-xl text-xs font-bold text-primary/60 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5 text-sm"
              >
                <MapPinned className="w-4 h-4" />
                Plan My Trip
              </Link>
            </motion.div>

            {/* Right: Photo collage grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 grid-rows-3 gap-3 h-[420px] sm:h-[500px]"
            >
              {COLLAGE.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, zIndex: 10 }}
                  className={`relative rounded-2xl overflow-hidden shadow-md ${photo.cls}`}
                >
                  <Image
                    src={photo.src}
                    alt={`Traveler memory ${i + 1}`}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-primary via-indigo-700 to-primary relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/assets/dest-kashmir.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="container px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Explore the World?
          </h2>
          <p className="text-white/70 text-base sm:text-lg font-medium max-w-xl mx-auto mb-8">
            Join 10,000+ happy travelers who trusted Xplorex. Your dream trip is one message away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white text-primary font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
            >
              Plan My Trip Now
            </Link>
            <a
              href="https://wa.me/918447706518"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-sm backdrop-blur"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
