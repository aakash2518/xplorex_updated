"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { Destination } from "@/data/destinations";
import { useDestinations } from "@/lib/useStore";
import SliderPreviews from "./slider/SliderPreviews";
import SliderContent from "./slider/SliderContent";
import { vibrate } from "@/utils/helpers";

interface Props {
  destinations: Destination[];
}

export const DestinationSlider = React.memo(function DestinationSlider({
  destinations: propDestinations,
}: Props) {
  const liveDestinations = useDestinations();
  // Use live store data if available, fall back to prop
  const destinations = liveDestinations.length > 0 ? liveDestinations : propDestinations;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const active = destinations[index];

  const next = useCallback(() => {
    vibrate(10);
    setDirection(1);
    setIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const prev = useCallback(() => {
    vibrate(10);
    setDirection(-1);
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const selectIndex = useCallback((destIndex: number) => {
    setDirection(1);
    setIndex(destIndex);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 12000);
    return () => clearInterval(timer);
  }, [next]);

  if (!active) return null;

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
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 transform-gpu pointer-events-none"
        >
          {/* Ken Burns — pure CSS compositor animation, zero JS per-frame */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={active.img}
              alt={active.name}
              fill
              className="object-cover kenburns"
              priority={index === 0}
              sizes="100vw"
            />
          </div>
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-[1]" />
        </motion.div>
      </AnimatePresence>

      {/* ── Main Content Layer ── */}
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-16">
        {/* Left Side: Destination Info */}
        <SliderContent active={active} />

        {/* Right Side: Horizontal Preview Cards */}
        <SliderPreviews
          destinations={destinations}
          index={index}
          onSelect={selectIndex}
        />
      </div>

      {/* ── Bottom Controls ── */}
      <div className="absolute bottom-12 right-6 sm:right-12 lg:right-20 flex items-center justify-end z-20">
        <div className="flex gap-5">
          <button
            onClick={prev}
            className="w-16 h-16 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all group shadow-xl active:scale-[0.96]"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={next}
            className="w-16 h-16 rounded-full border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-primary hover:border-white transition-all group shadow-xl active:scale-[0.96]"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default DestinationSlider;
