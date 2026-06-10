"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/data/destinations";

interface OtherDestinationsProps {
  others: Destination[];
}

export const OtherDestinations = React.memo(function OtherDestinations({
  others,
}: OtherDestinationsProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10 sm:mb-14 text-primary text-center">
          Explore more <span className="text-gradient">destinations</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/destinations/${o.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-3d aspect-[3/4] border border-primary/5 active:scale-[0.98] transition-all"
            >
              <Image
                src={o.img}
                alt={o.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white pointer-events-none">
                <div className="font-display text-xl sm:text-2xl font-bold drop-shadow-md mb-1">
                  {o.name}
                </div>
                <div className="text-[10px] opacity-80 font-bold text-accent uppercase tracking-widest">
                  {o.packages.length} Packages
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

export default OtherDestinations;
