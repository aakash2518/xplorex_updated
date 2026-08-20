"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Plane, Calendar, Sparkles } from "lucide-react";
import HeroSearchBar from "./hero/HeroSearchBar";
import { HOME_STATS } from "@/constants/theme";



function CountUp({ to, label }: { to: string, label: string }) {
  // Extract number and suffix (like "12+" or "10K+")
  const numMatch = to.match(/[\d.]+/);
  const suffix = to.replace(/[\d.]+/, '');
  const endValue = numMatch ? parseFloat(numMatch[0]) : 0;
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    endValue % 1 !== 0 ? latest.toFixed(1) : Math.round(latest).toString()
  );

  useEffect(() => {
    const controls = animate(count, endValue, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [count, endValue]);

  return (
    <div className="text-center">
      <div className="font-display text-2xl sm:text-3xl font-bold text-white flex justify-center items-center">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 font-bold mt-0.5">{label}</div>
    </div>
  );
}

const Hero = React.memo(function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[75vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center pt-20 pb-16 sm:pb-24"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1/home_page.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b6e]/50 via-[#1e1b6e]/10 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
          
          {/* Content */}
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5 shadow-3d-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white/90">
                Where Global Expertise Meets Unbeatable Value
              </span>
            </motion.div>

            {/* Staggered Fade-Up Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5 text-white"
            >
              {"Explore ".split(" ").map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-3">
                  {word}
                </motion.span>
              ))}
              <motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="inline-block mr-3 font-script text-accent">
                Beyond
              </motion.span>
              {"Limits".split(" ").map((word, i) => (
                <motion.span key={i} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-white/80 font-medium max-w-2xl mx-auto mb-8"
            >
              Hand-crafted journeys across 12+ countries — from Bali&apos;s beaches to Bhutan&apos;s
              monasteries. Your next adventure starts at ₹19,000.
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl w-full mx-auto"
            >
              {HOME_STATS.map((s) => (
                <CountUp key={s.l} to={s.v} label={s.l} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Bar - Below hero section, not absolutely positioned */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-20 -mt-6 sm:-mt-10 px-4 sm:px-6 lg:px-8 pb-4"
      >
        <HeroSearchBar />
      </motion.div>
    </>
  );
});

export default Hero;
