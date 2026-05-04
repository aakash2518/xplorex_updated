"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const mediaItems = [
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.44.39 PM (1).jpeg",
    alt: "Happy customer 1",
    size: "w-32 h-40 md:w-48 md:h-60",
    position: "top-[5%] left-[5%] md:top-[10%] md:left-[8%]",
    delay: 0,
    rotate: -5
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.44.39 PM.jpeg",
    alt: "Happy customer 2",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "top-[25%] left-[15%] md:top-[15%] md:left-[22%]",
    delay: 0.2,
    rotate: 3
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.43.19 PM.mp4",
    alt: "Customer video 1",
    size: "w-36 h-48 md:w-56 md:h-72",
    position: "top-[10%] left-[45%] md:top-[8%] md:left-[35%]",
    delay: 0.4,
    rotate: -2
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM (1).jpeg",
    alt: "Happy customer 3",
    size: "w-32 h-40 md:w-44 md:h-56",
    position: "top-[5%] right-[25%] md:top-[12%] md:right-[30%]",
    delay: 0.1,
    rotate: 4
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.44.41 PM.mp4",
    alt: "Customer video 2",
    size: "w-40 h-52 md:w-60 md:h-80",
    position: "top-[15%] right-[5%] md:top-[15%] md:right-[10%]",
    delay: 0.3,
    rotate: -4
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM (2).jpeg",
    alt: "Happy customer 4",
    size: "w-24 h-32 md:w-36 md:h-48",
    position: "bottom-[15%] left-[5%] md:bottom-[20%] md:left-[12%]",
    delay: 0.5,
    rotate: 6
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.45.21 PM.mp4",
    alt: "Customer video 3",
    size: "w-32 h-44 md:w-48 md:h-64",
    position: "bottom-[25%] right-[8%] md:bottom-[30%] md:right-[15%]",
    delay: 0.25,
    rotate: -3
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM.jpeg",
    alt: "Happy customer 5",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "bottom-[40%] left-[2%] md:top-[45%] md:left-[5%]",
    delay: 0.15,
    rotate: -2
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.50.13 PM (1).mp4",
    alt: "Customer video 4",
    size: "w-24 h-32 md:w-32 md:h-44",
    position: "bottom-[5%] left-[30%] md:bottom-[10%] md:left-[25%]",
    delay: 0.45,
    rotate: 5
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.50.13 PM (2).mp4",
    alt: "Customer video 5",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "bottom-[5%] right-[30%] md:bottom-[8%] md:right-[35%]",
    delay: 0.35,
    rotate: -5
  }
];

const MediaCard = ({ item }: { item: typeof mediaItems[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        y: [0, -15, 0],
        rotate: [item.rotate, item.rotate + 1, item.rotate]
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "linear",
        delay: item.delay
      }}
      className={`absolute ${item.position} ${item.size} z-10 will-change-transform`}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/5 group hover:scale-105 transition-transform duration-500 hover:z-50 transform-gpu">
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover pointer-events-none"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover pointer-events-none transform-gpu"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />
        )}
        
        {/* Subtle Overlay - reduced blur for performance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      {/* Decorative Glow - simplified for performance */}
      <div className="absolute inset-0 rounded-2xl bg-purple-500/5 blur-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

const HappyCustomers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] md:min-h-[120vh] py-24 overflow-hidden bg-[#fafafa]"
      id="testimonials"
    >
      {/* Dynamic Background Gradients - Simplified for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[80px]" />
      </div>

      {/* Floating Media Grid */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {mediaItems.map((item, index) => (
          <MediaCard key={index} item={item} />
        ))}
      </div>

      {/* Central Content */}
      <div className="container relative z-20 h-full flex flex-col items-center justify-center pt-[30%] md:pt-[25%] pointer-events-none">
        <motion.div 
          style={{ y: titleY, opacity }}
          className="text-center max-w-3xl mx-auto px-4 pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm mb-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-purple-400 to-blue-400" />
              ))}
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by 10,000+ Travelers
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900"
          >
            Real Stories from <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600">
              Our Community
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Join thousands of explorers who have discovered the world's most breathtaking 
            destinations with Xplorex. Your next adventure starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a 
              href="https://www.holidify.com/travel-agent-details/xplorex-54500/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-black/20 flex items-center gap-2 group pointer-events-auto"
            >
              Read Success Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-2 px-6 py-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-900">4.9/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Subtle Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default HappyCustomers;