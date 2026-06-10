"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { HAPPY_CUSTOMERS_MEDIA, type MediaItem } from "@/constants/theme";
import { vibrate } from "@/utils/helpers";
import Image from "next/image";

const MediaCard = React.memo(function MediaCard({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play video only when visible — saves CPU + bandwidth
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {/* autoplay policy — silent */});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    // Pure CSS float — runs on compositor, zero JS per-frame cost
    <div
      className={`absolute ${item.position} ${item.size} z-10 will-change-transform ${item.floatClass}`}
      style={{ rotate: `${item.rotate}deg` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 group hover:scale-105 transition-transform duration-500 hover:z-50 transform-gpu"
      >
        {item.type === "image" ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 150px, 250px"
            className="object-cover pointer-events-none"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover pointer-events-none transform-gpu"
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </div>
  );
});

export const HappyCustomers = React.memo(function HappyCustomers() {
  const handleSuccessClick = React.useCallback(() => {
    vibrate(10);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] md:min-h-[120vh] py-24 overflow-hidden bg-[#fafafa] flex flex-col items-center justify-center"
      id="testimonials"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[80px]" />
      </div>

      {/* Floating media grid */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
        {HAPPY_CUSTOMERS_MEDIA.map((item, index) => (
          <MediaCard key={index} item={item} />
        ))}
      </div>

      {/* Central content */}
      <div className="container relative z-[150] px-4 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto px-4 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm mb-8">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-blue-400" />
              ))}
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by 10,000+ Travelers
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900">
            Real Stories from <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
              Our Community
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join thousands of explorers who have discovered the world&apos;s most breathtaking
            destinations with Xplorex. Your next adventure starts here.
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <a
              href="https://www.holidify.com/travel-agent-details/xplorex-54500/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSuccessClick}
              className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-colors duration-200 shadow-xl flex items-center gap-2 group active:scale-[0.96]"
            >
              Read Success Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <div className="flex items-center gap-2 py-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
});

export default HappyCustomers;