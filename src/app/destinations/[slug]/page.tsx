"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Plane } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageListItem from "@/components/ui/PackageListItem";
import { getDestination, destinations } from "@/data/destinations";
import QuickInfoBar from "@/components/destinations/QuickInfoBar";
import FiltersSidebar from "@/components/destinations/FiltersSidebar";
import QuotationForm from "@/components/destinations/QuotationForm";
import OtherDestinations from "@/components/destinations/OtherDestinations";

export default function DestinationDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const dest = getDestination(slug);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [slug]);

  if (!dest) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  const others = destinations.filter((d) => d.slug !== dest.slug).slice(0, 4);

  return (
    <main className="overflow-x-hidden bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={dest.img}
          alt={`${dest.name} travel`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />

        <motion.div
          animate={{ x: ["-10%", "110%"], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 left-0 text-white/30 pointer-events-none"
        >
          <Plane className="w-16 h-16 -rotate-12" />
        </motion.div>

        <div className="container relative h-full flex flex-col justify-end pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-accent mb-6 text-sm font-bold drop-shadow-lg transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-white/90 mb-4 uppercase tracking-[0.2em] font-bold drop-shadow-md">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <Link href="/destinations" className="hover:text-accent">
              Destinations
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-accent">{dest.name}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold leading-none text-white drop-shadow-2xl mb-2"
          >
            {dest.name}
          </motion.h1>
          <p className="font-script text-2xl sm:text-4xl text-accent drop-shadow-lg mb-6">
            {dest.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-6 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 text-[11px] text-white font-bold uppercase tracking-widest shadow-3d-sm">
              <span className="opacity-60 mr-2">Duration</span>
              {dest.trips} {dest.trips === 1 ? "Trip" : "Trips"} Available
            </div>
            <div className="px-6 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/30 text-[11px] text-white font-bold uppercase tracking-widest shadow-3d-sm">
              <span className="opacity-60 mr-2">Investment</span>
              Starting {dest.from}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <QuickInfoBar
        bestTime={dest.bestTime}
        visaInfo={dest.visaInfo}
        currency={dest.currency}
      />

      {/* Packages Section with Sidebar */}
      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Filters Sidebar */}
            <FiltersSidebar destinationName={dest.name} startingPrice={dest.from} />

            {/* Right: Packages List */}
            <div className="flex-1">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                    {dest.name} Itineraries
                  </h2>
                  <p className="text-sm text-primary/40 font-bold tracking-wide mt-1">
                    Showing all {dest.packages.length} available packages
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {dest.packages.map((p, i) => (
                  <PackageListItem
                    key={p.title}
                    title={p.title}
                    duration={p.duration}
                    price={p.price}
                    description={p.description}
                    img={p.img || dest.img}
                    destination={dest.name}
                    slug={dest.slug}
                    category={p.category}
                    type={p.type}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotation Form */}
      <QuotationForm destinationName={dest.name} />

      {/* Other destinations */}
      <OtherDestinations others={others} />

      <Footer />
    </main>
  );
}
