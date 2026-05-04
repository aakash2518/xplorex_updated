"use client";

import { motion } from "framer-motion";
import { Globe2, BadgeIndianRupee, HeadphonesIcon, ShieldCheck, Sparkles, Star, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Users, label: "Happy Travelers", value: "10K+" },
  { icon: Globe2, label: "Countries Covered", value: "12+" },
  { icon: Star, label: "Success Rate", value: "99%" },
  { icon: Award, label: "Experience", value: "8+ Years" },
];

const values = [
  {
    icon: Globe2,
    title: "Global Proficiency",
    desc: "Navigate destinations with confidence, benefiting from deep cultural understanding and meticulous logistical planning across 12+ countries.",
    color: "from-primary to-accent",
  },
  {
    icon: BadgeIndianRupee,
    title: "Unbeatable Prices",
    desc: "Affordability without compromising on quality. From ₹19,000 onward, your dream destinations made convenient.",
    color: "from-accent to-primary",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Care",
    desc: "Seamless travel planning with full-time customer service. Our dedicated team supports you at every step of the journey.",
    color: "from-primary to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Verified",
    desc: "Industry-leading safety standards, verified partners, and transparent quotations — no hidden surprises.",
    color: "from-indigo-500 to-primary",
  },
];

export default function WhyUsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-4 shadow-3d-sm">
                Our Story
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-5 sm:mb-8">
                More Than Just a <br />
                <span className="text-gradient">Travel Agency</span>
              </h1>
              <p className="text-primary/60 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl">
                At Xplorex, we don't just sell trips — we design life-changing experiences.
                Our mission is to make international travel accessible, personalized, and
                absolutely worry-free for every Indian explorer.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 shadow-3d border border-primary/5">
                    <s.icon className="w-5 sm:w-6 h-5 sm:h-6 text-accent mb-2 sm:mb-3" />
                    <div className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-2xl sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-primary/5 shadow-3d-lg">
              <img src="/assets/hero-travel.jpg" alt="Our story" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 p-4 sm:p-6 bg-white/95 backdrop-blur-xl border border-primary/10 rounded-2xl sm:rounded-3xl shadow-3d-lg">
                <div className="text-accent font-bold mb-2 flex items-center gap-2 italic text-sm sm:text-base">
                  <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                  "The best travel planners we've used."
                </div>
                <div className="text-primary/40 text-xs sm:text-sm font-bold">— The Sharma Family</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Core <span className="text-gradient">Values</span>
          </h2>
          <p className="text-primary/60 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            The principles that guide every itinerary we build and every traveler we support.
          </p>
        </div>

        <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-primary/5 shadow-3d lift-hover">
              <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${v.color} grid place-items-center mb-5 sm:mb-6 shadow-glow group-hover:scale-110 transition-transform`}>
                <v.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-3">{v.title}</h3>
              <p className="text-primary/60 leading-relaxed font-medium text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
