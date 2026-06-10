"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TripCard from "@/components/ui/TripCard";
import dynamic from "next/dynamic";
import { destinations } from "@/data/destinations";

const DestinationSlider = dynamic(() => import("./DestinationSlider"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full bg-black flex items-center justify-center text-white/40">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
        <p>Loading Destinations...</p>
      </div>
    </div>
  ),
});

const Destinations = () => {
  return (
    <section id="destinations" className="h-screen w-full relative bg-black overflow-hidden">
      <DestinationSlider destinations={destinations} />
    </section>
  );
};

export default Destinations;
