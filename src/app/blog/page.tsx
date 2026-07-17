"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { Calendar, Clock, ArrowRight, Mail, Sparkles, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Category Config ──────────────────────────────────────────────────────────
const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  Domestic:       { bg: "bg-emerald-100",  text: "text-emerald-700", dot: "bg-emerald-500",  border: "border-emerald-200" },
  International:  { bg: "bg-blue-100",     text: "text-blue-700",    dot: "bg-blue-500",     border: "border-blue-200"    },
  "Travel Guide": { bg: "bg-amber-100",    text: "text-amber-700",   dot: "bg-amber-500",    border: "border-amber-200"   },
};

function CategoryBadge({ category }: { category: string }) {
  const s = CATEGORY_STYLES[category] ?? { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary", border: "border-primary/20" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {category}
    </span>
  );
}

// ─── Newsletter Banner ────────────────────────────────────────────────────────
function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(""); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="col-span-full my-4 relative rounded-3xl overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-700 to-primary" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=60&w=1200')] bg-cover bg-center opacity-10" />
      <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-accent/20 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 px-6 sm:px-10 py-8 sm:py-10">
        {/* Icon */}
        <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/15 border border-white/20 grid place-items-center">
          <Mail className="w-7 h-7 text-white" />
        </div>

        {/* Text */}
        <div className="text-center sm:text-left flex-1">
          <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">✈️ Weekly Travel Deals</div>
          <h3 className="text-white font-display text-xl sm:text-2xl font-bold leading-tight">
            Get travel deals in your inbox
          </h3>
          <p className="text-white/60 text-sm font-medium mt-1">
            Join 10,000+ travelers · Exclusive deals every week · No spam, ever
          </p>
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-emerald-400 font-bold text-sm flex items-center gap-2 shrink-0"
            >
              ✅ Subscribed! Check your inbox.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 sm:w-52 px-4 py-2.5 rounded-xl bg-white/15 border border-white/25 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent text-white text-sm font-bold rounded-xl shadow-md hover:bg-amber-500 active:translate-y-0.5 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Small Blog Card ──────────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: typeof blogs[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.45 }}
      whileHover={{ y: -5, boxShadow: "0 20px 44px rgba(30,27,110,0.16)" }}
      className="group bg-white rounded-3xl overflow-hidden border border-primary/6 shadow-sm flex flex-col transition-shadow"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Category badge */}
          <div className="absolute top-3.5 left-3.5">
            <CategoryBadge category={post.category} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex items-center gap-3 text-[11px] text-primary/45 font-bold">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-primary/20" />
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min read</span>
          </div>

          <h2 className="font-display font-bold text-base sm:text-lg text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {post.title}
          </h2>

          <p className="text-primary/55 text-xs sm:text-sm leading-relaxed line-clamp-3 flex-1">
            {post.description}
          </p>

          <div className="pt-3 border-t border-primary/6 flex items-center justify-between">
            <span className="text-xs text-primary/40 font-medium">{post.author}</span>
            <span className="flex items-center gap-1 text-accent font-bold text-xs group-hover:gap-2 transition-all">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [featured, ...rest] = blogs;
  const featuredStyle = CATEGORY_STYLES[featured?.category] ?? { bg: "bg-primary/10", text: "text-white", dot: "bg-white", border: "border-white/20" };

  // Insert newsletter after every 6 posts
  const gridItems: ("newsletter" | typeof blogs[0])[] = [];
  rest.forEach((post, i) => {
    gridItems.push(post);
    if ((i + 1) % 6 === 0) gridItems.push("newsletter");
  });
  if (gridItems[gridItems.length - 1] !== "newsletter") gridItems.push("newsletter");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 sm:pt-32 lg:pt-40 pb-24">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <section className="container px-4 sm:px-6 lg:px-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Travel Stories
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-primary/60 text-base sm:text-lg max-w-2xl leading-relaxed font-medium">
              Insider guides, destination inspiration and real traveler stories — everything you need to plan your next adventure.
            </p>
          </motion.div>
        </section>

        {/* ── Featured Post ────────────────────────────────────────── */}
        {featured && (
          <section className="container px-4 sm:px-6 lg:px-8 mb-14">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Link href={`/blog/${featured.slug}`} className="block">
                {/* Image */}
                <div className="relative h-[380px] sm:h-[480px] lg:h-[560px] w-full overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="100vw"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
                    {/* Badges row */}
                    <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border bg-white/20 backdrop-blur text-white border-white/30`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {featured.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-accent/90 text-white border border-accent/30">
                        ⭐ Featured
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white/60 text-[11px] font-medium">
                        <Clock className="w-3 h-3" />{featured.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 max-w-3xl">
                      {featured.title}
                    </h2>
                    <p className="text-white/70 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mb-5 line-clamp-2">
                      {featured.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/55 text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.date}
                        <span className="mx-1 opacity-50">·</span>
                        {featured.author}
                      </div>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-accent font-bold text-sm"
                      >
                        Read Full Story <ChevronRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          </section>
        )}

        {/* ── Grid ─────────────────────────────────────────────────── */}
        <section className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridItems.map((item, i) =>
              item === "newsletter" ? (
                <NewsletterBanner key={`newsletter-${i}`} />
              ) : (
                <BlogCard key={(item as typeof blogs[0]).slug} post={item as typeof blogs[0]} index={i} />
              )
            )}
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
