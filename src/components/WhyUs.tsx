"use client";

import { motion } from "framer-motion";
import { Globe2, BadgeIndianRupee, HeadphonesIcon, ShieldCheck } from "lucide-react";

const features = [
  { icon: Globe2,           title: "International Proficiency", desc: "Navigate destinations with confidence, benefiting from deep cultural understanding and meticulous logistical planning across 12+ countries.", color: "from-primary to-accent" },
  { icon: BadgeIndianRupee, title: "Unbeatable Prices",         desc: "Affordability without compromising on quality. From ₹19,000 onward, your dream destinations made convenient.",                              color: "from-accent to-primary" },
  { icon: HeadphonesIcon,   title: "24/7 Customer Care",        desc: "Seamless travel planning with full-time customer service. Our dedicated team supports you at every step of the journey.",                   color: "from-primary to-indigo-500" },
  { icon: ShieldCheck,      title: "Trusted & Verified",        desc: "Industry-leading safety standards, verified partners, and transparent quotations — no hidden surprises.",                                    color: "from-indigo-500 to-primary" },
];

const WhyUs = () => (
  <section id="why" className="py-16 sm:py-24 lg:py-32 relative bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-center lg:text-left lg:sticky lg:top-32"
        >
          <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            Why Xplorex
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-primary">
            Crafted with <span className="text-gradient">care</span>, delivered with precision.
          </h2>
          <p className="text-primary/60 text-base sm:text-lg mb-8 font-medium max-w-lg mx-auto lg:mx-0">
            We don't sell trips — we design experiences. From budget-friendly Andaman packages
            to luxurious Maldives escapes, every itinerary is built around you.
          </p>

          {/* Ring badge */}
          <div className="relative w-36 sm:w-44 h-36 sm:h-44 mx-auto lg:mx-0 perspective-1000">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-indigo-500 animate-spin-slow opacity-90 shadow-glow" />
            <div className="absolute inset-3 rounded-full bg-white grid place-items-center border border-primary/5">
              <div className="text-center">
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary">10K+</div>
                <div className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">Travelers</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right — feature cards, NO offset on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-3d border border-primary/5"
            >
              <div className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${f.color} grid place-items-center mb-4 sm:mb-5 shadow-3d-sm group-hover:scale-110 transition-transform`}>
                <f.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary">{f.title}</h3>
              <p className="text-sm text-primary/60 leading-relaxed font-medium">{f.desc}</p>
              <div className="absolute top-4 right-4 font-display text-4xl sm:text-5xl font-bold text-primary/5 group-hover:text-accent/10 transition-colors select-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyUs;
