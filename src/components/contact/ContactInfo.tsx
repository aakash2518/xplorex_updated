"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Sparkles } from "lucide-react";
import { CONTACT_INFO } from "@/constants/theme";

export const ContactInfo = React.memo(function ContactInfo() {
  const items = [
    {
      icon: Phone,
      label: "Call Us",
      value: `+91 ${CONTACT_INFO.phone}`,
      sub: "+91 9315279350 · +91 9582285982",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: CONTACT_INFO.email,
      sub: CONTACT_INFO.salesEmail,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: CONTACT_INFO.address,
      sub: "Click to open in Maps",
    },
    {
      icon: Clock,
      label: "Work Hours",
      value: "Mon - Sat",
      sub: "10:00 AM - 7:00 PM",
    },
  ];

  return (
    <div className="space-y-4 lg:col-span-1">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-3d border border-primary/5"
          >
            <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-xl bg-primary grid place-items-center text-white shadow-glow flex-shrink-0">
              <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-primary/30 font-bold mb-0.5">
                {item.label}
              </div>
              {item.label === "Visit Us" ? (
                <a
                  href={CONTACT_INFO.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold text-sm sm:text-base hover:text-accent transition-colors leading-snug block"
                >
                  {item.value}
                </a>
              ) : (
                <div className="text-primary font-bold text-sm sm:text-base">{item.value}</div>
              )}
              <div className="text-xs text-accent font-bold">{item.sub}</div>
            </div>
          </motion.div>
        );
      })}

      {/* Social */}
      <div className="bg-primary/5 rounded-2xl p-5 sm:p-6 border border-primary/10">
        <h4 className="text-primary font-bold mb-4 flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          Follow Our Journey
        </h4>
        <div className="flex gap-3">
          {[
            { Icon: Instagram, href: CONTACT_INFO.social.instagram, label: "Instagram" },
            { Icon: Facebook, href: CONTACT_INFO.social.facebook, label: "Facebook" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 grid place-items-center rounded-xl bg-white hover:bg-primary hover:text-white transition-all border border-primary/10 shadow-3d-sm active:scale-95"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ContactInfo;
