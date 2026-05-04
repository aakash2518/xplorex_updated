"use client";

import React from "react";
import { 
  Users, 
  MapPin, 
  Plane, 
  TrendingUp,
  MessageSquare,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Dashboard Overview</h1>
        <p className="text-primary/60 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Destinations" value="24" trend="+3" icon={MapPin} color="bg-blue-500" />
        <StatCard label="Active Packages" value="142" trend="+12" icon={Plane} color="bg-purple-500" />
        <StatCard label="New Leads" value="18" trend="+5" icon={Users} color="bg-orange-500" />
        <StatCard label="Revenue" value="₹12.4L" trend="+18%" icon={TrendingUp} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              Recent Inquiries
            </h2>
            <button className="text-sm font-bold text-accent hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <LeadItem name="Aakash Sharma" destination="Bali" status="New" time="2 mins ago" />
            <LeadItem name="Priya Patel" destination="Kashmir" status="Pending" time="15 mins ago" />
            <LeadItem name="Rahul Verma" destination="Switzerland" status="Contacted" time="1 hour ago" />
            <LeadItem name="Sanya Malhotra" destination="Dubai" status="New" time="3 hours ago" />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Activity Feed
            </h2>
          </div>
          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            <ActivityItem icon={CheckCircle2} text="New package added to Bali" time="Just now" color="text-green-500" />
            <ActivityItem icon={Plane} text="Flight path updated globally" time="10 mins ago" color="text-blue-500" />
            <ActivityItem icon={Users} text="User 'admin' logged in" time="1 hour ago" color="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-3d-sm border border-primary/5 group hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-white shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{trend}</span>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-primary font-display">{value}</div>
        <div className="text-sm font-semibold text-primary/40 mt-1">{label}</div>
      </div>
    </div>
  );
}

function LeadItem({ name, destination, status, time }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/5 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center font-bold text-primary text-sm uppercase">
          {name[0]}
        </div>
        <div>
          <div className="font-bold text-primary text-sm">{name}</div>
          <div className="text-xs text-primary/40 font-semibold italic">Interested in {destination}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
          status === 'New' ? 'bg-accent/10 text-accent' : status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
        }`}>
          {status}
        </div>
        <div className="text-[10px] text-primary/30 font-bold">{time}</div>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, text, time, color }: any) {
  return (
    <div className="flex items-start gap-4 relative z-10">
      <div className={`p-1.5 rounded-full bg-white border-2 border-slate-50 ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div>
        <div className="text-sm font-bold text-primary leading-tight">{text}</div>
        <div className="text-xs text-primary/40 font-semibold mt-1">{time}</div>
      </div>
    </div>
  );
}
