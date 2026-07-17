"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home",                  href: "/" },
  { label: "India Trips",           href: "/india-trips" },
  { label: "International Trips",   href: "/international-trips" },
  { label: "Group Tours",           href: "/group-tours" },
  { label: "Why Us",                href: "/why-us" },
  { label: "Blog",                  href: "/blog" },
  { label: "Contact",               href: "/contact" },
];

const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[150] transition-[padding] duration-300 ${
        scrolled ? "py-1 sm:py-2" : "py-2 sm:py-4"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* ── Bar ── */}
        <div
          className={`flex items-center justify-between rounded-2xl sm:rounded-3xl px-4 sm:px-5 md:px-7 py-2 sm:py-3 bg-white/80 backdrop-blur-xl border border-primary/10 transition-shadow duration-300 ${
            scrolled ? "shadow-3d" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="block relative h-12 sm:h-14 lg:h-16 w-44 sm:w-52 lg:w-60 group" aria-label="Xplorex home">
            <Image
              src="/assets/xplorex-logo.png"
              alt="Xplorex"
              fill
              className="object-contain object-left group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              priority
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3" aria-label="Main navigation">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-[15px] font-semibold transition-colors rounded-lg hover:bg-primary/5 whitespace-nowrap ${
                  pathname === l.href ? "text-accent" : "text-primary/80 hover:text-accent"
                }`}
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute left-3 xl:left-4 right-3 xl:right-4 -bottom-0.5 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:8447706518"
              className="hidden sm:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-accent text-white font-semibold shadow-press hover:translate-y-0.5 active:translate-y-1 transition-transform text-xs sm:text-sm whitespace-nowrap"
            >
              <Phone className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
              <span>+91 8447706518</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              className="lg:hidden w-9 sm:w-10 h-9 sm:h-10 grid place-items-center rounded-xl sm:rounded-2xl bg-primary/5 border border-primary/10 shadow-3d-sm"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open
                ? <X    className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                : <Menu className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{   opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="lg:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-primary/10 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-3d"
              aria-label="Mobile navigation"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-colors ${
                    pathname === l.href
                      ? "text-accent bg-accent/5"
                      : "text-primary hover:bg-primary/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-primary/10 sm:hidden">
                <a
                  href="tel:8447706518"
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +91 8447706518
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
});

export default Navbar;
