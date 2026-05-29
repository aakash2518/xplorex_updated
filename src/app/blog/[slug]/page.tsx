"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { Calendar, User, ArrowLeft, Tag, Share2, MessageCircle } from "lucide-react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogs.find((b) => b.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32">
      <article className="container px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary/60 hover:text-accent font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Stories
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <div className="h-px w-8 bg-primary/10" />
                <div className="flex items-center gap-4 text-xs text-primary/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-8 leading-[1.1]">
                {post.title}
              </h1>

              <div className="flex items-center justify-between py-6 border-y border-primary/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 grid place-items-center">
                    <User className="w-6 h-6 text-primary/40" />
                  </div>
                  <div>
                    <div className="font-bold text-primary">{post.author}</div>
                    <div className="text-xs text-primary/50">Travel Expert at Xplorex</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-primary/5 grid place-items-center text-primary/60 hover:bg-primary hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-primary/5 grid place-items-center text-primary/60 hover:bg-primary hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[500px] rounded-[3rem] overflow-hidden shadow-3d-lg mb-20"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg prose-primary max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-primary/70 prose-li:text-primary/70 prose-strong:text-primary"
          >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Footer */}
          <footer className="mt-24 pt-12 border-t border-primary/10">
            <div className="bg-primary/5 rounded-[2.5rem] p-8 sm:p-12 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Inspired by this story?</h3>
              <p className="text-primary/60 mb-8 max-w-md mx-auto">
                Let us help you plan a similar journey. Our experts are ready to craft your perfect itinerary.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-2xl bg-primary text-white font-bold shadow-press hover:translate-y-0.5 transition-transform w-full sm:w-auto"
                >
                  Plan Your Trip
                </Link>
                <Link
                  href="/india-trips"
                  className="px-8 py-4 rounded-2xl bg-white text-primary border border-primary/10 font-bold hover:bg-primary/5 transition-colors w-full sm:w-auto"
                >
                  Browse Packages
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
