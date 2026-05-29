"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32">
      {/* Hero Section */}
      <section className="container px-4 mb-20 lg:mb-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-primary">
              Our <span className="text-gradient">Travel Stories</span>
            </h1>
            <p className="text-lg text-primary/70 max-w-2xl leading-relaxed">
              Discover hidden gems, travel tips, and inspiring stories from around the world. Your next adventure starts with a single story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="h-full bg-white rounded-[2rem] overflow-hidden shadow-3d-sm hover:shadow-3d transition-all duration-500 flex flex-col border border-primary/5">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-primary shadow-sm flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-accent" />
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-primary/50 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-primary/60 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center text-accent font-bold text-sm gap-2 group/btn">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container px-4 mt-24">
        <div className="relative rounded-[3rem] p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-primary shadow-3d-lg" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Get Travel Inspiration in Your Inbox
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Join 10,000+ travelers and get exclusive deals and travel tips delivered weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-8 py-4 rounded-2xl bg-accent text-white font-bold shadow-press hover:translate-y-0.5 transition-transform">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
