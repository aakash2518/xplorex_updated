"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import PackageCard from "@/components/ui/PackageCard";
import { useDestinations } from "@/lib/useStore";

const filters = ["All", "International", "India", "Group", "Honeymoon"];

const Trips = () => {
  const [active, setActive] = useState("All");
  const destinations = useDestinations();
  
  const trips = useMemo(() => 
    destinations.flatMap(d => 
      d.packages.map(p => ({
        ...p,
        destination: d.name,
        slug: d.slug,
        img: p.img || d.img,
        region: d.region,
        days: parseInt(p.duration) || 5
      }))
    ).slice(0, 12), [destinations]);

  const visible = useMemo(() => 
    trips.filter((t) => {
      if (active === "All") return true;
      if (active === "International") return t.region === "International";
      if (active === "India") return t.region === "India";
      if (active === "Group") return t.category === "Group";
      if (active === "Honeymoon") return t.category === "Honeymoon";
      return true;
    }), 
    [trips, active]
  );

  return (
    <section id="trips" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur-md border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 shadow-3d-sm">
              Featured Packages
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              Popular <span className="text-gradient">Packages</span>
            </h2>
            <p className="text-primary/60 font-medium text-base sm:text-lg mt-2 max-w-xl mx-auto md:mx-0">
              Discover our most loved travel packages across destinations and categories.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  active === f
                    ? "bg-primary text-white shadow-press"
                    : "bg-white text-primary hover:bg-primary/5 border border-primary/10 shadow-3d-sm"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 perspective-1000">
          {visible.map((t, i) => (
            <PackageCard
              key={t.title + i}
              title={t.title}
              duration={t.duration}
              price={t.price}
              description={t.description}
              img={t.img}
              destination={t.destination}
              slug={t.slug}
              category={t.category}
              type={t.type}
              index={i}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-10 sm:mt-14 px-4 sm:px-0">
          <Link href="/india-trips" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white border-2 border-primary/10 text-primary font-bold shadow-3d-sm hover:-translate-y-1 transition-all text-center">
            India Trips
            <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
          <Link href="/international-trips" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-primary text-white font-bold shadow-3d-lg hover:-translate-y-1 transition-all text-center">
            International Trips
            <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trips;
