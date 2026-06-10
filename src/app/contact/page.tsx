"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { CONTACT_INFO } from "@/constants/theme";

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-4 shadow-3d-sm">
              Get in Touch
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Let's Plan Your <span className="text-gradient">Adventure</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about a destination? Need a customized itinerary? Our travel experts are available 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-16 sm:pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Contact Info */}
            <ContactInfo />

            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps — Full Width */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full overflow-hidden"
        >
          {/* Floating info bar on top of map */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-3 shadow-3d flex items-center gap-4 border border-primary/10 w-[90%] max-w-2xl">
            <div className="w-9 h-9 rounded-xl bg-primary grid place-items-center text-white flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-primary text-sm">Xplorex Office</div>
              <div className="text-xs text-primary/50 font-medium truncate">{CONTACT_INFO.address}</div>
            </div>
            <a
              href={CONTACT_INFO.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-white bg-accent hover:bg-primary transition-colors px-3 py-1.5 rounded-xl whitespace-nowrap active:scale-95"
            >
              Open in Maps →
            </a>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121593!2d77.2764!3d28.5016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1a9e47d2b17%3A0x7b0e7e8d!2sMohan+Cooperative+Industrial+Estate%2C+Badarpur%2C+New+Delhi%2C+Delhi+110044!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="600"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Xplorex Office Location"
          />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
