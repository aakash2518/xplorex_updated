import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RegionShowcase from "@/components/RegionShowcase";
import { destinations } from "@/data/destinations";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/Skeleton";

const WhyUs = dynamic(() => import("@/components/WhyUs"));

const HappyCustomers = dynamic(() => import("@/components/HappyCustomers"), {
  loading: () => <div className="h-[90vh] bg-background flex flex-col items-center justify-center p-8 gap-4"><Skeleton className="w-full max-w-4xl h-[60vh] rounded-[3rem]" /></div>
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-96 bg-primary/5 flex items-center justify-center p-8"><Skeleton className="w-full max-w-5xl h-64 rounded-3xl" /></div>
});

const Trips = dynamic(() => import("@/components/Trips"));
const BlogPreview = dynamic(() => import("@/components/BlogPreview"));
const JourneyInFrames = dynamic(() => import("@/components/JourneyInFrames"));
const Quote = dynamic(() => import("@/components/Quote"));
const Footer = dynamic(() => import("@/components/Footer"));
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const indiaDestinations = destinations.filter(d => d.region === "India").slice(0, 15);
  const intlDestinations = destinations.filter(d => d.region === "International").slice(0, 15);

  return (
    <main className="overflow-x-hidden flex flex-col gap-y-0">
      <Navbar />
      <Hero />
      
      <RegionShowcase
        regionName="India Trips"
        subtitle="A Journey Through Time, Colour And Culture"
        bgMedia="/assets/india-bg.mp4"
        exploreLink="/india-trips"
        destinations={indiaDestinations}
      />
      
      <RegionShowcase
        regionName="International Trips"
        subtitle="Discover the world, one destination at a time"
        bgMedia="/assets/intl-bg.mp4"
        exploreLink="/international-trips"
        destinations={intlDestinations}
      />

      <Trips />
      <WhyUs />
      <HappyCustomers />
      <BlogPreview />
      <JourneyInFrames />
      <Testimonials />
      <Quote />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
