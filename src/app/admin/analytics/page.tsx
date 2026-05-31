"use client";

import React from "react";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  MousePointer2, 
  BarChart3, 
  PieChart, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Analytics</h1>
        <p className="text-primary/60 mt-1">Deep dive into your traffic and conversion metrics.</p>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-primary text-lg">Visitor Traffic</h2>
            <select title="Select time range" aria-label="Time range" className="bg-primary/5 border-none rounded-xl px-4 py-2 text-sm font-bold text-primary/60 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full bg-primary/5 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/10">
             <div className="text-center">
                <BarChart3 className="w-12 h-12 text-primary/20 mx-auto mb-2" />
                <p className="text-primary/30 font-bold">Interactive Chart Rendering...</p>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-3d-sm border border-primary/5">
          <h2 className="font-bold text-primary text-lg mb-8">Traffic Sources</h2>
          <div className="space-y-6">
            <SourceItem label="Direct" percentage={45} color="bg-blue-500" />
            <SourceItem label="Social Media" percentage={30} color="bg-purple-500" />
            <SourceItem label="Search" percentage={15} color="bg-orange-500" />
            <SourceItem label="Referral" percentage={10} color="bg-green-500" />
          </div>
        </div>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Views" value="48.2k" growth="+12.5%" icon={Globe} />
        <MetricCard title="Bounce Rate" value="32.4%" growth="-2.1%" icon={MousePointer2} isNegative />
        <MetricCard title="Avg. Session" value="4m 12s" growth="+0.8%" icon={TrendingUp} />
      </div>
    </div>
  );
}

interface SourceItemProps { label: string; percentage: number; color: string; }
function SourceItem({ label, percentage, color }: SourceItemProps) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-primary/60 mb-2">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-700`}
          ref={(el) => { if (el) el.style.width = `${percentage}%`; }}
        />
      </div>
    </div>
  );
}

interface MetricCardProps { title: string; value: string; growth: string; icon: React.ComponentType<{ className?: string }>; isNegative?: boolean; }
function MetricCard({ title, value, growth, icon: Icon, isNegative }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/5 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold text-primary/40">{title}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold text-primary">{value}</div>
        <div className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
          isNegative ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
        }`}>
          {isNegative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          {growth}
        </div>
      </div>
    </div>
  );
}
