"use client";

import React from "react";
import { Clock, MapPin, Sparkles, Plane } from "lucide-react";

interface QuickInfoBarProps {
  bestTime?: string;
  visaInfo?: string;
  currency?: string;
}

export const QuickInfoBar = React.memo(function QuickInfoBar({
  bestTime,
  visaInfo,
  currency,
}: QuickInfoBarProps) {
  const items = [
    { label: "Best Time", value: bestTime || "Year round", icon: Clock },
    { label: "Visa Info", value: visaInfo || "Standard Visa", icon: MapPin },
    { label: "Currency", value: currency || "Local Currency", icon: Sparkles },
    { label: "Activities", value: "Adventure, Culture", icon: Plane },
  ];

  return (
    <section className="bg-white border-y border-primary/5 py-8 relative z-20 shadow-sm">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default QuickInfoBar;
