"use client";

import React, { useState } from "react";
import { Search, Mail, Phone, Calendar, ArrowRight, CheckCircle2, XCircle, Clock, Inbox } from "lucide-react";
import { useLeads } from "@/lib/useStore";
import { updateLeadStatus, deleteLead } from "@/lib/store";
import { notifyStoreUpdate } from "@/lib/useStore";
import type { Lead } from "@/lib/store";

const STATUS_STYLES: Record<Lead["status"], string> = {
  New: "bg-accent/10 text-accent",
  Pending: "bg-orange-100 text-orange-600",
  Contacted: "bg-blue-100 text-blue-600",
  Resolved: "bg-green-100 text-green-600",
};

export default function AdminLeads() {
  const leads = useLeads();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Lead["status"] | "All">("All");

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchFilter = filter === "All" || l.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatus = (id: string, status: Lead["status"]) => {
    updateLeadStatus(id, status);
    notifyStoreUpdate();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this lead?")) {
      deleteLead(id);
      notifyStoreUpdate();
    }
  };

  const handleWhatsApp = (lead: Lead) => {
    const msg = [
      `Hi ${lead.name}! 👋`,
      ``,
      `This is Xplorex Travel. We received your inquiry for *${lead.destination}*.`,
      `We'd love to help you plan your perfect trip!`,
      ``,
      `Could you share more details about your travel dates and preferences?`,
    ].join("\n");
    window.open(`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const counts = {
    All: leads.length,
    New: leads.filter((l) => l.status === "New").length,
    Pending: leads.filter((l) => l.status === "Pending").length,
    Contacted: leads.filter((l) => l.status === "Contacted").length,
    Resolved: leads.filter((l) => l.status === "Resolved").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Customer Leads</h1>
          <p className="text-primary/60 mt-1">
            {leads.length} total inquiries from the website.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", "New", "Pending", "Contacted", "Resolved"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === s
                  ? "bg-primary text-white shadow-3d-sm"
                  : "bg-white border border-primary/10 text-primary/60 hover:text-primary"
              }`}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
        <input
          type="text"
          placeholder="Search by name, destination or phone..."
          aria-label="Search leads"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-primary/5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all font-semibold"
        />
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-16 text-center border border-primary/5 shadow-3d-sm">
          <Inbox className="w-12 h-12 text-primary/20 mx-auto mb-4" />
          <h3 className="font-bold text-primary text-lg mb-2">No leads yet</h3>
          <p className="text-primary/40 font-semibold text-sm">
            Leads will appear here when visitors fill the popup form on the website.
          </p>
        </div>
      )}

      {/* Lead cards */}
      <div className="grid gap-6">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5 hover:border-accent/20 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 grid place-items-center font-bold text-primary text-xl flex-shrink-0">
                  {lead.name[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-primary">{lead.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_STYLES[lead.status]}`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary/40">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      {lead.phone}
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </div>
                    {lead.month && (
                      <div className="flex items-center gap-1.5">
                        ✈️ Travel: {lead.month}
                      </div>
                    )}
                    {lead.travelers && (
                      <div className="flex items-center gap-1.5">
                        👥 {lead.travelers}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:text-right flex flex-col items-start lg:items-end gap-2">
                <div className="text-xs font-bold text-primary/30 uppercase tracking-widest">Interested in</div>
                <div className="text-xl font-bold text-primary flex items-center gap-2">
                  {lead.destination}
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>

            {lead.message && (
              <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/5 italic text-sm text-primary/60">
                &ldquo;{lead.message}&rdquo;
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-primary/5 pt-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleWhatsApp(lead)}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-3d-sm"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </button>
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}?subject=Your trip inquiry – Xplorex`}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-3d-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  title="Mark as Contacted"
                  onClick={() => handleStatus(lead.id, "Contacted")}
                  className="p-2 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  title="Mark as Pending"
                  onClick={() => handleStatus(lead.id, "Pending")}
                  className="p-2 rounded-xl hover:bg-orange-50 text-orange-500 transition-colors"
                >
                  <Clock className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  title="Mark as Resolved"
                  onClick={() => handleStatus(lead.id, "Resolved")}
                  className="p-2 rounded-xl hover:bg-green-50 text-green-600 transition-colors"
                >
                  ✓
                </button>
                <button
                  type="button"
                  title="Delete lead"
                  onClick={() => handleDelete(lead.id)}
                  className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
