"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGroupTours } from "@/data/destinations";

export default function GroupToursPage() {
  const groupTours = getGroupTours();

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      <section className="pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20">
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
              Join like-minded travelers on unforgettable group adventures. Make new friends, share experiences, 
              and explore the world together with our carefully curated group tours.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {groupTours.map((tour, i) => (
              <motion.article
                key={tour.title + i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.1 }}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-3d border border-primary/5 hover:shadow-3d-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden">
                  <Image 
                    src={tour.img || "/assets/dest-india.jpg"} 
                    alt={tour.title} 
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Group Tour
                  </div>
                  
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white grid place-items-center shadow-3d-sm group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-primary/40 uppercase tracking-tight mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-accent" /> {tour.destination}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/10" />
                    <span className="flex items-center gap-1"><Clock className="w-3 sm:w-4 h-3 sm:h-4 text-accent" /> {tour.duration}</span>
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
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-white text-xs sm:text-sm font-bold shadow-press hover:translate-y-0.5 transition-all"
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