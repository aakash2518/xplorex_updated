"use client";

import React from "react";
import { Search, Plus, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function AdminDestinations() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Destinations</h1>
          <p className="text-primary/60 mt-1">Manage all regions and countries you offer.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all">
          <Plus className="w-5 h-5" />
          Add Destination
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
          <input 
            type="text" 
            placeholder="Search destinations..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-primary/5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all font-semibold"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-primary/5 font-bold text-primary/60 hover:text-primary transition-colors">
            <Filter className="w-5 h-5" />
            Region
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-primary/5 font-bold text-primary/60 hover:text-primary transition-colors">
            Status
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-3d-sm border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/5 bg-primary/5">
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Region</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Trips</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Starting Price</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {destinations.slice(0, 8).map((dest) => (
                <tr key={dest.slug} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={dest.img} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{dest.name}</div>
                        <div className="text-xs text-primary/40 font-semibold">{dest.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      dest.region === 'International' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {dest.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary/60">{dest.trips}</td>
                  <td className="px-6 py-4 font-bold text-accent">{dest.from}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-green-500 font-bold text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-primary/5 text-primary/40 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-primary/5 flex items-center justify-between bg-primary/5">
          <div className="text-sm font-semibold text-primary/40">Showing 8 of {destinations.length} destinations</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-xl bg-white border border-primary/5 font-bold text-sm text-primary/60 hover:text-primary transition-all disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 rounded-xl bg-white border border-primary/5 font-bold text-sm text-primary/60 hover:text-primary transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
