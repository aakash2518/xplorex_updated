"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PARTICLES = [
  { w: 4, h: 4, top: 12, left: 8,  dur: 3.1, delay: 0   },
  { w: 3, h: 3, top: 25, left: 72, dur: 2.4, delay: 0.5 },
  { w: 5, h: 5, top: 60, left: 15, dur: 3.6, delay: 1.0 },
  { w: 2, h: 2, top: 80, left: 55, dur: 2.8, delay: 0.2 },
  { w: 4, h: 4, top: 45, left: 90, dur: 3.2, delay: 1.5 },
  { w: 3, h: 3, top: 10, left: 50, dur: 2.5, delay: 0.8 },
  { w: 5, h: 5, top: 70, left: 30, dur: 3.8, delay: 0.3 },
  { w: 2, h: 2, top: 35, left: 5,  dur: 2.6, delay: 1.2 },
  { w: 4, h: 4, top: 90, left: 85, dur: 3.0, delay: 0.6 },
  { w: 3, h: 3, top: 55, left: 60, dur: 2.9, delay: 1.8 },
  { w: 5, h: 5, top: 20, left: 35, dur: 3.4, delay: 0.1 },
  { w: 2, h: 2, top: 75, left: 78, dur: 2.7, delay: 1.4 },
];

export default function IntroScreen() {
  // Show on EVERY page load/refresh — no sessionStorage
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#CAF0F8" }}
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(144,213,234,0.6) 0%, #CAF0F8 80%)",
            }}
          />

          {/* Particles */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{ width: p.w, height: p.h, top: `${p.top}%`, left: `${p.left}%` }}
              animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.8, 1] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Expanding rings */}
          <motion.div
            className="absolute rounded-full border border-primary/25"
            initial={{ width: 160, height: 160, opacity: 0 }}
            animate={{ width: 420, height: 420, opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
          />
          <motion.div
            className="absolute rounded-full border border-primary/15"
            initial={{ width: 160, height: 160, opacity: 0 }}
            animate={{ width: 680, height: 680, opacity: [0, 0.25, 0] }}
            transition={{ duration: 2.6, ease: "easeOut", delay: 0.4 }}
          />

          {/* Logo + content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/xplorex-logo.png"
                alt="XploreX"
                width={150}
                height={150}
                priority
                className="object-contain"
                style={{ filter: "drop-shadow(0 0 24px rgba(30,27,110,0.35))" }}
              />
            </motion.div>

            {/* Tagline stagger */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-[3px]"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
              }}
            >
              {Array.from("Your Journey Starts Here").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                  className="text-sm sm:text-base font-semibold tracking-[0.18em] text-primary/80"
                  style={{
                    display: "inline-block",
                    width: char === " " ? "0.5em" : undefined,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="w-40 h-[2px] bg-primary/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #1e1b6e 0%, #00a8c8 100%)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.6, ease: "linear", delay: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
