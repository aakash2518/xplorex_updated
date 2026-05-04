"use client";

import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Tanya Jaggia",
    trip: "International Tour · 12 Days",
    text: "I recently booked a 12-day package with Xplorex, and the entire experience was absolutely amazing! Everything was organized perfectly from the flights to the accommodation. Highly recommended for anyone planning a hassle-free holiday!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    trip: "Dubai · 6 Days",
    text: "We arranged our recent Dubai trip through Xplorex and they made our trip a memorable one. Entire trip was very well organized with personalized services. Will highly recommend Xplorex to our relatives and friends.",
    rating: 5,
  },
  {
    name: "Tanushri Rakshaskar",
    trip: "Southeast Asia · 15 Days",
    text: "Overall, it was an amazing experience. Pooja from Xplorex was available 24/7. She gave us an option to modify the itinerary according to our preferences. You can definitely book your next vacation from Xplorex!",
    rating: 5,
  },
  {
    name: "Lalit Sharma",
    trip: "Dubai · 5 Days",
    text: "Pooja Bhat, one of the knowledgeable and sincere travel planners, given her best advice and support throughout. Kept transparency throughout the process. Very satisfied with the service provided.",
    rating: 5,
  },
  {
    name: "Nidhi Tuteja",
    trip: "Kodaikanal · 4 Days",
    text: "Amazing experience with team Xplorex! Went to Kodaikanal and had a blast! Everything was handled smoothly and we could just enjoy our vacation without any worries.",
    rating: 5,
  },
];

// Duplicate for seamless loop
const loop = [...reviews, ...reviews];

const Testimonials = () => (
  <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
    {/* Heading */}
    <div className="container mb-10 sm:mb-14 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 shadow-3d-sm">
          Travel Stories
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-primary">
          Loved by <span className="text-gradient">10,000+ travelers</span>
        </h2>
        <p className="text-primary/55 font-medium text-sm sm:text-base">
          Real reviews from our satisfied explorers on Holidify &amp; Google
        </p>
      </div>
    </div>

    {/* Marquee track */}
    <div className="relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrolling row — pure CSS, no JS */}
      <div className="flex gap-4 sm:gap-6 marquee w-max">
        {loop.map((r, i) => (
          <div
            key={i}
            className="w-[300px] sm:w-[340px] shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-3d border border-primary/5 hover:-translate-y-1.5 transition-transform duration-300"
          >
            <Quote className="w-7 h-7 text-primary/10 mb-3" />
            <div className="flex gap-0.5 mb-3">
              {[...Array(r.rating)].map((_, j) => (
                <span key={j} className="text-yellow-500 text-base">★</span>
              ))}
            </div>
            <p className="text-primary/75 font-medium leading-relaxed mb-4 italic text-sm line-clamp-4">
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-primary/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-white font-bold text-sm shadow-glow flex-shrink-0">
                {r.name[0]}
              </div>
              <div>
                <div className="font-bold text-sm text-primary">{r.name}</div>
                <div className="text-xs text-primary/40 font-semibold">{r.trip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
