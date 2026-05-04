"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight } from "lucide-react";
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

const PackageCard = ({
  title, duration, price, description, img,
  destination, slug, category, type, index,
}: PackageCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ delay: (index % 3) * 0.05, duration: 0.35, ease: "easeOut" }}
    className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-3d hover:shadow-3d-lg border border-primary/5 transition-all duration-300 transform-gpu"
  >
    <Link href={`/destinations/${slug}`} className="block">
      {/* Image */}
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={index < 3 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-xl shadow-lg text-sm leading-tight">
          <p className="text-[9px] uppercase opacity-70 leading-none mb-0.5">From</p>
          {price}
        </div>

        {/* Category badge */}
        {category && (
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-accent/90 text-white text-[10px] font-bold uppercase tracking-wide shadow">
            {category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3 text-[11px] font-bold text-primary/40 uppercase tracking-tight">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" />{duration}</span>
          <span className="w-1 h-1 rounded-full bg-primary/15" />
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent" />{destination}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3rem]">
          {title}
        </h3>

        <p className="text-sm text-primary/55 font-medium leading-relaxed line-clamp-2 mb-5">
          {description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-primary/5">
          <span className="flex items-center gap-1 text-accent font-bold text-sm">
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
          {type && (
            <span className="px-2.5 py-1 rounded-full bg-primary/5 text-primary/50 text-[10px] font-bold uppercase tracking-wide">
              {type}
            </span>
          )}
        </div>
      </div>
    </Link>
  </motion.article>
);

export default PackageCard;
