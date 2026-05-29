"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Destination } from "@/data/destinations";
import { useDestinations } from "@/lib/useStore";

interface Props {
  destinations: Destination[];
}

export default function DestinationSlider({ destinations: propDestinations }: Props) {
  const liveDestinations = useDestinations();
  // Use live store data if available, fall back to prop
  const destinations = liveDestinations.length > 0 ? liveDestinations : propDestinations;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const active = destinations[index];

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 12000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black group">
      
      {/* ── Background Image with Smooth Cinematic Transition ── */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={active.slug}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 0.6, ease: "easeInOut" } 
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute inset-0 transform-gpu"
        >
          {/* Ken Burns Effect (Subtle Zoom) - Optimized */}
          <motion.div
            animate={{ scale: [1, 1.05] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={active.img}
              alt={active.name}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
          </motion.div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-[1]" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main Content Layer ── */}
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-16">
        
        {/* Left Side: Destination Info */}
        <div className="flex-1 w-full lg:max-w-2xl text-left mt-auto lg:mt-0 lg:mb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                exit: { 
                  opacity: 0,
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: 20 }
                }}
                className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-5"
              >
                <div className="w-12 h-[2px] bg-accent rounded-full" />
                <span>Explore {active.region}</span>
              </motion.div>
              
              <motion.h2 
                variants={{
                  hidden: { opacity: 0, y: 30, skewY: 2 },
                  visible: { opacity: 1, y: 0, skewY: 0 },
                  exit: { opacity: 0, y: -30 }
                }}
                className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] mb-6 sm:mb-10 uppercase tracking-tighter"
              >
                {active.name.split(' ')[0]}<br/>
                <span className="text-white/30">{active.name.split(' ').slice(1).join(' ') || "Travel"}</span>
              </motion.h2>
              
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -20 }
                }}
                className="text-white/70 text-sm sm:text-base md:text-xl font-medium max-w-sm mb-10 sm:mb-14 leading-relaxed border-l-2 border-accent/50 pl-5 sm:pl-6 italic"
              >
                {active.tagline}
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.8 }
                }}
              >
                <Link 
                  href={`/destinations/${active.slug}`}
                  className="group/btn inline-flex items-center gap-5 px-12 py-6 bg-white text-primary font-bold rounded-full shadow-2xl hover:bg-accent hover:text-white transition-all transform hover:scale-105 active:scale-95"
                >
                  View Packages
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover/btn:bg-white/20 transition-colors">
                     <ArrowRight className="w-6 h-6" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Horizontal Preview Cards with Smooth Layout Transitions */}
        <div className="hidden lg:flex items-center gap-8 mt-auto mb-24 pr-10">
          <AnimatePresence mode="popLayout">
            {[1, 2, 3].map((offset) => {
              const destIndex = (index + offset) % destinations.length;
              const dest = destinations[destIndex];

              return (
                <motion.button
                  layout
                  key={dest.slug}
                  onClick={() => {
                    setDirection(1);
                    setIndex(destIndex);
                  }}
                  initial={{ opacity: 0, x: 150, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.5 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="group relative w-56 h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/10 hover:border-accent transition-colors flex-shrink-0"
                >
                  <Image
                    src={dest.img}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 0vw, 250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 text-left">
                     <div className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Up Next</div>
                     <div className="text-xl font-bold text-white uppercase tracking-tight leading-tight">{dest.name}</div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-12 right-6 sm:right-12 lg:right-20 flex items-center justify-end z-20">
        <div className="flex gap-5">
          <button 
            onClick={prev} 
            className="w-16 h-16 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all group shadow-xl"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
          <button 
            onClick={next} 
            className="w-16 h-16 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all group shadow-xl"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
