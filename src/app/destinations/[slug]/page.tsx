"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Plane, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/ui/PackageCard";
import PackageListItem from "@/components/ui/PackageListItem";
import { getDestination, destinations } from "@/data/destinations";

const DestinationDetail = () => {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const dest = getDestination(slug);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "2",
    notes: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!dest) {
    if (typeof window !== "undefined") {
      router.replace("/");
    }
    return null;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const msg = [
      `🌍 *Quote Request – Xplorex*`,
      ``,
      `📍 *Destination:* ${dest.name}`,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📧 *Email:* ${form.email || "Not provided"}`,
      `👥 *Travelers:* ${form.travelers}`,
      form.notes ? `📝 *Notes:* ${form.notes}` : "",
      ``,
      `_Sent from xplorex.com_`,
    ].filter(Boolean).join("\n");

    window.location.href = `https://wa.me/918447706518?text=${encodeURIComponent(msg)}`;
  };

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
          className="absolute top-32 left-0 text-white/30"
        >
          <Plane className="w-16 h-16 -rotate-12" />
        </motion.div>

        <div className="container relative h-full flex flex-col justify-end pb-20">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-accent mb-6 text-sm font-bold drop-shadow-lg transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-white/90 mb-4 uppercase tracking-[0.2em] font-bold drop-shadow-md">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/destinations" className="hover:text-accent">Destinations</Link>
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
          <p className="font-script text-2xl sm:text-4xl text-accent drop-shadow-lg mb-6">{dest.tagline}</p>
          
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
      <section className="bg-white border-y border-primary/5 py-8 relative z-20 shadow-sm">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { label: "Best Time", value: dest.bestTime || "Year round", icon: Clock },
               { label: "Visa Info", value: dest.visaInfo || "Standard Visa", icon: MapPin },
               { label: "Currency", value: dest.currency || "Local Currency", icon: Sparkles },
               { label: "Activities", value: "Adventure, Culture", icon: Plane },
             ].map((item) => (
               <div key={item.label} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-primary">{item.value}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Packages Section with Sidebar */}
      <section className="py-16 sm:py-24 bg-primary/5">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Filters Sidebar */}
            <aside className="w-full lg:w-80 shrink-0 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-3d border border-primary/5">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center justify-between">
                  Filter By
                  <span className="text-accent text-[10px] uppercase tracking-widest cursor-pointer hover:underline">Clear all</span>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 ml-1">Categories</p>
                    <div className="space-y-3">
                      {["Group Tours", "Private Trips", "Honeymoon", "Luxury"].map((c) => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                           <div className="w-5 h-5 rounded-md border-2 border-primary/10 group-hover:border-accent transition-colors" />
                           <span className="text-sm font-bold text-primary/70">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-primary/5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/30 mb-4 ml-1">Price Range</p>
                    <div className="h-1.5 w-full bg-primary/5 rounded-full relative">
                       <div className="absolute inset-x-0 h-full bg-accent rounded-full" />
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent shadow-md" />
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent shadow-md" />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-primary/40 tracking-widest">
                       <span>{dest.from}</span>
                       <span>₹2,50,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-3d-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-xl mb-4">Need help planning?</h4>
                  <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed">Our travel experts are here to craft your perfect {dest.name} trip.</p>
                  <Link href="#quote-form" className="block w-full py-3 bg-accent text-white font-bold rounded-2xl text-center hover:scale-105 transition-transform">
                    Talk to Expert
                  </Link>
                </div>
                <Plane className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 -rotate-12" />
              </div>
            </aside>

            {/* Right: Packages List */}
            <div className="flex-1">
              <div className="mb-8 flex items-center justify-between">
                <div>
                   <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">{dest.name} Itineraries</h2>
                   <p className="text-sm text-primary/40 font-bold tracking-wide mt-1">Showing all {dest.packages.length} available packages</p>
                </div>
                <div className="flex gap-2">
                   <div className="w-10 h-10 rounded-xl bg-white border border-primary/5 flex items-center justify-center text-primary shadow-sm cursor-pointer hover:bg-primary/5 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                   </div>
                   <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md cursor-pointer">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                {dest.packages.map((p: any, i: number) => (
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

      {/* Quotation Form (per destination) */}
      <section id="quote-form" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-primary/5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(hsl(246_67%_29%)_1px,transparent_1px)] [background-size:40px_40px]"
        />

        <div className="container relative px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary"
          >
            <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-5 shadow-3d-sm">
              Request Quotation
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 sm:mb-6">
              Plan your <br />
              <span className="font-script text-accent text-3xl sm:text-5xl">personalized</span> trip
            </h2>
            <p className="text-primary/60 font-medium text-base sm:text-lg mb-8 max-w-md leading-relaxed">
              Share your travel dates and preferences. We'll send a customized {dest.name} itinerary with transparent pricing within 2 hours.
            </p>

            <div className="space-y-3">
              {[
                { k: "Direct Call",    v: "+91 8447 706 518" },
                { k: "Official Email", v: "info@xplorex.in" },
                { k: "Support Hours",  v: "24 / 7 — Always Available" },
              ].map((c) => (
                <div key={c.k} className="flex items-center gap-4 bg-white rounded-2xl p-4 sm:p-5 shadow-3d border border-primary/5">
                  <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold w-16 sm:w-20 flex-shrink-0">{c.k}</div>
                  <div className="font-bold text-primary text-sm sm:text-base">{c.v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-3d-lg border border-primary/5"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-primary">Get a Free Quote</h3>
            <p className="text-sm text-primary/40 font-bold mb-6">For your {dest.name} tour package</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your Name"    value={form.name}  onChange={(v: string) => setForm({ ...form, name: v })}  placeholder="John Doe"  required />
                <Field label="Phone Number" value={form.phone} onChange={(v: string) => setForm({ ...form, phone: v })} placeholder="+91 ..."   required />
              </div>
              <Field label="Email Address" type="email" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} placeholder="you@email.com" required />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1.5 block ml-1">Travelers</label>
                <select
                  title="Number of travelers"
                  value={form.travelers}
                  onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                  className="w-full sm:w-1/2 px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-bold text-sm appearance-none cursor-pointer"
                >
                  {["1", "2", "3", "4", "5+"].map((o) => <option key={o} className="bg-white">{o}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 block ml-1">Anything specific?</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  placeholder={`Honeymoon, family trip, adventure focus in ${dest.name}...`}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-medium leading-relaxed text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#25D366] hover:bg-[#20c05c] active:scale-[0.98] text-white font-bold py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-4 text-xl"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send on WhatsApp
              </button>
              <p className="text-xs text-center text-primary/30 font-bold mt-4">⚡ Reply within 2 hours · Best Price Guaranteed</p>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Other destinations */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10 sm:mb-14 text-primary text-center">
            Explore more <span className="text-gradient">destinations</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/destinations/${o.slug}`}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-3d aspect-[3/4] border border-primary/5"
              >
                <Image
                  src={o.img}
                  alt={o.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white">
                  <div className="font-display text-xl sm:text-2xl font-bold drop-shadow-md mb-1">{o.name}</div>
                  <div className="text-[10px] opacity-80 font-bold text-accent uppercase tracking-widest">
                    {o.packages.length} Packages
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const Field = ({ label, value, onChange, type = "text", placeholder, required }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2 block ml-2">{label}</label>
    <input
      type={type}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-6 py-4 rounded-2xl border-2 border-primary/5 bg-primary/5 focus:bg-white focus:border-primary/20 text-primary outline-none transition-all font-semibold text-[15px]"
    />
  </div>
);

export default DestinationDetail;
