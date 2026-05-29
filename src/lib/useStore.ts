/**
 * React hook that reads from the store and re-renders when localStorage changes.
 * Works across tabs and within the same tab via a custom "xplorex-store-update" event.
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDestinations,
  getLeads,
  getSettings,
  type Lead,
  type SiteSettings,
} from "./store";
import type { Destination } from "@/data/destinations";

export const STORE_EVENT = "xplorex-store-update";

/** Dispatch this after any write to trigger re-renders across the app. */
export function notifyStoreUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

export function useDestinations() {
  const [data, setData] = useState<Destination[]>([]);
  const refresh = useCallback(() => setData(getDestinations()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return data;
}

export function useLeads() {
  const [data, setData] = useState<Lead[]>([]);
  const refresh = useCallback(() => setData(getLeads()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return data;
}

export function useSettings() {
  const [data, setData] = useState<SiteSettings | null>(null);
  const refresh = useCallback(() => setData(getSettings()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(STORE_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(STORE_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return data;
}
