"use client";

import { motion } from "framer-motion";
import { Globe2, BadgeIndianRupee, HeadphonesIcon, ShieldCheck } from "lucide-react";

const features = [
  { icon: Globe2,           title: "International Proficiency", desc: "Navigate destinations with confidence, benefiting from deep cultural understanding and meticulous logistical planning across 12+ countries." },
  { icon: ShieldCheck,      title: "Trusted & Verified",        desc: "Industry-leading safety standards, verified partners, and transparent quotations — no hidden surprises." },
  { icon: HeadphonesIcon,   title: "24/7 Customer Care",        desc: "Seamless travel planning with full-time customer service. Our dedicated team supports you at every step of the journey." },
  { icon: BadgeIndianRupee, title: "Unbeatable Prices",         desc: "Affordability without compromising on quality. From ₹19,000 onward, your dream destinations made convenient." },
];

const WhyUs = () => (
  <section id="why" className="py-16 sm:py-24 relative bg-background overflow-hidden">
    <div className="w-[96%] max-w-[1800px] mx-auto relative z-10 px-4 sm:px-8">
      
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">
          Why Xplorex?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-[#00bcd4]/30 shadow-sm hover:shadow-xl transition-all duration-300 min-h-[400px] flex flex-col justify-between overflow-hidden"
          >
            {/* Decorative background curve */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-[40%] left-0 w-full h-[60%] fill-none stroke-[#00bcd4] stroke-[0.5] opacity-50">
                 <path d="M 0,100 C 50,50 150,150 200,100" />
               </svg>
               <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#e0f7fa] to-transparent opacity-40 rounded-b-2xl" />
            </div>

            {/* Content Top */}
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#00bcd4] mb-4 leading-tight">{f.title}</h3>
              <p className="text-base text-primary/75 leading-relaxed font-medium">{f.desc}</p>
            </div>

            {/* Icon Bottom */}
            <div className="relative z-10 mt-8 self-center">
               <div className="w-[6rem] h-[6rem] flex items-center justify-center bg-white rounded-full">
                 <f.icon className="w-16 h-16 text-[#00bcd4]" strokeWidth={1.2} />
               </div>
               
               {/* Decorative dots */}
               <div className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-80" />
               <div className="absolute top-1/2 -left-5 w-2 h-2 rounded-full bg-orange-400 opacity-80" />
               <div className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-red-400 opacity-80" />
               <div className="absolute -bottom-2 -left-1 w-1.5 h-1.5 rounded-full bg-[#00bcd4] opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default WhyUs;
