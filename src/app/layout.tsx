/* eslint-disable react-refresh/only-export-components */
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import ClientDynamics from "@/components/ClientDynamics";

// Load fonts via next/font — zero layout shift, self-hosted automatically
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xplorex – India & International Trip Packages",
  description:
    "Hand-crafted journeys across 12+ countries. From Kashmir to Maldives, Dubai to Kerala — your premium travel partner starting ₹19,000.",
  keywords:
    "travel packages, india trips, international trips, Kashmir, Kerala, Andaman, Dubai, Maldives, travel agency, tour packages",
  authors: [{ name: "Xplorex" }],
  creator: "Xplorex",
  metadataBase: new URL("https://xplorex.com"),
  openGraph: {
    title: "Xplorex – India & International Trip Packages",
    description: "Hand-crafted journeys across 12+ countries.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xplorex – India & International Trip Packages",
    description: "Hand-crafted journeys across 12+ countries.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e1b6e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${jakarta.variable} ${grotesk.variable} ${caveat.variable}`}
    >
      <head>
        {/* Preload above-the-fold hero image for best LCP */}
        <link rel="preload" as="image" href="/assets/hero-travel.jpg" fetchPriority="high" />
      </head>
      <body className="bg-background min-h-screen antialiased">
        <Providers>
          <ClientDynamics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
