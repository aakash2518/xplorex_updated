"use client";

import React from "react";
import Link from "next/link";
import { Users, MapPin, Plane, TrendingUp, MessageSquare, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { useDestinations, useLeads } from "@/lib/useStore";

export default function AdminDashboard() {
  const destinations = useDestinations();
  const leads = useLeads();

  const totalPackages = destinations.reduce((sum, d) => sum + d.packages.length, 0);
  const newLeads = leads.filter((l) => l.status === "New").length;
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Dashboard Overview</h1>
        <p className="text-primary/60 mt-1">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Destinations" value={String(destinations.length)} trend={`${destinations.filter(d => d.featured).length} featured`} icon={MapPin} color="bg-blue-500" />
        <StatCard label="Active Packages" value={String(totalPackages)} trend={`across ${destinations.length} destinations`} icon={Plane} color="bg-purple-500" />
        <StatCard label="New Leads" value={String(newLeads)} trend={`${leads.length} total`} icon={Users} color="bg-orange-500" />
        <StatCard label="India Destinations" value={String(destinations.filter(d => d.region === "India").length)} trend={`${destinations.filter(d => d.region === "International").length} international`} icon={TrendingUp} color="bg-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads */}
        <div className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              Recent Inquiries
            </h2>
            <Link href="/admin/leads" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div className="text-center py-8 text-primary/30 font-semibold text-sm">
              No leads yet. They&apos;ll appear here when visitors fill the popup form.
            </div>
          ) : (
            <div className="space-y-2">
              {recentLeads.map((lead) => (
                <LeadItem
                  key={lead.id}
                  name={lead.name}
                  destination={lead.destination}
                  status={lead.status}
                  time={timeAgo(lead.createdAt)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Lead Status Breakdown
            </h2>
          </div>
          <div className="space-y-4">
            {(["New", "Pending", "Contacted", "Resolved"] as const).map((status) => {
              const count = leads.filter((l) => l.status === status).length;
              const pct = leads.length ? Math.round((count / leads.length) * 100) : 0;
              const colors: Record<string, string> = {
                New: "bg-accent",
                Pending: "bg-orange-400",
                Contacted: "bg-blue-400",
                Resolved: "bg-green-400",
              };
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm font-bold text-primary/60 mb-1.5">
                    <span>{status}</span>
                    <span>{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[status]} transition-all duration-700`}
                      data-pct={pct}
                      ref={(el) => { if (el) el.style.width = `${pct}%`; }}
                    />
                  </div>
                </div>
              );
            })}
            {leads.length === 0 && (
              <p className="text-center text-primary/30 font-semibold text-sm py-4">No leads yet.</p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-primary/5 grid grid-cols-2 gap-4">
            <Link
              href="/admin/destinations"
              className="p-4 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors text-center group"
            >
              <div className="text-2xl font-bold text-primary">{destinations.length}</div>
              <div className="text-xs font-bold text-primary/40 mt-1">Destinations</div>
            </Link>
            <Link
              href="/admin/trips"
              className="p-4 rounded-2xl bg-accent/5 hover:bg-accent/10 transition-colors text-center group"
            >
              <div className="text-2xl font-bold text-accent">{totalPackages}</div>
              <div className="text-xs font-bold text-primary/40 mt-1">Packages</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

function StatCard({ label, value, trend, icon: Icon, color }: {
  label: string; value: string; trend: string; icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-3d-sm border border-primary/5 group hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
        </div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold text-primary font-display">{value}</div>
        <div className="text-sm font-semibold text-primary/40 mt-1">{label}</div>
        <div className="text-xs font-semibold text-primary/30 mt-0.5">{trend}</div>
      </div>
    </div>
  );
}

function LeadItem({ name, destination, status, time }: {
  name: string; destination: string; status: string; time: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-primary/5 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/10 grid place-items-center font-bold text-primary text-sm uppercase flex-shrink-0">
          {name[0]}
        </div>
        <div>
          <div className="font-bold text-primary text-sm">{name}</div>
          <div className="text-xs text-primary/40 font-semibold">Interested in {destination}</div>
        </div>
      </div>
      <div className="text-right">
        <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 ${
          status === "New" ? "bg-accent/10 text-accent" :
          status === "Pending" ? "bg-orange-100 text-orange-600" :
          status === "Contacted" ? "bg-blue-100 text-blue-600" :
          "bg-green-100 text-green-600"
        }`}>
          {status}
        </div>
        <div className="text-[10px] text-primary/30 font-bold">{time}</div>
      </div>
    </div>
  );
}
