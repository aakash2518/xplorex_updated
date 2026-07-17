"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Clock, MapPin, Users, ArrowUpRight, Calendar,
  TrendingDown, AlertTriangle, CheckCircle2, Armchair
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGroupTours } from "@/data/destinations";

// ─── Batch Data ────────────────────────────────────────────────────────────────
const BATCHES = [
  {
    id: 1,
    destination: "Kashmir",
    slug: "kashmir",
    img: "/assets/dest-kashmir.jpg",
    departure: "Aug 5, 2025",
    returnDate: "Aug 11, 2025",
    duration: "7D / 6N",
    seatsTotal: 16,
    seatsLeft: 3,
    priceGroup: 25000,
    priceSolo: 38000,
    groupSize: "9-15",
    tag: "⭐ Bestseller",
  },
  {
    id: 2,
    destination: "Ladakh",
    slug: "ladakh",
    img: "/assets/dest-ladakh.png",
    departure: "Aug 12, 2025",
    returnDate: "Aug 18, 2025",
    duration: "7D / 6N",
    seatsTotal: 12,
    seatsLeft: 7,
    priceGroup: 28000,
    priceSolo: 42000,
    groupSize: "5-8",
    tag: "🏔️ Adventure",
  },
  {
    id: 3,
    destination: "Meghalaya",
    slug: "meghalaya",
    img: "/assets/dest-meghalaya.png",
    departure: "Aug 20, 2025",
    returnDate: "Aug 25, 2025",
    duration: "6D / 5N",
    seatsTotal: 20,
    seatsLeft: 12,
    priceGroup: 22000,
    priceSolo: 33000,
    groupSize: "16+",
    tag: "🌿 Nature",
  },
  {
    id: 4,
    destination: "Spiti",
    slug: "spiti",
    img: "/assets/dest-spiti.png",
    departure: "Sep 1, 2025",
    returnDate: "Sep 9, 2025",
    duration: "9D / 8N",
    seatsTotal: 10,
    seatsLeft: 4,
    priceGroup: 26000,
    priceSolo: 40000,
    groupSize: "5-8",
    tag: "🏕️ Offbeat",
  },
  {
    id: 5,
    destination: "Rajasthan",
    slug: "rajasthan",
    img: "/assets/dest-rajasthan.png",
    departure: "Oct 5, 2025",
    returnDate: "Oct 12, 2025",
    duration: "8D / 7N",
    seatsTotal: 24,
    seatsLeft: 15,
    priceGroup: 20000,
    priceSolo: 31000,
    groupSize: "16+",
    tag: "🏰 Heritage",
  },
  {
    id: 6,
    destination: "Uttarakhand",
    slug: "uttarakhand",
    img: "/assets/dest-uttarakhand.jpg",
    departure: "Oct 18, 2025",
    returnDate: "Oct 22, 2025",
    duration: "5D / 4N",
    seatsTotal: 14,
    seatsLeft: 2,
    priceGroup: 15000,
    priceSolo: 24000,
    groupSize: "9-15",
    tag: "🕉️ Spiritual",
  },
];

const GROUP_SIZES = [
  { label: "All Batches", value: "all", icon: "👥", desc: "" },
  { label: "5-8 People", value: "5-8", icon: "🧑‍🤝‍🧑", desc: "Intimate group" },
  { label: "9-15 People", value: "9-15", icon: "👨‍👩‍👧‍👦", desc: "Classic group" },
  { label: "16+ People", value: "16+", icon: "🎪", desc: "Large group" },
];

// ─── Seat Indicator ───────────────────────────────────────────────────────────
function SeatsLeft({ total, left }: { total: number; left: number }) {
  const pct = (left / total) * 100;
  const urgent = left < 5;
  const color = urgent ? "bg-red-500" : left <= 8 ? "bg-amber-500" : "bg-emerald-500";
  const textColor = urgent ? "text-red-600" : left <= 8 ? "text-amber-600" : "text-emerald-600";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className={`flex items-center gap-1 ${textColor}`}>
          {urgent && <AlertTriangle className="w-3 h-3" />}
          {left} seats left
        </span>
        <span className="text-primary/40">{total} total</span>
      </div>
      <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Savings Widget ────────────────────────────────────────────────────────────
function SavingsWidget({ solo, group }: { solo: number; group: number }) {
  const save = Math.round(((solo - group) / solo) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl px-4 py-3 shadow-sm"
    >
      <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />
      <div className="flex items-center gap-2 flex-wrap text-sm">
        <span className="text-primary/50 line-through font-medium">
          Solo ₹{solo.toLocaleString("en-IN")}
        </span>
        <span className="text-primary/30">vs</span>
        <span className="text-emerald-700 font-bold">
          Group ₹{group.toLocaleString("en-IN")}
        </span>
        <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
          SAVE {save}%
        </span>
      </div>
    </motion.div>
  );
}

// ─── Batch Card ───────────────────────────────────────────────────────────────
function BatchCard({ batch }: { batch: typeof BATCHES[0] }) {
  const urgent = batch.seatsLeft < 5;
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(30,27,110,0.18)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="snap-start shrink-0 w-[280px] sm:w-[300px] bg-white rounded-3xl overflow-hidden border border-primary/8 shadow-md flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={batch.img}
          alt={batch.destination}
          fill
          className="object-cover"
          sizes="300px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3 text-[11px] font-bold bg-white/90 backdrop-blur text-primary px-2.5 py-1 rounded-xl shadow-sm">
          {batch.tag}
        </div>

        {/* Duration */}
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-bold bg-primary/80 backdrop-blur text-white px-2.5 py-1 rounded-xl">
          <Clock className="w-3 h-3" />
          {batch.duration}
        </div>

        {/* Destination */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-accent" />
          <span className="text-white font-bold text-sm drop-shadow">{batch.destination}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Departure date */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${
          urgent ? "bg-red-50 text-red-700 border border-red-100" : "bg-primary/5 text-primary border border-primary/8"
        }`}>
          <Calendar className="w-3.5 h-3.5" />
          <span>Departs {batch.departure}</span>
          {urgent && <span className="ml-auto text-red-500 animate-pulse">🔴 Filling fast</span>}
        </div>

        {/* Seats */}
        <SeatsLeft total={batch.seatsTotal} left={batch.seatsLeft} />

        {/* Savings widget */}
        <SavingsWidget solo={batch.priceSolo} group={batch.priceGroup} />

        {/* CTA */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div>
            <div className="text-[10px] font-bold uppercase text-primary/40 tracking-wider">Per person</div>
            <div className="font-display text-xl font-bold text-primary">
              ₹{batch.priceGroup.toLocaleString("en-IN")}
            </div>
          </div>
          <Link
            href={`/destinations/${batch.slug}`}
            className="flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:bg-primary/90 active:translate-y-0.5 transition-all"
          >
            Book Seat <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GroupToursPage() {
  const groupTours = getGroupTours();
  const [sizeFilter, setSizeFilter] = useState("all");

  const scrollRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const filteredBatches =
    sizeFilter === "all" ? BATCHES : BATCHES.filter((b) => b.groupSize === sizeFilter);

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block px-3 sm:px-4 py-1.5 rounded-full bg-primary/5 backdrop-blur border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-3d-sm">
              Travel Together
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-4 sm:mb-6">
              Group <span className="text-gradient">Tours</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed px-4 sm:px-0">
              Join like-minded travelers on unforgettable group adventures. Share experiences,
              save big, and explore the world together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Batches Section ─────────────────────────────────────── */}
      <section className="pb-16 sm:pb-20">
        <div className="container px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live availability</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                Upcoming Batches
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-xs text-primary/40 font-medium hidden sm:block"
            >
              Drag or swipe to explore →
            </motion.div>
          </div>

          {/* ── Group Size Selector ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
          >
            {GROUP_SIZES.map((size) => {
              const active = sizeFilter === size.value;
              return (
                <button
                  key={size.value}
                  onClick={() => setSizeFilter(size.value)}
                  className={`relative rounded-2xl px-4 py-3.5 text-left transition-all border ${
                    active
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                      : "bg-white text-primary border-primary/10 hover:border-primary/30 hover:shadow-md"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sizeActive"
                      className="absolute inset-0 bg-primary rounded-2xl -z-10"
                    />
                  )}
                  <div className="text-2xl mb-1.5">{size.icon}</div>
                  <div className={`font-bold text-sm ${active ? "text-white" : "text-primary"}`}>
                    {size.label}
                  </div>
                  {size.desc && (
                    <div className={`text-[11px] mt-0.5 font-medium ${active ? "text-white/70" : "text-primary/40"}`}>
                      {size.desc}
                    </div>
                  )}
                  {active && (
                    <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-white/80" />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* ── Horizontal Scroll Strip ──────────────────────────────────── */}
          {filteredBatches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-3xl border border-primary/5"
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-primary/50 font-medium">No batches available for this group size.</p>
              <button
                onClick={() => setSizeFilter("all")}
                className="mt-4 px-5 py-2 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-xl text-sm transition-colors"
              >
                Show all batches
              </button>
            </motion.div>
          ) : (
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 select-none"
              style={{
                cursor: "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {filteredBatches.map((batch) => (
                <BatchCard key={batch.id} batch={batch} />
              ))}

              {/* End nudge card */}
              <div className="snap-start shrink-0 w-[180px] flex items-center justify-center">
                <div className="text-center text-primary/30">
                  <Armchair className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-medium">More batches<br />coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── All Group Tours Grid ──────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24 lg:pb-32 bg-primary/2">
        <div className="container px-4 sm:px-6 lg:px-8 pt-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
              All Group Packages
            </h2>
            <p className="text-primary/50 text-sm sm:text-base mt-2">Browse our full collection of group tour packages</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {groupTours.map((tour, i) => (
              <motion.article
                key={tour.title + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(30,27,110,0.15)" }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.08 }}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-primary/5 transition-all duration-300"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={tour.img || "/assets/dest-india.jpg"}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent text-white text-xs font-bold shadow flex items-center gap-1">
                    <Users className="w-3 h-3" />Group Tour
                  </div>
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white grid place-items-center shadow group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-primary/40 uppercase tracking-tight mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent" />{tour.destination}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/10" />
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" />{tour.duration}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-primary leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-primary/60 mb-4 line-clamp-2 leading-relaxed">
                    {tour.description}
                  </p>
                  <div className="flex items-end justify-between pt-4 border-t border-primary/5">
                    <div>
                      <div className="text-xs font-bold uppercase text-primary/30 tracking-wider mb-1">Starting from</div>
                      <div className="font-display text-xl sm:text-2xl font-bold text-primary">{tour.price}</div>
                    </div>
                    <Link
                      href={`/destinations/${tour.destinationSlug}`}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow hover:bg-primary/90 active:translate-y-0.5 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}