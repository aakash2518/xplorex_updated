import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const INTERNATIONAL_TRIPS = [
  { label: "Europe", href: "/destinations/europe" },
  { label: "Bali", href: "/destinations/bali" },
  { label: "Vietnam", href: "/destinations/vietnam" },
  { label: "Thailand", href: "/destinations/thailand" },
  { label: "Kazakhstan", href: "/destinations/kazakhstan" },
  { label: "Iceland", href: "/destinations/iceland" },
  { label: "Singapore", href: "/destinations/singapore" },
  { label: "Bhutan", href: "/destinations/bhutan" },
  { label: "Maldives", href: "/destinations/maldives" },
  { label: "Dubai", href: "/destinations/dubai" },
  { label: "Malaysia", href: "/destinations/malaysia" },
];

const INDIA_TRIPS = [
  { label: "Ladakh", href: "/destinations/ladakh" },
  { label: "Spiti Valley", href: "/destinations/spiti-valley" },
  { label: "Meghalaya", href: "/destinations/meghalaya" },
  { label: "Zanskar", href: "/destinations/zanskar" },
  { label: "Kashmir", href: "/destinations/kashmir" },
  { label: "Himachal Pradesh", href: "/destinations/himachal-pradesh" },
  { label: "Andaman", href: "/destinations/andaman" },
  { label: "Kerala", href: "/destinations/kerala" },
  { label: "Rajasthan", href: "/destinations/rajasthan" },
  { label: "Nagaland", href: "/destinations/nagaland" },
];

const COMPANY = [
  { label: "Why Us",        href: "/why-us" },
  { label: "Contact",       href: "/contact" },
  { label: "Privacy Policy",href: "#" },
];

const SOCIAL = [
  { Icon: Instagram, href: "https://www.instagram.com/xplorex.in", label: "Instagram" },
  { Icon: Facebook,  href: "https://www.facebook.com/share/18fWFUevja/?mibextid=wwXIfr", label: "Facebook" },
];

const Footer = () => (
  <footer className="pt-16 sm:pt-20 pb-8 relative overflow-hidden bg-[#26658C] border-t border-white/10 text-white">
    {/* Decorative blobs */}
    <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    <div aria-hidden className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

    <div className="container relative px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-14">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="relative h-14 sm:h-16 w-52 sm:w-60 mb-6 group">
            <Image 
              src="/assets/xplorex-logo.png" 
              alt="Xplorex" 
              fill 
              className="object-contain object-left filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" 
              sizes="(max-width: 640px) 208px, 240px"
            />
          </div>
          <p className="text-white/80 text-sm leading-relaxed font-medium mb-5">
            Hand-crafted travel experiences across 12+ countries. Where global expertise meets unbeatable value.
          </p>
          <div className="flex gap-2.5">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 grid place-items-center rounded-xl bg-white/10 hover:bg-white hover:text-[#26658C] transition-colors border border-white/20 text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* International Trips */}
        <div>
          <h4 className="font-bold mb-5 uppercase text-xs tracking-widest text-accent">International Trips</h4>
          <ul className="space-y-2.5 text-sm">
            {INTERNATIONAL_TRIPS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-white/70 hover:text-white transition-colors font-semibold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* India Trips */}
        <div>
          <h4 className="font-bold mb-5 uppercase text-xs tracking-widest text-accent">India Trips</h4>
          <ul className="space-y-2.5 text-sm">
            {INDIA_TRIPS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-white/70 hover:text-white transition-colors font-semibold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold mb-5 uppercase text-xs tracking-widest text-accent">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {COMPANY.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-white/70 hover:text-white transition-colors font-semibold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold mb-5 uppercase text-xs tracking-widest text-accent">Get In Touch</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center flex-shrink-0 mt-0.5">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <a href="tel:+9184487706518" className="text-white font-bold hover:text-accent transition-colors whitespace-nowrap">
                  +91 84487706518
                </a>
                <a href="tel:+919315279350" className="text-white font-bold hover:text-accent transition-colors whitespace-nowrap">
                  +91 9315279350
                </a>
                <a href="tel:+919582285982" className="text-white font-bold hover:text-accent transition-colors whitespace-nowrap">
                  +91 9582285982
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center flex-shrink-0 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <a href="mailto:info@xplorex.in" className="text-white font-bold hover:text-accent transition-colors">
                  info@xplorex.in
                </a>
                <a href="mailto:sales@xplorex.in" className="text-white font-bold hover:text-accent transition-colors">
                  sales@xplorex.in
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 grid place-items-center flex-shrink-0 mt-1">
                <MapPin className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white/80 font-semibold leading-relaxed">
                <span className="block font-bold text-white mb-0.5">Address:</span>
                B-2/11, Block B, Block E, Mohan Cooperative Industrial Estate, Badarpur, New Delhi, Delhi 110044
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/50 font-bold">
          © {new Date().getFullYear()} Xplorex. All rights reserved.
        </p>
        <p className="text-white/50 font-script text-base">Your Journey Starts Here.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
