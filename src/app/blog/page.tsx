"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/store";
import type { BlogPost } from "@/data/blogs";
import { Search, Calendar, Clock, ArrowRight, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // Fetch from local CMS (store.ts)
    setBlogs(getBlogs());
  }, []);

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  // Filter logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />

      {/* ─── WANDERON STYLE HERO ──────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-white overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />
        
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest">
              Travel Stories & Guides
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-black text-gray-900 mb-6 tracking-tight leading-tight">
              Wander <span className="text-blue-600">Wisely</span>
            </h1>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto font-medium">
              Read stories, tips, and guides from our expert travelers and start planning your next dream getaway.
            </p>
          </motion.div>

          {/* Modern Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto relative group shadow-sm rounded-full bg-white"
          >
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-semibold placeholder:font-medium placeholder:text-gray-400 text-base"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY FILTERS (Sticky) ───────────────────────────────────────── */}
      <section className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 md:top-20 z-40">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex overflow-x-auto py-4 gap-3 no-scrollbar scroll-smooth items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG GRID ────────────────────────────────────────────────────────── */}
      <section className="flex-1 py-12 md:py-20 container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredBlogs.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-6 text-blue-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-8 px-6 py-2 bg-gray-900 text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      <Footer />
    </main>
  );
}

// ─── WANDERON STYLE BLOG CARD ──────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
        {/* Large Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800" alt="Fallback" fill className="object-cover opacity-50" />
            </div>
          )}
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Floating Category Badge */}
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/95 backdrop-blur-md text-gray-900 shadow-sm">
              {post.category || "Travel"}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-7 sm:p-8 flex flex-col flex-1 relative">
          {/* Floating Read Time Badge */}
          <div className="absolute -top-6 right-6 bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-500/20 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime || 5} min read
          </div>

          <h2 className="font-display font-black text-xl md:text-2xl text-gray-900 leading-[1.3] mb-4 group-hover:text-blue-600 transition-colors line-clamp-3">
            {post.title}
          </h2>
          
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-1 font-medium">
            {post.description}
          </p>

          {/* Footer Metadata */}
          <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 grid place-items-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-none mb-1">{post.author}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{post.date}</p>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors flex-shrink-0">
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
