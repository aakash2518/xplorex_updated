"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, Edit, Trash2, X, Save } from "lucide-react";
import { useDestinations } from "@/lib/useStore";
import { addDestination, updateDestination, deleteDestination } from "@/lib/store";
import { notifyStoreUpdate } from "@/lib/useStore";
import type { Destination } from "@/data/destinations";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY_DEST: Omit<Destination, "packages"> = {
  slug: "",
  name: "",
  tagline: "",
  trips: 0,
  from: "",
  img: "",
  intro: [""],
  region: "India",
  featured: false,
  visaInfo: "",
  bestTime: "",
  currency: "",
};

export default function AdminDestinations() {
  const destinations = useDestinations();
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<"All" | "India" | "International">("All");
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Destination | null>(null);
  const [form, setForm] = useState<Omit<Destination, "packages">>(EMPTY_DEST);

  const PER_PAGE = 8;

  const filtered = destinations.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.toLowerCase().includes(search.toLowerCase());
    const matchRegion = regionFilter === "All" || d.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_DEST);
    setShowModal(true);
  };

  const openEdit = (dest: Destination) => {
    setEditing(dest);
    const { packages: _p, ...rest } = dest;
    setForm(rest);
    setShowModal(true);
  };

  const handleDelete = (slug: string, name: string) => {
    if (confirm(`Delete "${name}"? This will also remove all its packages.`)) {
      deleteDestination(slug);
      notifyStoreUpdate();
    }
  };

  const handleToggleFeatured = (dest: Destination) => {
    updateDestination(dest.slug, { featured: !dest.featured });
    notifyStoreUpdate();
  };

  const handleSave = () => {
    if (!form.name || !form.slug) return alert("Name and slug are required.");
    if (editing) {
      updateDestination(editing.slug, form);
    } else {
      addDestination({ ...form, packages: [] });
    }
    notifyStoreUpdate();
    setShowModal(false);
  };

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-display">Destinations</h1>
          <p className="text-primary/60 mt-1">{destinations.length} destinations · manage regions and countries.</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-2xl font-bold shadow-press hover:translate-y-[-2px] transition-all"
        >
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
            aria-label="Search destinations"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-primary/5 bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all font-semibold"
          />
        </div>
        <div className="flex items-center gap-2">
          {(["All", "India", "International"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setRegionFilter(r); setPage(0); }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border font-bold text-sm transition-colors ${
                regionFilter === r
                  ? "bg-primary text-white border-primary"
                  : "bg-white border-primary/5 text-primary/60 hover:text-primary"
              }`}
            >
              <Filter className="w-4 h-4" />
              {r}
            </button>
          ))}
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
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Packages</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Starting Price</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-4 text-xs font-bold text-primary/40 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {paginated.map((dest) => (
                <tr key={dest.slug} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-primary">{dest.name}</div>
                        <div className="text-xs text-primary/40 font-semibold">{dest.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      dest.region === "International" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {dest.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-primary/60">{dest.packages.length}</td>
                  <td className="px-6 py-4 font-bold text-accent">{dest.from}</td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(dest)}
                      title={dest.featured ? "Remove from featured" : "Add to featured"}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        dest.featured
                          ? "bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-500"
                          : "bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600"
                      }`}
                    >
                      {dest.featured ? "✓ Featured" : "— Hidden"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        title="Edit destination"
                        onClick={() => openEdit(dest)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Delete destination"
                        onClick={() => handleDelete(dest.slug, dest.name)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-primary/5 flex items-center justify-between bg-primary/5">
          <div className="text-sm font-semibold text-primary/40">
            Showing {paginated.length} of {filtered.length} destinations
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-xl bg-white border border-primary/5 font-bold text-sm text-primary/60 hover:text-primary transition-all disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded-xl bg-white border border-primary/5 font-bold text-sm text-primary/60 hover:text-primary transition-all disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-primary/5">
              <h2 className="font-bold text-xl text-primary">
                {editing ? `Edit: ${editing.name}` : "Add New Destination"}
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
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name *" value={form.name} onChange={set("name")} placeholder="e.g. Bali" />
                <Field
                  label="Slug *"
                  value={form.slug}
                  onChange={set("slug")}
                  placeholder="e.g. bali"
                  disabled={!!editing}
                />
              </div>
              <Field label="Tagline" value={form.tagline} onChange={set("tagline")} placeholder="Island of Enchantment" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Starting Price" value={form.from} onChange={set("from")} placeholder="₹28,000" />
                <div className="space-y-1">
                  <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">Region *</label>
                  <select
                    title="Select region"
                    value={form.region}
                    onChange={set("region")}
                    className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="India">India</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>
              <ImageUpload
                label="Destination Image"
                value={form.img}
                onChange={(val) => setForm((p) => ({ ...p, img: val }))}
              />
              <Field
                label="Intro Text"
                value={form.intro[0]}
                onChange={(e) => setForm((p) => ({ ...p, intro: [e.target.value] }))}
                placeholder="Short description of this destination..."
              />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Best Time to Visit" value={form.bestTime || ""} onChange={set("bestTime")} placeholder="April to October" />
                <Field label="Visa Info" value={form.visaInfo || ""} onChange={set("visaInfo")} placeholder="Visa on Arrival" />
              </div>
              <Field label="Currency" value={form.currency || ""} onChange={set("currency")} placeholder="Indonesian Rupiah" />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured || false}
                  onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                  className="w-4 h-4 accent-primary"
                />
                <label htmlFor="featured" className="text-sm font-bold text-primary/60">
                  Show on homepage (Featured)
                </label>
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
                {editing ? "Save Changes" : "Add Destination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, disabled,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-primary/40 uppercase tracking-wider">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        className="w-full px-4 py-3 rounded-2xl border border-primary/10 bg-primary/5 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
      />
    </div>
  );
}
