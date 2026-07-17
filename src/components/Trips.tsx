"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDestinations } from "@/lib/useStore";

const filters = ["All", "International", "India"];

const Trips = () => {
  const [active, setActive] = useState("All");
  const destinations = useDestinations();
  
  const visibleDestinations = useMemo(() => 
    destinations.filter((d) => {
      if (active === "All") return true;
      if (active === "International") return d.region === "International";
      if (active === "India") return d.region === "India";
      return true;
    }), 
    [destinations, active]
  );

  return (
    <section id="trips" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="w-[96%] max-w-[1800px] mx-auto relative px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
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
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold transition-all ${
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

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {visibleDestinations.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link href={`/destinations/${d.slug}`} className="flex flex-col items-center gap-3 sm:gap-4 group w-24 sm:w-28 md:w-32">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden relative shadow-lg group-hover:shadow-2xl transition-all border-4 border-white">
                  <Image 
                    src={d.img} 
                    alt={d.name} 
                    fill 
                    sizes="128px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-primary text-center leading-tight group-hover:text-[#00bcd4] transition-colors">
                  {d.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-12 sm:mt-16 px-4 sm:px-0">
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
