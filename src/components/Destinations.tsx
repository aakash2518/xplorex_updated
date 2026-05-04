"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TripCard from "@/components/ui/TripCard";
import DestinationSlider from "./DestinationSlider";
import { destinations } from "@/data/destinations";

const Destinations = () => {
  return (
    <section id="destinations" className="h-screen w-full relative bg-black overflow-hidden">
      <DestinationSlider destinations={destinations} />
    </section>
  );
};

export default Destinations;
