"use client";

import dynamic from "next/dynamic";

const LeadPopup = dynamic(() => import("@/components/LeadPopup"), { 
  ssr: false, 
  loading: () => null 
});
const FloatingButtons = dynamic(() => import("@/components/FloatingButtons"), { 
  ssr: false,
  loading: () => null 
});
const FlightController = dynamic(() => import("@/components/3d/FlightController"), { 
  ssr: false,
  loading: () => null 
});

export default function ClientDynamics() {
  return (
    <>
      <FlightController />
      <LeadPopup />
      <FloatingButtons />
    </>
  );
}
