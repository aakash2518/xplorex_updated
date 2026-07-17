/**
 * Xplorex Dynamic Data Store
 * Uses localStorage for persistence. All edits reflect on the public site.
 */

import { destinations as defaultDestinations, type Destination, type Trip } from "@/data/destinations";



// ─── Site Settings ────────────────────────────────────────────────────────────
export type SiteSettings = {
  companyName: string;
  phone: string;
  whatsapp: string;
  bio: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  companyName: "Xplorex Travels",
  phone: "8447706518",
  whatsapp: "8447706518",
  bio: "Managing the future of travel.",
};

// ─── Storage keys ─────────────────────────────────────────────────────────────
const KEYS = {
  destinations: "xplorex_destinations",
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



// ─── Settings ─────────────────────────────────────────────────────────────────
export function getSettings(): SiteSettings {
  const settings = read<SiteSettings>(KEYS.settings, DEFAULT_SETTINGS);
  // Fix cached placeholders
  if (settings.phone === "XXXXXXXXXX") settings.phone = "8447706518";
  if (settings.whatsapp === "XXXXXXXXXXXX") settings.whatsapp = "8447706518";
  return settings;
}

export function saveSettings(settings: SiteSettings): void {
  write(KEYS.settings, settings);
}

// ─── Reset (dev helper) ───────────────────────────────────────────────────────
export function resetAllData(): void {
  if (!isBrowser()) return;
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}
