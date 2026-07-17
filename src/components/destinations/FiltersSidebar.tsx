"use client";

import React, { useCallback } from "react";
import { Plane } from "lucide-react";
import Link from "next/link";
import { vibrate } from "@/utils/helpers";

interface FiltersSidebarProps {
  destinationName: string;
  startingPrice: string;
}

export const FiltersSidebar = React.memo(function FiltersSidebar({
  destinationName,
  startingPrice,
}: FiltersSidebarProps) {
  const handleClearAll = useCallback(() => {
    vibrate(10);
  }, []);

  const handleTalkToExpert = useCallback(() => {
    vibrate([10, 30, 10]);
  }, []);

  return (
    <aside className="w-full lg:w-80 shrink-0 space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-3d border border-primary/5">
        <h3 className="font-display font-bold text-xl mb-6 flex items-center justify-between">
          Filter By
          <button
            type="button"
            onClick={handleClearAll}
            className="text-accent text-[10px] uppercase tracking-widest hover:underline focus:outline-none"
          >
            Clear all
          </button>
        </h3>

        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 ml-1">
              Categories
            </p>
            <div className="space-y-3">
              {["Group Tours", "Private Trips", "Luxury"].map((c) => (
                <label key={c} className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    aria-label={`Filter by ${c}`}
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-primary/10 group-hover:border-accent peer-checked:bg-accent peer-checked:border-accent transition-colors flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-primary/70 group-hover:text-accent transition-colors">
                    {c}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-primary/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 ml-1">
              Price Range
            </p>
            <div className="h-1.5 w-full bg-primary/5 rounded-full relative">
              <div className="absolute inset-x-0 h-full bg-accent rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent shadow-md cursor-pointer" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent shadow-md cursor-pointer" />
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-bold text-primary/40 tracking-widest">
              <span>{startingPrice}</span>
              <span>₹2,50,000+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-3d-lg relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-display font-bold text-xl mb-4">Need help planning?</h4>
          <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed">
            Our travel experts are here to craft your perfect {destinationName} trip.
          </p>
          <Link
            href="#quote-form"
            onClick={handleTalkToExpert}
            className="block w-full py-3 bg-accent hover:bg-accent/90 active:scale-[0.97] transition-all text-white font-bold rounded-2xl text-center shadow-lg"
          >
            Talk to Expert
          </Link>
        </div>
        <Plane className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12 pointer-events-none" />
      </div>
    </aside>
  );
});

export default FiltersSidebar;
