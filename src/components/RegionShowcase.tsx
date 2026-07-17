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
    <section className="relative w-full pb-16 pt-8 bg-background">
      <div className="w-[96%] max-w-[1800px] mx-auto">
        {/* Background Banner */}
        <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
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
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16 w-full max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-3 drop-shadow-lg"
            >
              {regionName}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/90 text-sm sm:text-base font-medium mb-8 drop-shadow"
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
                className="inline-block bg-accent hover:bg-[#ffe100] text-primary font-bold px-8 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                Explore
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Overlapping Destination Cards */}
        <div className="relative -mt-24 sm:-mt-32 z-10 px-4 sm:px-8">
          <div className="relative group">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 shadow-xl text-gray-700 grid place-items-center hover:bg-white hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00bcd4] shadow-xl text-white grid place-items-center hover:bg-[#0097a7] hover:scale-105 transition-all"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Carousel Track */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-4 no-scrollbar items-end"
              style={{ scrollbarWidth: "none" }}
            >
              {destinations.map((dest, i) => (
                <div
                  key={dest.slug}
                  className="snap-center shrink-0 w-[70vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-black group/card"
                >
                  <Link href={`/destinations/${dest.slug}`} className="block relative aspect-[3/4] w-full h-full">
                    <Image
                      src={dest.img}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      sizes="(max-width: 768px) 70vw, (max-width: 1024px) 33vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                      <h3 className="text-white font-display font-bold text-2xl mb-1 drop-shadow-md">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest drop-shadow">
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
