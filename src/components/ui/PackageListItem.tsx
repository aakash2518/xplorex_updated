"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
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

export default function PackageListItem({
  title, duration, price, description, img,
  destination, slug, category, type, index,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-3d hover:shadow-3d-lg border border-primary/5 transition-all mb-6"
    >
      <div className="flex flex-col md:flex-row">
        {/* Left: Image Area */}
        <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          
          {/* Tag */}
          {category && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
              {category}
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
             <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
             <span className="text-white text-[10px] font-bold">4.9/5</span>
          </div>
        </div>

        {/* Right: Content Area */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-4 text-[11px] font-bold text-primary/40 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" />{duration}</span>
              <span className="w-1 h-1 rounded-full bg-primary/20" />
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" />{destination}</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors leading-tight">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-primary/60 font-medium leading-relaxed mb-6 line-clamp-2 italic">
              {description}
            </p>

            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8">
              {["Daily Breakfast", "Sightseeing", "Transfers", "Guided Tours"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-bold text-primary/70">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-green-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-primary/5">
            <div>
               <p className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em] mb-1">Starting Price</p>
               <p className="text-2xl font-black text-primary font-display">{price}</p>
            </div>
            
            <Link 
              href={`/destinations/${slug}`}
              className="px-8 py-3.5 bg-primary text-white font-bold rounded-2xl shadow-3d-sm hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
