"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TripCard from "@/components/ui/TripCard";
import { getInternationalDestinations } from "@/data/destinations";

export default function InternationalTripsPage() {
  const internationalDestinations = getInternationalDestinations();

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-3d-sm">
              Beyond Borders
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-4 sm:mb-6">
              International <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 sm:px-0">
              Discover the world's most captivating destinations - from tropical paradises to bustling cities, 
              ancient cultures to modern marvels. Your global adventure awaits.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {internationalDestinations.map((destination, i) => (
              <TripCard
                key={destination.slug}
                name={destination.name}
                slug={destination.slug}
                tagline={destination.tagline}
                img={destination.img}
                tripsCount={destination.trips}
                startingPrice={destination.from}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}