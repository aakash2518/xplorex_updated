"use client";

import React from "react";
import { Search, Mail, Phone, Calendar, ArrowRight, CheckCircle2, XCircle, Clock } from "lucide-react";

const LEADS = [
  { id: 1, name: "XXXXXXXXX", email: "XXXXXX@example.com", phone: "XXXXXXXXXX", destination: "Bali", date: "2024-06-15", status: "New", message: "Looking for a luxury stay for 2 people." },
  { id: 2, name: "XXXXXXXXX", email: "XXXXXX@example.com", phone: "XXXXXXXXXX", destination: "Kashmir", date: "2024-05-20", status: "Pending", message: "Honeymoon package inquiry." },
  { id: 3, name: "XXXXXXXXX", email: "XXXXXX@example.com", phone: "XXXXXXXXXX", destination: "Switzerland", date: "2024-07-10", status: "Contacted", message: "Interested in group tour." },
  { id: 4, name: "XXXXXXXXX", email: "XXXXXX@example.com", phone: "XXXXXXXXXX", destination: "Dubai", date: "2024-08-05", status: "New", message: "Family trip for 4 adults, 2 kids." },
  { id: 5, name: "XXXXXXXXX", email: "XXXXXX@example.com", phone: "XXXXXXXXXX", destination: "Maldives", date: "2024-09-12", status: "Resolved", message: "Interested in overwater villas." },
];

export default function AdminLeads() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary font-display">Customer Leads</h1>
        <p className="text-primary/60 mt-1">Track and respond to inquiries from the website.</p>
      </div>

      {/* Grid of Leads */}
      <div className="grid gap-6">
        {LEADS.map((lead) => (
          <div 
            key={lead.id} 
            className="bg-white rounded-3xl p-6 shadow-3d-sm border border-primary/5 hover:border-accent/20 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 grid place-items-center font-bold text-primary text-xl flex-shrink-0">
                  {lead.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg text-primary">{lead.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      lead.status === 'New' ? 'bg-accent/10 text-accent' : 
                      lead.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
                      lead.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary/40">
                    <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                      <Mail className="w-4 h-4" />
                      {lead.email}
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                      <Phone className="w-4 h-4" />
                      {lead.phone}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {lead.date}
                    </div>
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

            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/5 italic text-sm text-primary/60">
              "{lead.message}"
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-primary/5 pt-4">
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-3d-sm">
                  <Mail className="w-4 h-4" />
                  Reply Email
                </button>
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-3d-sm">
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
              <div className="flex gap-2">
                 <button title="Mark as Resolved" className="p-2 rounded-xl hover:bg-green-50 text-green-600 transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                 </button>
                 <button title="Mark as Pending" className="p-2 rounded-xl hover:bg-orange-50 text-orange-600 transition-colors">
                    <Clock className="w-5 h-5" />
                 </button>
                 <button title="Delete" className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
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
