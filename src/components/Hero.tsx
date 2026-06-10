"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Sparkles } from "lucide-react";
import HeroSearchBar from "./hero/HeroSearchBar";
import { HOME_STATS } from "@/constants/theme";

const Hero = React.memo(function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !video.src) {
          video.src = "https://player.vimeo.com/external/370331493.sd.mp4?s=7b01637efbea6f369792036c05a1e204c32e9be4&profile_id=139&oauth2_token_id=57447761";
          video.load();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16 overflow-hidden bg-background"
    >
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-8 -right-12 sm:-right-24 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 rounded-full bg-primary/5 blur-3xl animate-blob will-change-transform transform-gpu" />
      <div className="pointer-events-none absolute top-1/3 -left-12 sm:-left-24 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 rounded-full bg-accent/8 blur-3xl animate-blob will-change-transform transform-gpu" style={{ animationDelay: "3s" }} />

      {/* Grid */}
      <div aria-hidden className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(hsl(246 67% 29%) 1px,transparent 1px),linear-gradient(90deg,hsl(246 67% 29%) 1px,transparent 1px)", backgroundSize: "48px 48px" }}
      />

      <div className="container relative z-[150] px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Left ── */}
          <div className="text-primary text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-4 sm:mb-6 shadow-3d-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-primary/75">
                Where Global Expertise Meets Unbeatable Value
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] mb-4 sm:mb-6"
            >
              Explore <br />
              <span className="font-script text-accent">Beyond</span> Limits
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-primary/65 font-medium max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-10"
            >
              Hand-crafted journeys across 12+ countries — from Bali's beaches to Bhutan's
              monasteries. Your next adventure starts at ₹19,000.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start"
            >
              <a href="#trips" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-primary text-white font-bold shadow-press overflow-hidden shine text-center text-sm sm:text-base active:scale-[0.96] active:opacity-90 transition-all">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Browse Trips
                  <Plane className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </a>
              <a href="#contact" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white border-2 border-primary/10 text-primary font-bold hover:bg-primary/5 transition-all shadow-3d-sm text-center text-sm sm:text-base active:scale-[0.96]">
                Get a Quote
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mt-8 sm:mt-12 max-w-xs sm:max-w-sm mx-auto lg:mx-0"
            >
              {HOME_STATS.map((s) => (
                <div key={s.l} className="text-center lg:text-left">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-primary/40 font-bold mt-0.5">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right card stack — md+ only ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative hidden md:block h-[400px] lg:h-[600px]"
          >
            {/* Video Container (Runway Takeoff) */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-3d-lg border-2 border-white bg-primary/10">
               <video
                 ref={videoRef}
                 autoPlay
                 loop
                 muted
                 playsInline
                 preload="none"
                 className="absolute inset-0 w-full h-full object-cover transform-gpu"
               />
               <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating info cards */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 lg:-left-8 top-8 bg-white/90 backdrop-blur-2xl rounded-xl p-3 shadow-3d-lg w-40 lg:w-48 z-10 border border-white"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent grid place-items-center text-white flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[9px] text-primary/40 font-semibold">Today's Bookings</div>
                  <div className="font-bold text-primary text-sm">+24 Trips</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-3 lg:-right-5 bottom-20 bg-white/90 backdrop-blur-2xl rounded-xl p-3 shadow-3d-lg w-40 lg:w-48 z-10 border border-white"
            >
              <div className="text-[9px] text-primary/40 font-semibold mb-1">Customer Rating</div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-500 text-xs">★</span>)}
              </div>
              <div className="text-xs font-bold text-primary">4.9 / 5 · 2,400+ reviews</div>
            </motion.div>
          </motion.div>

        </div>

        {/* ── Search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 sm:mt-14 lg:-mb-24"
        >
          <HeroSearchBar />
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
