"use client";

import { usePathname } from "next/navigation";
import PlaneScene from "./PlaneScene";

export default function FlightController() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;

  return <PlaneScene />;
}
