"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

const frames = [
  { name: "Vietnam", src: "/frame/vietnam.jpeg" },
  { name: "Dubai", src: "/frame/dubai.jpeg" },
  { name: "Bhutan", src: "/frame/bhutan.jpeg" },
  { name: "Andaman", src: "/frame/andaman.jpeg" },
  { name: "Japan", src: "/frame/japan.jpeg" },
  { name: "Bali", src: "/frame/bali.jpeg" },
  { name: "Bali Escape", src: "/frame/bali (2).jpeg" },
  { name: "Singapore", src: "/frame/singapore.jpeg" },
  { name: "Singapore Vibes", src: "/frame/singapore (2).jpeg" },
  { name: "Thailand", src: "/frame/thailand.jpeg" },
  { name: "Himachal", src: "/frame/himachal.jpeg" },
  { name: "Baku", src: "/frame/baku.jpeg" },
  { name: "Edinburgh", src: "/frame/edinburg.jpeg" },
  { name: "Paris", src: "/frame/paris.png" },
  { name: "Russia", src: "/frame/russia.jpeg" },
];

export default function JourneyInFrames() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden relative">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 uppercase tracking-wide">
          EXPLORE THE EXTRAORDINARY
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Discover breathtaking destinations and create unforgettable memories.</p>
      </div>

      <div className="w-[96%] max-w-[1800px] mx-auto relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00bcd4] shadow-xl text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0097a7] hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00bcd4] shadow-xl text-white grid place-items-center opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0097a7] hover:scale-105"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Carousel */}
        <div className="relative overflow-hidden" style={{ clipPath: "ellipse(85% 50% at 50% 50%)" }}>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar bg-gray-900"
            style={{ scrollbarWidth: "none" }}
          >
            {frames.map((frame, i) => (
              <div
                key={i}
                className="snap-center shrink-0 relative w-[85vw] sm:w-[50vw] md:w-[33.33%] lg:w-[25%] aspect-[3/4] border-r-2 border-white last:border-0 group/frame"
              >
                <Image
                  src={frame.src}
                  alt={frame.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/frame:scale-110"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Location Chip */}
                <div className="absolute bottom-6 left-6 z-10">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-semibold">
                    <MapPin className="w-4 h-4" />
                    {frame.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
