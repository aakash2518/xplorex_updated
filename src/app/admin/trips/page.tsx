"use client";

import React from "react";
import { Search, Plus, Filter, Tag, Clock, MapPin, Edit, Trash2 } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function AdminTrips() {
  const allTrips = destinations.flatMap(d => d.packages.map(p => ({ ...p, destName: d.name })));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Trip Packages</h1>
          <p className="text-primary/60 mt-1">Manage individual itineraries and pricing.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all">
          <Plus className="w-5 h-5" />
          Create Trip
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
            <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Total Trips</div>
            <div className="text-3xl font-bold text-primary">{allTrips.length}</div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
            <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Avg. Duration</div>
            <div className="text-3xl font-bold text-primary">6.4 Days</div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
            <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Top Category</div>
            <div className="text-3xl font-bold text-primary">Group Tours</div>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {allTrips.map((trip, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-primary/5 shadow-3d-sm hover:shadow-3d transition-all flex flex-col md:flex-row gap-5 group">
            <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 relative">
              <img src={trip.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                {trip.type}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-primary group-hover:text-accent transition-colors">{trip.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-primary/40 font-semibold mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {trip.destName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">{trip.price}</div>
                    <div className="text-[10px] font-bold text-primary/30 uppercase tracking-tighter">Per Person</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-primary/5 text-primary/60 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {trip.duration}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-accent/5 text-accent text-xs font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    {trip.category}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-primary/5 flex items-center justify-between">
                 <div className="flex gap-1">
                   <button className="p-2 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors">
                      <Edit className="w-4 h-4" />
                   </button>
                   <button className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
                 <button className="text-xs font-bold text-primary/40 hover:text-primary transition-colors flex items-center gap-1">
                    Manage Schedule
                    <ArrowRight className="w-3 h-3" />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowRight(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
