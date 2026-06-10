"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Sparkles, Search } from "lucide-react";
import { FORM_OPTIONS } from "@/constants/theme";
import { vibrate } from "@/utils/helpers";
import { toast } from "sonner";

export const HeroSearchBar = React.memo(function HeroSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("Bali");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("₹19k – ₹50k");

  const handleSearch = useCallback(() => {
    vibrate(15);
    const slug = destination.toLowerCase().replace(/\s+/g, "-");
    toast.success(`Searching packages for ${destination}...`);
    router.push(`/destinations/${slug}`);
  }, [destination, router]);

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-3d-lg p-2 border border-primary/5 max-w-4xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-2">
        {/* Destination Select */}
        <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
          <MapPin className="w-4 h-4 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-bold text-primary/40 uppercase tracking-tight">
              Destination
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent font-bold text-primary outline-none cursor-pointer text-sm w-full"
              aria-label="Select destination"
            >
              {FORM_OPTIONS.destinations.map((d) => (
                <option key={d} value={d} className="bg-white">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Input */}
        <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors lg:border-x lg:border-primary/5">
          <Calendar className="w-4 h-4 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-bold text-primary/40 uppercase tracking-tight">
              When
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent font-bold text-primary outline-none text-sm w-full cursor-pointer"
              aria-label="Travel date"
            />
          </div>
        </div>

        {/* Budget Select */}
        <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-bold text-primary/40 uppercase tracking-tight">
              Budget
            </div>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-transparent font-bold text-primary outline-none cursor-pointer text-sm w-full"
              aria-label="Budget range"
            >
              {FORM_OPTIONS.budgets.map((b) => (
                <option key={b} value={b} className="bg-white">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <button
          type="button"
          onClick={handleSearch}
          className="bg-primary active:scale-[0.96] text-white rounded-xl px-5 py-3 font-bold flex items-center justify-center gap-2 shadow-press hover:bg-primary/95 transition-all col-span-1 sm:col-span-2 lg:col-span-1 text-sm touch-target"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  );
});

export default HeroSearchBar;
