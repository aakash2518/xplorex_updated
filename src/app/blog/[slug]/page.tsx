"use client";

import { use, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const post = blogs.find((b) => b.slug === resolvedParams.slug);
  const [activeHeading, setActiveHeading] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [toc, setToc] = useState<{ id: string, text: string }[]>([]);

  useEffect(() => {
    if (post) {
      const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g;
      const matches = [...post.content.matchAll(h3Regex)];
      
      const newToc = matches.map((match, i) => {
        const text = match[1].replace(/<\/?[^>]+(>|$)/g, "");
        const id = `heading-${i}`;
        return { id, text };
      });
      setToc(newToc);
    }
  }, [post]);

  if (!post) {
    notFound();
  }

  let modifiedContent = post.content;
  toc.forEach((item) => {
    // Replace the specific h3 text with one having the id.
    // Note: this simple regex works for the mock data since we know the structure.
    const regex = new RegExp(`<h3>(.*?)(${item.text})(.*?)</h3>`);
    modifiedContent = modifiedContent.replace(
      regex, 
      `<h3 id="${item.id}" class="scroll-mt-32">$1$2$3</h3>`
    );
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />

      <article className="flex-1 pt-24 sm:pt-32 pb-16 sm:pb-24 lg:pb-32 container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group text-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to All Posts
          </Link>
        </div>

        {/* ─── HEADER & HERO ──────────────────────────────────────────────── */}
        <header className="mb-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-extrabold uppercase tracking-widest">
                {post.category}
              </span>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime || 5} Min Read
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-display font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 py-6 border-y border-gray-200">
              <div className="w-14 h-14 rounded-full bg-blue-50 grid place-items-center">
                <User className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <div className="font-extrabold text-gray-900 text-lg">{post.author}</div>
                <div className="text-sm font-bold text-gray-400 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[300px] sm:h-[500px] lg:h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-16 sm:mb-24"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* ─── 2-COLUMN LAYOUT ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 relative">
          
          {/* Main Content (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-3xl prose prose-lg prose-gray 
                       prose-headings:font-display prose-headings:font-black prose-headings:text-gray-900 
                       prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                       prose-p:text-gray-600 prose-p:leading-[1.9] prose-p:font-medium
                       prose-li:text-gray-600 prose-li:font-medium
                       prose-strong:text-gray-900 prose-strong:font-bold
                       prose-a:text-blue-600 prose-a:font-bold hover:prose-a:text-blue-700
                       prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-gray-800"
          >
            {/* Social Share (Mobile) */}
            <div className="flex lg:hidden items-center gap-3 mb-10 pb-8 border-b border-gray-200">
              <span className="text-sm font-bold text-gray-500 mr-2">Share:</span>
              <ShareButton icon={<Facebook className="w-4 h-4" />} />
              <ShareButton icon={<Twitter className="w-4 h-4" />} />
              <ShareButton icon={<Linkedin className="w-4 h-4" />} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />
          </motion.div>

          {/* Sticky Sidebar (Right) */}
          <aside className="w-full lg:w-[320px] xl:w-[350px] flex-shrink-0">
            <div className="sticky top-32 space-y-10">
              
              {/* Table of Contents */}
              {toc.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h4 className="font-black text-gray-900 text-lg mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                    In this Article
                  </h4>
                  <ul className="space-y-4">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`text-sm font-semibold block transition-colors ${
                            activeHeading === item.id ? "text-blue-600 translate-x-1" : "text-gray-500 hover:text-gray-900"
                          } duration-300`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(item.id);
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 100;
                              window.scrollTo({ top: y, behavior: "smooth" });
                              setActiveHeading(item.id);
                            }
                          }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Social Share (Desktop) */}
              <div className="hidden lg:block bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h4 className="font-black text-gray-900 text-lg mb-6 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  Share Post
                </h4>
                <div className="flex gap-3">
                  <ShareButton icon={<Facebook className="w-5 h-5" />} />
                  <ShareButton icon={<Twitter className="w-5 h-5" />} />
                  <ShareButton icon={<Linkedin className="w-5 h-5" />} />
                </div>
              </div>
              
              {/* Related/Trending Widget */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />
                <h4 className="font-black text-xl mb-3 relative z-10">Ready to Travel?</h4>
                <p className="text-blue-100 font-medium text-sm mb-6 leading-relaxed relative z-10">
                  Turn these stories into reality. Explore our curated packages for your next big adventure.
                </p>
                <Link
                  href="/international-trips"
                  className="block w-full bg-white text-blue-900 text-center py-3.5 rounded-full font-extrabold hover:bg-gray-50 transition-colors shadow-lg relative z-10"
                >
                  Explore Packages
                </Link>
              </div>

            </div>
          </aside>

        </div>
      </article>
      <Footer />
    </main>
  );
}

function ShareButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-gray-100">
      {icon}
    </button>
  );
}
