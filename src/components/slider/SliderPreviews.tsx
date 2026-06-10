"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Destination } from "@/data/destinations";
import { vibrate } from "@/utils/helpers";

interface SliderPreviewsProps {
  destinations: Destination[];
  index: number;
  onSelect: (destIndex: number) => void;
}

export const SliderPreviews = React.memo(function SliderPreviews({
  destinations,
  index,
  onSelect,
}: SliderPreviewsProps) {
  return (
    <div className="hidden lg:flex items-center gap-8 mt-auto mb-24 pr-10 select-none">
      <AnimatePresence mode="popLayout">
        {[1, 2, 3].map((offset) => {
          const destIndex = (index + offset) % destinations.length;
          const dest = destinations[destIndex];

          return (
            <motion.button
              layout
              key={dest.slug}
              onClick={() => {
                vibrate(10);
                onSelect(destIndex);
              }}
              initial={{ opacity: 0, x: 150, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.5 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -15, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative w-56 h-80 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-white/10 hover:border-accent transition-colors flex-shrink-0 focus:outline-none"
            >
              <Image
                src={dest.img}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                sizes="(max-width: 1024px) 0vw, 250px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-8 text-left pointer-events-none">
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Up Next
                </div>
                <div className="text-xl font-bold text-white uppercase tracking-tight leading-tight">
                  {dest.name}
                </div>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
});

export default SliderPreviews;
