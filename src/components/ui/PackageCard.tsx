"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PackageCardProps {
  title: string;
  duration: string;
  price: string;
  description: string;
  img: string;
  destination: string;
  slug: string;
  category?: string;
  type?: string;
  index: number;
}

const PackageCard = React.memo(function PackageCard({
  title, duration, price, description, img,
  destination, slug, category, type, index,
}: PackageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: (index % 3) * 0.05, duration: 0.35, ease: "easeOut" }}
      className="group relative h-[400px] sm:h-[450px] lg:h-[480px] bg-neutral-900 rounded-xl overflow-hidden shadow-3d hover:shadow-3d-lg transition-all duration-300 transform-gpu"
    >
      <Link href={`/destinations/${slug}`} className="block w-full h-full">
        {/* Background Image */}
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
        
        {/* Gradient Overlay for bottom text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price Badge (Top Right) */}
        <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full shadow-lg text-xs flex items-center gap-1.5">
          <span>{price}/- Onwards</span>
        </div>

        {/* Content at Bottom */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 text-white z-10 flex flex-col justify-end">
          <h3 className="font-display text-base sm:text-lg font-bold leading-snug mb-3 line-clamp-2 text-white">
            {title}
          </h3>

          <div className="flex flex-col gap-2.5 text-[11px] sm:text-xs font-bold text-white/90">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00bcd4]" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#00bcd4]" />
                <span className="line-clamp-1 text-right">{destination}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00bcd4]">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>Upcoming Batches</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
});

export default PackageCard;
