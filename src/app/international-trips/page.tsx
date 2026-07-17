"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BentoTripCard from "@/components/ui/BentoTripCard";
import { getInternationalDestinations } from "@/data/destinations";

const REGION_TABS = ["All", "Southeast Asia", "Middle East", "Europe", "Central Asia", "Asia-Pacific"];

export default function InternationalTripsPage() {
  const allDestinations = getInternationalDestinations();
  const [activeTab, setActiveTab] = useState("All");

  const filteredDestinations = useMemo(() => {
    let filtered = allDestinations;

    if (activeTab !== "All") {
      filtered = filtered.filter(d => d.tags?.includes(activeTab));
    }

    // Sort by trips descending for bento layout
    return [...filtered].sort((a, b) => b.trips - a.trips);
  }, [allDestinations, activeTab]);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-primary/5 blur-3xl -z-10" />
        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-white backdrop-blur border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-3d-sm">
              Beyond Borders
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-4 sm:mb-6">
              International <span className="text-gradient">Escapes</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 sm:px-0 max-w-3xl mx-auto">
              Embark on unforgettable journeys across the globe. From pristine tropical beaches to historic European cities, discover world-class destinations curated just for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <section className="pb-8 sticky top-20 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-xl border border-primary/10 p-2 rounded-2xl shadow-3d-md overflow-x-auto no-scrollbar">
            <div className="flex items-center min-w-max gap-2 relative">
              {REGION_TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-2.5 rounded-xl font-bold text-sm transition-colors z-10 ${
                      isActive ? "text-white" : "text-primary/70 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-16 sm:pb-24 lg:pb-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          {filteredDestinations.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-primary/5 shadow-sm"
            >
              <h3 className="text-xl font-bold text-primary mb-2">No destinations found</h3>
              <p className="text-primary/50">There are currently no destinations listed for this region.</p>
              <button 
                onClick={() => setActiveTab("All")}
                className="mt-6 px-6 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-xl transition-colors"
              >
                View All Regions
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredDestinations.map((destination, i) => {
                  const isFeatured = i < 3;
                  return (
                    <BentoTripCard
                      key={destination.slug}
                      name={destination.name}
                      slug={destination.slug}
                      tagline={destination.tagline}
                      img={destination.img}
                      tripsCount={destination.trips}
                      startingPrice={destination.from}
                      bestTime={destination.bestTime}
                      tags={destination.tags}
                      isFeatured={isFeatured}
                      flag={destination.flag}
                      visaStatus={destination.visaStatus}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}