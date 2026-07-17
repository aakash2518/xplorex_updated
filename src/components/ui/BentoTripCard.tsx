import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface BentoTripCardProps {
  name: string;
  slug: string;
  tagline: string;
  img: string;
  tripsCount: number;
  startingPrice: string;
  bestTime?: string;
  tags?: string[];
  isFeatured?: boolean;
  flag?: string;
  visaStatus?: string;
}

export default function BentoTripCard({
  name,
  slug,
  tagline,
  img,
  tripsCount,
  startingPrice,
  bestTime,
  tags = [],
  isFeatured = false,
  flag,
  visaStatus,
}: BentoTripCardProps) {
  // Use Framer Motion layout variants
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-3d-sm h-[350px] sm:h-[400px] ${
        isFeatured ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
    >
      <Link href={`/destinations/${slug}`} className="absolute inset-0 block z-20">
        <span className="sr-only">View {name}</span>
      </Link>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 transition-opacity duration-500 group-hover:bg-black/50" />
      </div>

      {/* Top Content: Name, Tagline, Tags */}
      <div className="absolute top-0 left-0 right-0 p-5 z-10 flex flex-col items-start gap-2">
        <div className="flex justify-between items-start w-full">
          <div>
            <h3 className="text-white font-display text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md flex items-center gap-2">
              {name} {flag && <span>{flag}</span>}
            </h3>
            <p className="text-white/80 font-medium text-sm sm:text-base mt-1 drop-shadow-md">
              {tagline}
            </p>
          </div>
          {/* Tags & Visa */}
          <div className="flex flex-col items-end gap-1.5 max-w-[50%]">
            {visaStatus && (
              <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-sm">
                <span className={`w-2 h-2 rounded-full shadow-sm ${
                  visaStatus.toLowerCase().includes('free') ? 'bg-green-400' :
                  visaStatus.toLowerCase().includes('arrival') || visaStatus.toLowerCase().includes('e-visa') ? 'bg-amber-400' :
                  'bg-red-400'
                }`} />
                {visaStatus}
              </span>
            )}
            <div className="flex flex-wrap justify-end gap-1.5">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Reveal: Best Season */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {bestTime && (
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-white font-semibold text-xs whitespace-nowrap">
              Best season: {bestTime}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Content: Price and Packages */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
            Starting from
          </span>
          <div className="flex flex-col items-start">
            <span className="bg-primary/90 text-white px-3 py-1.5 rounded-xl font-bold text-sm sm:text-base inline-block border border-white/10 shadow-lg">
              {startingPrice}
            </span>
            <span className="text-[10px] text-white/50 font-medium mt-1 uppercase tracking-wide">
              (excl. flights)
            </span>
          </div>
        </div>
        <div className="bg-white/90 text-primary px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border border-white/20 shadow-lg">
          {tripsCount} Packages
        </div>
      </div>
    </motion.div>
  );
}
