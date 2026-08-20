"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, VolumeX, Volume2 } from "lucide-react";
import { HAPPY_CUSTOMERS_MEDIA, type MediaItem } from "@/constants/theme";
import { vibrate } from "@/utils/helpers";
import Image from "next/image";

const MediaCard = React.memo(function MediaCard({ item }: { item: MediaItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative flex-shrink-0 w-[240px] h-[420px] sm:w-[280px] sm:h-[500px] md:w-[320px] md:h-[560px] rounded-[2rem] overflow-hidden shadow-xl border border-gray-200/50 bg-white group transform-gpu"
    >
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 240px, 320px"
          className="object-cover pointer-events-none"
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover transform-gpu"
            muted={isMuted}
            loop
            playsInline
            preload="none"
          />
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all duration-300"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
});

export const HappyCustomers = React.memo(function HappyCustomers() {
  const handleSuccessClick = React.useCallback(() => {
    vibrate(10);
  }, []);

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden bg-[#fafafa] flex flex-col items-center justify-center"
      id="testimonials"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="w-full relative z-[150] flex flex-col items-center">
        
        {/* Top: Text content */}
        <div className="container px-4 mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm mb-6 sm:mb-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-blue-400" />
                ))}
              </div>
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Trusted by 10,000+ Travelers
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-6 tracking-tight text-gray-900">
              Real Stories from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
                Our Community
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed">
              Join thousands of explorers who have discovered the world&apos;s most breathtaking
              destinations with Xplorex. Your next adventure starts here.
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href="https://www.holidify.com/travel-agent-details/xplorex-54500/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSuccessClick}
                className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 shadow-xl flex items-center gap-2 group hover:scale-105 active:scale-95"
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

        {/* Bottom: Horizontal Carousel */}
        <div className="w-full relative">
          {/* Fade edges for smooth scrolling effect on large screens */}
          <div className="hidden md:block absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 md:px-24">
            {HAPPY_CUSTOMERS_MEDIA.map((item, index) => (
              <div key={index} className="snap-center shrink-0">
                <MediaCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
});

export default HappyCustomers;