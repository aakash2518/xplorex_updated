import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

const TOURS = [
  { label: "India Trips",           href: "/india-trips" },
  { label: "International Trips",   href: "/international-trips" },
  { label: "Group Tours",           href: "/group-tours" },
  { label: "Honeymoon Packages",    href: "/honeymoon-packages" },
];

const COMPANY = [
  { label: "Why Us",        href: "/why-us" },
  { label: "Contact",       href: "/contact" },
  { label: "Privacy Policy",href: "#" },
];

const SOCIAL = [
  { Icon: Instagram, href: "https://www.instagram.com/XXXXXXXXXX", label: "Instagram" },
  { Icon: Facebook,  href: "https://www.facebook.com/XXXXXXXXXX", label: "Facebook" },
];

const Footer = () => (
  <footer className="pt-16 sm:pt-20 pb-8 relative overflow-hidden bg-white border-t border-primary/5">
    {/* Decorative blobs */}
    <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 bg-primary/4 rounded-full blur-3xl pointer-events-none" />
    <div aria-hidden className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/4 rounded-full blur-3xl pointer-events-none" />

    <div className="container relative px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-14">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-white grid place-items-center shadow-3d-sm border border-primary/5 flex-shrink-0">
              <Image src="/assets/xplorex-logo.png" alt="Xplorex" width={40} height={40} className="object-contain w-9 h-9" />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-primary">Xplorex</div>
              <div className="text-xs text-primary/40 font-script">Your Journey Starts Here.</div>
            </div>
          </div>
          <p className="text-primary/55 text-sm leading-relaxed font-medium mb-5">
            Hand-crafted travel experiences across 12+ countries. Where global expertise meets unbeatable value.
          </p>
          <div className="flex gap-2.5">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 grid place-items-center rounded-xl bg-primary/5 hover:bg-primary hover:text-white transition-colors border border-primary/10"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Tours */}
        <div>
          <h4 className="font-bold mb-5 uppercase text-xs tracking-widest text-accent">Tours</h4>
          <ul className="space-y-2.5 text-sm">
            {TOURS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-primary/65 hover:text-accent transition-colors font-semibold">
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
                <Link href={href} className="text-primary/65 hover:text-accent transition-colors font-semibold">
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
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 grid place-items-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-primary" />
              </div>
              <a href="tel:XXXXXXXXXX" className="text-primary font-bold hover:text-accent transition-colors">
                +91 XXXX XXX XXX
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 grid place-items-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5 text-primary" />
              </div>
              <a href="mailto:XXXXXXXXXX@XXXXXXXXXX.in" className="text-primary font-bold hover:text-accent transition-colors">
                XXXXXXXXXX@XXXXXXXXXX.in
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/5 grid place-items-center flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-primary/55 font-semibold">XXXXXXXXXX, India · Global Service</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 border-t border-primary/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-primary/30 font-bold">
          © {new Date().getFullYear()} Xplorex. All rights reserved.
        </p>
        <p className="text-primary/30 font-script text-base">Your Journey Starts Here.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
