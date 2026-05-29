"use client";

import dynamic from "next/dynamic";

const LeadPopup = dynamic(() => import("@/components/LeadPopup"), { ssr: false });
const FloatingButtons = dynamic(() => import("@/components/FloatingButtons"), { ssr: false });
const FlightController = dynamic(() => import("@/components/3d/FlightController"), { ssr: false });

export default function ClientDynamics() {
  return (
    <>
      <FlightController />
      <LeadPopup />
      <FloatingButtons />
    </>
  );
}
