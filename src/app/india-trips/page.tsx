"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BentoTripCard from "@/components/ui/BentoTripCard";
import { getIndiaDestinations } from "@/data/destinations";
import { SlidersHorizontal, MapPin, IndianRupee, Clock } from "lucide-react";

const REGIONS = ["All", "Himalaya", "Beach", "Desert", "Northeast", "Heritage"];
const BUDGETS = ["All", "Under ₹20k", "₹20k - ₹30k", "₹30k+"];
const DURATIONS = ["All", "3-5 Days", "6-8 Days", "9+ Days"];

// Helper to parse price string to number for filtering (e.g. "₹22,000" -> 22000)
function parsePrice(priceStr: string) {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
}

export default function IndiaTripsPage() {
  const allDestinations = getIndiaDestinations();
  
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  const filteredDestinations = useMemo(() => {
    let filtered = allDestinations;

    // Filter by Region (tags)
    if (selectedRegion !== "All") {
      filtered = filtered.filter(d => d.tags?.includes(selectedRegion));
    }

    // Filter by Budget
    if (selectedBudget !== "All") {
      filtered = filtered.filter(d => {
        const price = parsePrice(d.from);
        if (selectedBudget === "Under ₹20k") return price < 20000;
        if (selectedBudget === "₹20k - ₹30k") return price >= 20000 && price <= 30000;
        if (selectedBudget === "₹30k+") return price > 30000;
        return true;
      });
    }

    // Filter by Duration (average or looking at packages)
    // To simplify since duration is at package level, we'll check if ANY package matches.
    if (selectedDuration !== "All") {
      filtered = filtered.filter(d => {
        return d.packages.some(p => {
          const daysMatch = p.duration.match(/\d+/);
          if (!daysMatch) return false;
          const days = parseInt(daysMatch[0], 10);
          if (selectedDuration === "3-5 Days") return days >= 3 && days <= 5;
          if (selectedDuration === "6-8 Days") return days >= 6 && days <= 8;
          if (selectedDuration === "9+ Days") return days >= 9;
          return true;
        });
      });
    }

    // Sort by trips (bookings) descending for the bento layout logic
    return [...filtered].sort((a, b) => b.trips - a.trips);
  }, [allDestinations, selectedRegion, selectedBudget, selectedDuration]);

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
              Incredible India
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-4 sm:mb-6">
              India <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 sm:px-0 max-w-3xl mx-auto">
              Explore the incredible diversity of India - from the snow-capped Himalayas to tropical beaches, 
              royal palaces to serene backwaters. Discover your perfect Indian adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-8 sticky top-20 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-xl border border-primary/10 p-4 rounded-2xl shadow-3d-md flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-bold w-full md:w-auto shrink-0 mr-4">
              <SlidersHorizontal className="w-5 h-5 text-accent" />
              <span>Filters:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row w-full gap-4">
              {/* Region Filter */}
              <div className="flex-1 bg-primary/5 rounded-xl px-3 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/50" />
                <select 
                  className="bg-transparent font-bold text-primary text-sm outline-none w-full cursor-pointer"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  {REGIONS.map(r => <option key={r} value={r}>{r === "All" ? "Region/Vibe" : r}</option>)}
                </select>
              </div>

              {/* Budget Filter */}
              <div className="flex-1 bg-primary/5 rounded-xl px-3 py-2 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-primary/50" />
                <select 
                  className="bg-transparent font-bold text-primary text-sm outline-none w-full cursor-pointer"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                >
                  {BUDGETS.map(b => <option key={b} value={b}>{b === "All" ? "Budget" : b}</option>)}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="flex-1 bg-primary/5 rounded-xl px-3 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary/50" />
                <select 
                  className="bg-transparent font-bold text-primary text-sm outline-none w-full cursor-pointer"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                >
                  {DURATIONS.map(d => <option key={d} value={d}>{d === "All" ? "Duration" : d}</option>)}
                </select>
              </div>
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
              <p className="text-primary/50">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSelectedRegion("All");
                  setSelectedBudget("All");
                  setSelectedDuration("All");
                }}
                className="mt-6 px-6 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <AnimatePresence>
                {filteredDestinations.map((destination, i) => {
                  // Top 3 destinations span 2 columns on md+ screens
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