"use client";

import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Destination } from "@/data/destinations";
import { vibrate } from "@/utils/helpers";

interface SliderContentProps {
  active: Destination;
}

export const SliderContent = React.memo(function SliderContent({
  active,
}: SliderContentProps) {
  const handleViewPackages = useCallback(() => {
    vibrate([10, 30, 10]);
  }, []);

  return (
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
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
            exit: {
              opacity: 0,
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
          }}
        >
          {/* Region Tag */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: 20 },
            }}
            className="flex items-center gap-3 text-accent font-bold uppercase tracking-[0.5em] text-[10px] sm:text-xs mb-5"
          >
            <div className="w-12 h-[2px] bg-accent rounded-full" />
            <span>Explore {active.region}</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30, skewY: 2 },
              visible: { opacity: 1, y: 0, skewY: 0 },
              exit: { opacity: 0, y: -30 },
            }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] mb-6 sm:mb-10 uppercase tracking-tighter"
          >
            {active.name.split(" ")[0]}
            <br />
            <span className="text-white/30">
              {active.name.split(" ").slice(1).join(" ") || "Travel"}
            </span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
            }}
            className="text-white/70 text-sm sm:text-base md:text-xl font-medium max-w-sm mb-10 sm:mb-14 leading-relaxed border-l-2 border-accent/50 pl-5 sm:pl-6 italic"
          >
            {active.tagline}
          </motion.p>

          {/* View Packages Button */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.8 },
            }}
          >
            <Link
              href={`/destinations/${active.slug}`}
              onClick={handleViewPackages}
              className="group/btn inline-flex items-center gap-5 px-12 py-6 bg-white text-primary font-bold rounded-full shadow-2xl hover:bg-accent hover:text-white transition-all transform hover:scale-105 active:scale-[0.96] active:opacity-90"
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
  );
});

export default SliderContent;
