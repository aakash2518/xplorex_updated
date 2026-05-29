"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/data/blogs";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export default function BlogPreview() {
  // Take only the latest 3 blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-white/30">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Latest from <span className="text-gradient">Our Blog</span>
            </h2>
            <p className="text-primary/60 text-lg max-w-xl">
              Tips, guides, and inspiration for your next dream vacation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors"
            >
              View All Stories
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 shadow-3d-sm group-hover:shadow-3d transition-all duration-500">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-primary uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-primary/40 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
