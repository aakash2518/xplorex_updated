import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Trips from "@/components/Trips";
import dynamic from "next/dynamic";
import WhyUs from "@/components/WhyUs";
import BlogPreview from "@/components/BlogPreview";
import Quote from "@/components/Quote";

const HappyCustomers = dynamic(() => import("@/components/HappyCustomers"), {
  loading: () => <div className="h-[90vh] bg-[#fafafa] flex items-center justify-center animate-pulse text-gray-400">Loading stories...</div>
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-64 bg-primary/5 flex items-center justify-center animate-pulse text-primary/40">Loading reviews...</div>
});
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden flex flex-col gap-y-0">
      <Navbar />
      <Hero />
      <Destinations />
      <Trips />
      <WhyUs />
      <HappyCustomers />
      <BlogPreview />
      <Testimonials />
      <Quote />
      <Footer />
    </main>
  );
}
