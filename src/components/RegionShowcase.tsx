"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Destination } from "@/data/destinations";

interface RegionShowcaseProps {
  regionName: string;
  subtitle: string;
  bgMedia: string; // URL for image or video
  exploreLink: string;
  destinations: Destination[];
}

export default function RegionShowcase({
  regionName,
  subtitle,
  bgMedia,
  exploreLink,
  destinations,
}: RegionShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isVideo = bgMedia.endsWith(".mp4") || bgMedia.endsWith(".webm");

  return (
    <section className="relative w-full pb-12 sm:pb-16 pt-6 sm:pt-8 bg-background">
      <div className="w-[96%] max-w-[1800px] mx-auto">
        {/* Background Banner */}
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {isVideo ? (
            <video
              src={bgMedia}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={bgMedia}
              alt={regionName}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          {/* Content over banner */}
          <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8 lg:px-16 w-full max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl lg:text-6xl font-display font-bold text-white mb-2 sm:mb-3 drop-shadow-lg"
            >
              {regionName}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-xs sm:text-sm md:text-base font-medium mb-5 sm:mb-8 drop-shadow"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                href={exploreLink}
                className="inline-block bg-accent hover:bg-[#ffe100] text-primary font-bold px-5 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Explore
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Overlapping Destination Cards */}
        <div className="relative -mt-16 sm:-mt-24 lg:-mt-32 z-10 px-2 sm:px-4 sm:px-8">
          <div className="relative group">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-xl text-gray-700 grid place-items-center hover:bg-white hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#00bcd4] shadow-xl text-white grid place-items-center hover:bg-[#0097a7] hover:scale-105 transition-all"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Carousel Track */}
            <div
              ref={scrollRef}
              className="flex gap-3 sm:gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-6 pt-3 sm:pt-4 no-scrollbar items-end"
              style={{ scrollbarWidth: "none" }}
            >
              {destinations.map((dest, i) => (
                <div
                  key={dest.slug}
                  className="snap-center shrink-0 w-[55vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-black group/card"
                >
                  <Link href={`/destinations/${dest.slug}`} className="block relative aspect-[3/4] w-full h-full">
                    <Image
                      src={dest.img}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      sizes="(max-width: 640px) 55vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-center">
                      <h3 className="text-white font-display font-bold text-lg sm:text-2xl mb-1 drop-shadow-md">
                        {dest.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] font-bold text-white/70 uppercase tracking-widest drop-shadow">
                        Starting Price {dest.from}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
