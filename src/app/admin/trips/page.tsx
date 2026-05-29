"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Tag, Clock, MapPin, Edit, Trash2, X, Save } from "lucide-react";
import { useDestinations } from "@/lib/useStore";
import { addTripToDestination, updateTrip, deleteTrip } from "@/lib/store";
import { notifyStoreUpdate } from "@/lib/useStore";
import type { Trip } from "@/data/destinations";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORIES = ["Group", "Private", "Honeymoon", "Adventure", "Luxury"];
const TYPES = ["Regular", "Budget", "Premium", "Luxury"];

const EMPTY_TRIP: Trip = {
  title: "",
  duration: "",
  price: "",
  description: "",
  img: "",
  category: "Group",
  type: "Regular",
};

export default function AdminTrips() {
  const destinations = useDestinations();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState<{ destSlug: string; title: string } | null>(null);
  const [form, setForm] = useState<Trip>(EMPTY_TRIP);
  const [destSlug, setDestSlug] = useState("");

  const allTrips = useMemo(
    () =>
      destinations.flatMap((d) =>
        d.packages.map((p) => ({ ...p, destSlug: d.slug, destName: d.name }))
      ),
    [destinations]
  );

  const filtered = allTrips.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destName.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || t.category === catFilter;
    return matchSearch && matchCat;
  });

  const avgDays = useMemo(() => {
    const nums = allTrips.map((t) => parseInt(t.duration) || 0).filter(Boolean);
    return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1) : "—";
  }, [allTrips]);

  const topCat = useMemo(() => {
    const counts: Record<string, number> = {};
    allTrips.forEach((t) => { if (t.category) counts[t.category] = (counts[t.category] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  }, [allTrips]);

  const openAdd = () => {
    setEditingTrip(null);
    setForm(EMPTY_TRIP);
    setDestSlug(destinations[0]?.slug || "");
    setShowModal(true);
  };

  const openEdit = (trip: typeof filtered[0]) => {
    setEditingTrip({ destSlug: trip.destSlug, title: trip.title });
    const { destSlug: ds, destName: _dn, ...rest } = trip;
    setForm(rest);
    setDestSlug(ds);
    setShowModal(true);
  };

  const handleDelete = (destSlug: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      deleteTrip(destSlug, title);
      notifyStoreUpdate();
    }
  };

  const handleSave = () => {
    if (!form.title || !destSlug) return alert("Title and destination are required.");
    if (editingTrip) {
      updateTrip(editingTrip.destSlug, editingTrip.title, form);
    } else {
      addTripToDestination(destSlug, form);
    }
    notifyStoreUpdate();
    setShowModal(false);
  };

  const set = (key: keyof Trip) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Trip Packages</h1>
          <p className="text-primary/60 mt-1">Manage individual itineraries and pricing.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Trip
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
          <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Total Trips</div>
          <div className="text-3xl font-bold text-primary">{allTrips.length}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
          <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Avg. Duration</div>
          <div className="text-3xl font-bold text-primary">{avgDays} Days</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-primary/5 shadow-3d-sm">
          <div className="text-xs font-bold text-primary/40 uppercase tracking-widest mb-1">Top Category</div>
          <div className="text-3xl font-bold text-primary">{topCat}</div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/30" />
          <input
            type="text"
            placeholder="Search trips or destinations..."
            aria-label="Search trips"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-primary/5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all font-semibold"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCatFilter(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                catFilter === c
                  ? "bg-primary text-white shadow-3d-sm"
                  : "bg-white border border-primary/10 text-primary/60 hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((trip, i) => (
          <div
            key={`${trip.destSlug}-${trip.title}-${i}`}
            className="bg-white rounded-3xl p-5 border border-primary/5 shadow-3d-sm hover:shadow-3d transition-all flex flex-col md:flex-row gap-5 group"
          >
            <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 relative">
              {trip.img ? (
                <img src={trip.img} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/30 text-xs font-bold">No Image</div>
              )}
              {trip.type && (
                <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                  {trip.type}
                </div>
              )}
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
                  {trip.category && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-accent/5 text-accent text-xs font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      {trip.category}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-primary/5 flex items-center justify-between">
                <div className="flex gap-1">
                  <button
                    type="button"
                    title="Edit trip"
                    onClick={() => openEdit(trip)}
                    className="p-2 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Delete trip"
                    onClick={() => handleDelete(trip.destSlug, trip.title)}
                    className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs font-bold text-primary/30 flex items-center gap-1">
                  {trip.description?.slice(0, 40)}{trip.description?.length > 40 ? "…" : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-16 text-center border border-primary/5">
          <p className="text-primary/40 font-bold">No trips match your search.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-primary/5">
              <h2 className="font-bold text-xl text-primary">
                {editingTrip ? "Edit Trip" : "Create New Trip"}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
                className="p-2 rounded-xl hover:bg-primary/5 text-primary/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Destination selector */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">Destination *</label>
                <select
                  title="Select destination"
                  value={destSlug}
                  onChange={(e) => setDestSlug(e.target.value)}
                  disabled={!!editingTrip}
                  className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
                >
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </div>

              <TField label="Title *" value={form.title} onChange={set("title")} placeholder="Best of Bali Group Tour" />
              <div className="grid grid-cols-2 gap-4">
                <TField label="Duration" value={form.duration} onChange={set("duration")} placeholder="9 Days" />
                <TField label="Price" value={form.price} onChange={set("price")} placeholder="₹65,000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">Category</label>
                  <select
                    title="Select category"
                    value={form.category || ""}
                    onChange={set("category")}
                    className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">Type</label>
                  <select
                    title="Select type"
                    value={form.type || ""}
                    onChange={set("type")}
                    className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <ImageUpload
                label="Trip Image"
                value={form.img || ""}
                onChange={(val) => setForm((p) => ({ ...p, img: val }))}
              />
              <div className="space-y-1">
                <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">Description</label>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Short description of the trip..."
                  aria-label="Description"
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-primary/5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-2xl border border-primary/10 font-bold text-primary/60 hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all"
              >
                <Save className="w-4 h-4" />
                {editingTrip ? "Save Changes" : "Create Trip"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TField({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label}
        className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
