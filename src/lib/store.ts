/**
 * Xplorex Dynamic Data Store
 * Uses localStorage for persistence. All admin edits reflect on the public site.
 */

import { destinations as defaultDestinations, type Destination, type Trip } from "@/data/destinations";

// ─── Lead type ────────────────────────────────────────────────────────────────
export type Lead = {
  id: string;
  name: string;
  phone: string;
  destination: string;
  month?: string;
  travelers?: string;
  email?: string;
  message?: string;
  status: "New" | "Pending" | "Contacted" | "Resolved";
  createdAt: string; // ISO string
};

// ─── Site Settings ────────────────────────────────────────────────────────────
export type SiteSettings = {
  companyName: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  whatsapp: string;
  bio: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "Xplorex Travels",
  adminName: "XXXXXXXXXX",
  adminEmail: "XXXXXXXXXX@XXXXXXXXXX.com",
  phone: "XXXXXXXXXX",
  whatsapp: "XXXXXXXXXXXX",
  bio: "Managing the future of travel.",
};

// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEYS = {
  destinations: "xplorex_destinations",
  leads: "xplorex_leads",
  settings: "xplorex_settings",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Destinations ─────────────────────────────────────────────────────────────
export function getDestinations(): Destination[] {
  return read<Destination[]>(KEYS.destinations, defaultDestinations);
}

export function saveDestinations(data: Destination[]): void {
  write(KEYS.destinations, data);
}

export function addDestination(dest: Destination): void {
  const all = getDestinations();
  write(KEYS.destinations, [...all, dest]);
}

export function updateDestination(slug: string, updates: Partial<Destination>): void {
  const all = getDestinations();
  write(
    KEYS.destinations,
    all.map((d) => (d.slug === slug ? { ...d, ...updates } : d))
  );
}

export function deleteDestination(slug: string): void {
  const all = getDestinations();
  write(
    KEYS.destinations,
    all.filter((d) => d.slug !== slug)
  );
}

// ─── Trips (packages inside destinations) ────────────────────────────────────
export type FlatTrip = Trip & { destSlug: string; destName: string };

export function getAllTrips(): FlatTrip[] {
  return getDestinations().flatMap((d) =>
    d.packages.map((p) => ({ ...p, destSlug: d.slug, destName: d.name }))
  );
}

export function addTripToDestination(destSlug: string, trip: Trip): void {
  const all = getDestinations();
  write(
    KEYS.destinations,
    all.map((d) =>
      d.slug === destSlug ? { ...d, packages: [...d.packages, trip] } : d
    )
  );
}

export function updateTrip(destSlug: string, tripTitle: string, updates: Partial<Trip>): void {
  const all = getDestinations();
  write(
    KEYS.destinations,
    all.map((d) =>
      d.slug === destSlug
        ? {
            ...d,
            packages: d.packages.map((p) =>
              p.title === tripTitle ? { ...p, ...updates } : p
            ),
          }
        : d
    )
  );
}

export function deleteTrip(destSlug: string, tripTitle: string): void {
  const all = getDestinations();
  write(
    KEYS.destinations,
    all.map((d) =>
      d.slug === destSlug
        ? { ...d, packages: d.packages.filter((p) => p.title !== tripTitle) }
        : d
    )
  );
}

// ─── Leads ────────────────────────────────────────────────────────────────────
export function getLeads(): Lead[] {
  return read<Lead[]>(KEYS.leads, []);
}

export function addLead(lead: Omit<Lead, "id" | "createdAt" | "status">): Lead {
  const all = getLeads();
  const newLead: Lead = {
    ...lead,
    id: Date.now().toString(),
    status: "New",
    createdAt: new Date().toISOString(),
  };
  write(KEYS.leads, [newLead, ...all]);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]): void {
  const all = getLeads();
  write(
    KEYS.leads,
    all.map((l) => (l.id === id ? { ...l, status } : l))
  );
}

export function deleteLead(id: string): void {
  const all = getLeads();
  write(
    KEYS.leads,
    all.filter((l) => l.id !== id)
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export function getSettings(): SiteSettings {
  return read<SiteSettings>(KEYS.settings, DEFAULT_SETTINGS);
}

export function saveSettings(settings: SiteSettings): void {
  write(KEYS.settings, settings);
}

// ─── Reset (dev helper) ───────────────────────────────────────────────────────
export function resetAllData(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
