"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";

interface TripCardProps {
  name: string;
  slug: string;
  tagline: string;
  img: string;
  tripsCount: number;
  startingPrice?: string;
  index: number;
}

const TripCard = React.memo(function TripCard({ name, slug, tagline, img, tripsCount, startingPrice, index }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.07, duration: 0.45 }}
    >
      <Link
        href={`/destinations/${slug}`}
        className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden shadow-3d aspect-[3/4] border border-primary/10 active:scale-[0.98] transition-all"
      >
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading={index < 4 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Package count */}
        <div className="absolute top-2.5 right-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-[10px] font-bold text-white flex items-center gap-1.5">
          <Clock className="w-3 h-3" />
          {tripsCount} Packages
        </div>

        {/* Bottom info */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5 text-white">
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
            <MapPin className="w-3 h-3" />
            {startingPrice ? `From ${startingPrice}` : 'View Details'}
          </div>
          <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-md leading-tight">
            {name}
          </div>
          <div className="text-xs text-white/70 mt-0.5 line-clamp-1">{tagline}</div>
          <div className="mt-2 h-0.5 w-6 bg-accent group-hover:w-14 transition-all duration-400 rounded-full" />
        </div>
      </Link>
    </motion.div>
  );
});

export default TripCard;
