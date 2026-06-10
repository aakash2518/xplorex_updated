"use client";

import { usePathname } from "next/navigation";
import PlaneScene from "./PlaneScene";

export default function FlightController() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return <PlaneScene />;
}
