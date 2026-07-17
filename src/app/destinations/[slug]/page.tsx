"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, X, ZoomIn, ChevronDown, ChevronUp,
  Calendar, Clock, Wallet, Users, MapPin, Phone,
  CheckCircle2, XCircle, ArrowRight, Star, MessageCircle,
  Home, Globe2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDestination, destinations } from "@/data/destinations";
import { CONTACT_INFO } from "@/constants/theme";

// ─── Gallery images per destination (fallback to main img) ────────────────────
const GALLERY_EXTRAS: Record<string, string[]> = {
  kashmir: [
    "/assets/dest-kashmir.jpg",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&q=80&w=1200",
  ],
  ladakh: [
    "/assets/dest-ladakh.png",
    "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1601543237536-d75e0c5dda04?auto=format&fit=crop&q=80&w=1200",
  ],
  bali: [
    "/assets/dest-bali.jpg",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1200",
  ],
};

function getGallery(slug: string, mainImg: string): string[] {
  return GALLERY_EXTRAS[slug] ?? [mainImg,
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200",
  ];
}

// ─── Itinerary data per destination ───────────────────────────────────────────
const ITINERARY: Record<string, { day: number; title: string; desc: string }[]> = {
  kashmir: [
    { day: 1, title: "Arrival in Srinagar — Houseboat Stay", desc: "Land at Sheikh Ul-Alam International Airport. Transfer to your iconic Dal Lake houseboat. Evening shikara ride as the sun sets over the Himalayas. Welcome dinner on the lake." },
    { day: 2, title: "Gulmarg — Gondola Ride & Snow Fun", desc: "Drive to Gulmarg (2,650m), the 'Meadow of Flowers'. Board Asia's highest Gondola ride for panoramic views of Nanga Parbat. Snow activities, local Kehwa tea." },
    { day: 3, title: "Pahalgam — Valley of Shepherds", desc: "Scenic drive through Saffron fields to Pahalgam (2,100m). Visit Betaab Valley and Aru Valley. Optional horse-riding through pine forests." },
    { day: 4, title: "Sonamarg & Local Sightseeing", desc: "Explore Sonamarg, the 'Meadow of Gold'. Trek to Thajiwas Glacier (optional). Return via Sindh Valley. Evening at leisure in Srinagar's old city." },
    { day: 5, title: "Srinagar City Tour", desc: "Visit the Mughal Gardens — Nishat Bagh, Shalimar Bagh, Chashme Shahi. Explore Hazratbal Shrine, Shankaracharya Temple. Shopping at Lal Chowk." },
    { day: 6, title: "Departure", desc: "Morning leisurely breakfast on the houseboat. Transfer to Srinagar Airport for your onward journey. Carry unforgettable memories of Kashmir." },
  ],
};

const DEFAULT_ITINERARY = (name: string) => [
  { day: 1, title: `Arrival in ${name}`, desc: `Welcome to ${name}! Transfer to your hotel. Evening orientation walk. Welcome dinner with local cuisine.` },
  { day: 2, title: "Day Excursion & Sightseeing", desc: `Full-day guided sightseeing covering the top landmarks of ${name}. Lunch at a local restaurant, photography stops.` },
  { day: 3, title: "Adventure & Local Culture", desc: "Immerse yourself in the local culture. Visit markets, try regional food, enjoy an optional adventure activity." },
  { day: 4, title: "Leisure Day & Hidden Gems", desc: "Free morning to explore at your own pace. Afternoon guided visit to lesser-known, off-beat spots." },
  { day: 5, title: "Departure", desc: `Check-out after breakfast. Transfer to the airport. Fond farewell — see you on the next adventure!` },
];

// ─── Inclusions / Exclusions ──────────────────────────────────────────────────
const INCLUSIONS = [
  "Accommodation (3★ / 4★ hotels as per package)",
  "Daily breakfast & dinner (MAP basis)",
  "All transfers in private AC vehicles",
  "Experienced English-speaking guide",
  "All sightseeing as per itinerary",
  "Complimentary houseboat stay (Kashmir)",
  "24/7 Xplorex trip support",
  "GST & all applicable taxes",
];
const EXCLUSIONS = [
  "Airfare / train fare (unless specified)",
  "Lunch & personal beverages",
  "Entry fees not mentioned in itinerary",
  "Personal travel insurance",
  "Anything not mentioned in inclusions",
  "Tips & porterage",
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 grid place-items-center text-white hover:bg-white/20 transition-colors z-10">
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold z-10">
        {current + 1} / {images.length}
      </div>

      {/* Prev/Next */}
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 grid place-items-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 grid place-items-center text-white hover:bg-white/20 transition-colors z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl max-h-[85vh] mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Gallery image ${current + 1}`}
          width={1200}
          height={750}
          className="rounded-2xl object-contain max-h-[85vh] w-full"
          unoptimized={images[current].startsWith("http")}
        />
      </motion.div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-12 h-8 rounded-lg overflow-hidden border-2 transition-all ${i === current ? "border-accent scale-110" : "border-white/20 opacity-60"}`}
          >
            <Image src={img} alt="" fill className="object-cover" unoptimized={img.startsWith("http")} />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({ day, title, desc, defaultOpen }: { day: number; title: string; desc: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-primary/20 shadow-md" : "border-primary/8"}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-primary/3 transition-colors"
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-colors ${open ? "bg-primary text-white" : "bg-primary/8 text-primary"}`}>
          {day}
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-primary/40 mb-0.5">Day {day}</div>
          <div className="font-bold text-primary text-sm sm:text-base leading-snug">{title}</div>
        </div>
        <div className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4 text-primary/40" />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 text-sm text-primary/65 leading-relaxed font-medium border-t border-primary/8 ml-[3.25rem]">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Similar Package Card ─────────────────────────────────────────────────────
function SimilarCard({ dest }: { dest: ReturnType<typeof getDestination> }) {
  if (!dest) return null;
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(30,27,110,0.16)" }}
      className="shrink-0 w-64 bg-white rounded-2xl overflow-hidden border border-primary/8 shadow-sm"
    >
      <Link href={`/destinations/${dest.slug}`}>
        <div className="relative h-40 overflow-hidden">
          <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="256px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <div className="text-white font-bold text-sm">{dest.name}</div>
            <div className="text-white/70 text-xs">{dest.tagline}</div>
          </div>
        </div>
        <div className="p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-primary/40 font-bold">From</div>
            <div className="font-bold text-primary text-base">{dest.from}</div>
          </div>
          <span className="flex items-center gap-1 text-accent text-xs font-bold">
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = ["Overview", "Itinerary", "Inclusions", "Packages"];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DestinationDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const dest = getDestination(slug);

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [slug]);

  if (!dest) {
    if (typeof window !== "undefined") router.replace("/");
    return null;
  }

  const gallery = getGallery(slug, dest.img);
  const itinerary = ITINERARY[slug] ?? DEFAULT_ITINERARY(dest.name);
  const similar = destinations.filter((d) => d.slug !== slug && d.region === dest.region).slice(0, 6);
  const regionPath = dest.region === "India" ? "/india-trips" : "/international-trips";
  const regionLabel = dest.region === "India" ? "India Trips" : "International Trips";

  const whatsappMsg = `Hi Xplorex! I'm interested in a trip to *${dest.name}*.\n\n📍 Destination: ${dest.name}\n💰 Starting from: ${dest.from}\n\nCould you share more details and a custom itinerary?`;
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <main className="overflow-x-hidden bg-background">
      <Navbar />
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox images={gallery} index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>

      {/* ── Gallery Hero ──────────────────────────────────────────────── */}
      <section className="pt-16 sm:pt-20">
        {/* Breadcrumb */}
        <div className="container px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-xs font-bold text-primary/50">
            <Link href="/" className="hover:text-primary flex items-center gap-1 transition-colors"><Home className="w-3 h-3" /> Home</Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <Link href={regionPath} className="hover:text-primary transition-colors flex items-center gap-1">
              <Globe2 className="w-3 h-3" />{regionLabel}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
            <span className="text-accent">{dest.name}</span>
          </nav>
        </div>

        {/* Gallery Grid */}
        <div className="container px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[300px] sm:h-[420px] lg:h-[500px] rounded-3xl overflow-hidden">
            {/* Main large image */}
            <div
              className="col-span-4 sm:col-span-2 row-span-2 relative cursor-pointer group"
              onClick={() => setLightboxIdx(0)}
            >
              <Image src={gallery[0]} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/40 backdrop-blur px-2.5 py-1.5 rounded-lg">
                  <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
                </span>
              </div>
            </div>
            {/* Thumbnails */}
            {gallery.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className="hidden sm:block relative cursor-pointer group overflow-hidden"
                onClick={() => setLightboxIdx(i + 1)}
              >
                <Image src={img} alt={`${dest.name} ${i + 2}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="25vw"
                  unoptimized={img.startsWith("http")} />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                {/* View all overlay on last thumb */}
                {i === 2 && gallery.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">+{gallery.length - 4} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content + Sticky Sidebar ─────────────────────────────── */}
      <section className="container px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

          {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Destination title */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {dest.tags?.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-primary/8 rounded-xl text-[11px] font-bold text-primary/60 uppercase tracking-wider">{tag}</span>
                ))}
                {dest.region === "International" && dest.visaStatus && (
                  <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
                    dest.visaStatus.toLowerCase().includes("free") ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${dest.visaStatus.toLowerCase().includes("free") ? "bg-emerald-500" : "bg-amber-500"}`} />
                    {dest.visaStatus}
                  </span>
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-2">
                {dest.flag && <span className="mr-2">{dest.flag}</span>}{dest.name}
              </h1>
              <p className="font-script text-xl sm:text-2xl text-accent">{dest.tagline}</p>
            </motion.div>

            {/* ─ Tab Bar ─────────────────────────────────────────────── */}
            <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-sm py-3 -mx-1 px-1 mb-8">
              <div className="flex gap-1 bg-primary/5 border border-primary/10 p-1 rounded-2xl overflow-x-auto no-scrollbar">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 sm:px-6 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab ? "text-white" : "text-primary/55 hover:text-primary"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div layoutId="tabBg" className="absolute inset-0 bg-primary rounded-xl -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                    )}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Tab Panels ──────────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* OVERVIEW */}
                {activeTab === "Overview" && (
                  <div className="space-y-8">
                    <div className="prose prose-sm sm:prose-base max-w-none">
                      {dest.intro.map((para, i) => (
                        <p key={i} className="text-primary/70 leading-relaxed font-medium text-base sm:text-lg mb-4">{para}</p>
                      ))}
                    </div>
                    {dest.highlights && dest.highlights.length > 0 && (
                      <div className="space-y-5">
                        {dest.highlights.map((h, i) => (
                          <div key={i} className="bg-white border border-primary/8 rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4 text-accent" />{h.heading}
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-2">
                              {h.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-primary/65 font-medium">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Quick facts grid on mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden">
                      {[
                        { icon: Calendar, label: "Best Time", val: dest.bestTime ?? "Year-round" },
                        { icon: Wallet, label: "Starting", val: dest.from },
                        { icon: Users, label: "Packages", val: `${dest.trips} options` },
                        { icon: MapPin, label: "Region", val: dest.region },
                      ].map((f) => (
                        <div key={f.label} className="bg-white border border-primary/8 rounded-2xl p-3.5 text-center shadow-sm">
                          <f.icon className="w-5 h-5 text-accent mx-auto mb-1.5" />
                          <div className="text-[10px] font-bold uppercase tracking-wider text-primary/40 mb-0.5">{f.label}</div>
                          <div className="font-bold text-primary text-sm">{f.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ITINERARY */}
                {activeTab === "Itinerary" && (
                  <div className="space-y-3">
                    <p className="text-primary/55 text-sm font-medium mb-5">
                      A sample day-by-day itinerary for {dest.name}. Your custom plan will be tailored to your dates and preferences.
                    </p>
                    {itinerary.map((item, i) => (
                      <AccordionItem key={item.day} day={item.day} title={item.title} desc={item.desc} defaultOpen={i === 0} />
                    ))}
                  </div>
                )}

                {/* INCLUSIONS */}
                {activeTab === "Inclusions" && (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
                      <h3 className="font-bold text-emerald-700 mb-4 flex items-center gap-2 text-base">
                        <CheckCircle2 className="w-5 h-5" /> What's Included
                      </h3>
                      <ul className="space-y-2.5">
                        {INCLUSIONS.map((inc) => (
                          <li key={inc} className="flex items-start gap-2.5 text-sm text-emerald-800 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
                      <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2 text-base">
                        <XCircle className="w-5 h-5" /> Not Included
                      </h3>
                      <ul className="space-y-2.5">
                        {EXCLUSIONS.map((exc) => (
                          <li key={exc} className="flex items-start gap-2.5 text-sm text-red-800 font-medium">
                            <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />{exc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* PACKAGES */}
                {activeTab === "Packages" && (
                  <div className="space-y-4">
                    {dest.packages.map((pkg, i) => (
                      <motion.div
                        key={pkg.title}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white border border-primary/8 rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
                      >
                        {pkg.img && (
                          <div className="relative w-full sm:w-36 h-36 sm:h-auto shrink-0">
                            <Image src={pkg.img} alt={pkg.title} fill className="object-cover" sizes="144px" />
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              {pkg.category && <span className="px-2 py-0.5 bg-primary/8 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wide">{pkg.category}</span>}
                              {pkg.type && <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded-lg uppercase tracking-wide">{pkg.type}</span>}
                            </div>
                            <h3 className="font-display font-bold text-primary text-base sm:text-lg leading-snug mb-1">{pkg.title}</h3>
                            <p className="text-primary/55 text-sm font-medium leading-relaxed">{pkg.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-primary/35 font-bold">Duration</div>
                              <div className="font-bold text-primary text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-accent" />{pkg.duration}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] uppercase tracking-wider text-primary/35 font-bold">Starting from</div>
                              <div className="font-display font-bold text-primary text-xl">{pkg.price}</div>
                            </div>
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> Book
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── STICKY SIDEBAR ────────────────────────────────────────── */}
          <div ref={sidebarRef} className="hidden lg:block w-80 xl:w-88 shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Quick Facts Card */}
              <div className="bg-white border border-primary/10 rounded-3xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-primary to-indigo-700 px-6 py-5">
                  <div className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Quick Facts</div>
                  <div className="font-display text-white text-2xl font-bold">{dest.name}</div>
                  <div className="text-accent font-script text-lg mt-0.5">{dest.tagline}</div>
                </div>
                <div className="p-5 space-y-4">
                  {[
                    { icon: Calendar, label: "Best Time to Visit", val: dest.bestTime ?? "Year-round" },
                    { icon: Clock,    label: "Duration Options",   val: `${dest.trips} packages available` },
                    { icon: Wallet,   label: "Starting Price",     val: dest.from },
                    { icon: MapPin,   label: "Region",             val: dest.region },
                    ...(dest.visaInfo ? [{ icon: Globe2, label: "Visa Info", val: dest.visaInfo }] : []),
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 grid place-items-center shrink-0">
                        <f.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-primary/35 font-bold">{f.label}</div>
                        <div className="font-bold text-primary text-sm">{f.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="px-5 pb-5 space-y-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Get Quote on WhatsApp
                  </a>
                  <a
                    href={`tel:+91${CONTACT_INFO.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/15 font-bold py-3 rounded-2xl transition-all text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </a>
                </div>

                {/* Trust row */}
                <div className="bg-primary/3 px-5 py-3 border-t border-primary/8 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] text-primary/50 font-medium">4.9/5 · 10,000+ happy travelers</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Similar Packages Carousel ─────────────────────────────────── */}
      {similar.length > 0 && (
        <section className="pb-20 bg-primary/3">
          <div className="container px-4 sm:px-6 lg:px-8 pt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">Similar Destinations</h2>
                <p className="text-primary/50 text-sm font-medium mt-1">Other {dest.region} packages you might love</p>
              </div>
              <Link href={regionPath} className="text-accent font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
              {similar.map((d) => (
                <div key={d.slug} className="snap-start">
                  <SimilarCard dest={d} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-primary/10 p-4 flex gap-3 shadow-2xl">
        <a
          href={`tel:+91${CONTACT_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 border border-primary/20 bg-primary/5 text-primary font-bold py-3 rounded-2xl text-sm transition-all"
        >
          <Phone className="w-4 h-4" /> Call Us
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-2xl text-sm shadow-lg shadow-emerald-500/30 transition-all"
        >
          <MessageCircle className="w-4 h-4" /> Get Quote on WhatsApp
        </a>
      </div>

      <Footer />
    </main>
  );
}
