import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Destinations from "@/components/Destinations";
import Trips from "@/components/Trips";
import WhyUs from "@/components/WhyUs";
import HappyCustomers from "@/components/HappyCustomers";
import Testimonials from "@/components/Testimonials";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";
import PerformanceMonitor from "@/components/PerformanceMonitor";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <PerformanceMonitor />
      <Navbar />
      <Hero />
      <Destinations />
      <Trips />
      <WhyUs />
      <HappyCustomers />
      <Testimonials />
      <Quote />
      <Footer />
    </main>
  );
}
