import Globe2 from "lucide-react/dist/esm/icons/globe-2";
import BadgeIndianRupee from "lucide-react/dist/esm/icons/badge-indian-rupee";
import HeadphonesIcon from "lucide-react/dist/esm/icons/headphones";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";

export const CONTACT_INFO = {
  phone: "8447706518",
  whatsapp: "918447706518",
  email: "info@xplorex.in",
  salesEmail: "sales@xplorex.in",
  address: "B-2/11, Block B, Block E, Mohan Cooperative Industrial Estate, Badarpur, New Delhi, Delhi 110044",
  mapsLink: "https://maps.app.goo.gl/vHcJZFenrm6SFYXg8",
  social: {
    instagram: "https://www.instagram.com/xplorex.in",
    facebook: "https://www.facebook.com/share/18fWFUevja/?mibextid=wwXIfr",
  },
};

export const FORM_OPTIONS = {
  destinations: [
    "Bali", "Dubai", "Thailand", "Maldives", "Singapore", "Vietnam",
    "Georgia", "Sri Lanka", "Japan", "Europe", "Switzerland", "Australia",
    "Turkey", "Kazakhstan",
    "Kashmir", "Kerala", "Andaman", "Rajasthan", "Himachal Pradesh",
    "Uttarakhand", "Ladakh", "Spiti", "Meghalaya", "Sikkim",
  ],
  months: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  travelers: ["1 Person", "2 People", "3-4 People", "5-8 People", "9+ People"],
  budgets: ["₹19k - ₹50k", "₹50k - ₹1L", "₹1L - ₹2L", "₹2L+"],
  travelersSimple: ["1", "2", "3", "4", "5+"],
};

export const HOME_STATS = [
  { v: "12+",  l: "Countries" },
  { v: "10K+", l: "Happy Travelers" },
  { v: "24/7", l: "Support" },
];

export const CORE_VALUES = [
  {
    icon: Globe2,
    title: "Global Proficiency",
    desc: "Navigate destinations with confidence, benefiting from deep cultural understanding and meticulous logistical planning across 12+ countries.",
    color: "from-primary to-accent",
  },
  {
    icon: BadgeIndianRupee,
    title: "Unbeatable Prices",
    desc: "Affordability without compromising on quality. From ₹19,000 onward, your dream destinations made convenient.",
    color: "from-accent to-primary",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Care",
    desc: "Seamless travel planning with full-time customer service. Our dedicated team supports you at every step of the journey.",
    color: "from-primary to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Verified",
    desc: "Industry-leading safety standards, verified partners, and transparent quotations — no hidden surprises.",
    color: "from-indigo-500 to-primary",
  },
];

export interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
  size: string;
  position: string;
  floatClass: string;
  rotate: number;
}

export const HAPPY_CUSTOMERS_MEDIA: MediaItem[] = [
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.44.39 PM (1).jpeg",
    alt: "Happy customer 1",
    size: "w-32 h-40 md:w-48 md:h-60",
    position: "top-[5%] left-[5%] md:top-[10%] md:left-[8%]",
    floatClass: "float-css-0",
    rotate: -5
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.44.39 PM.jpeg",
    alt: "Happy customer 2",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "top-[25%] left-[15%] md:top-[15%] md:left-[22%]",
    floatClass: "float-css-1",
    rotate: 3
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-07-12 at 01.35.48.mp4",
    alt: "Customer video 1",
    size: "w-36 h-48 md:w-56 md:h-72",
    position: "top-[10%] left-[45%] md:top-[8%] md:left-[35%]",
    floatClass: "float-css-2",
    rotate: -2
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM (1).jpeg",
    alt: "Happy customer 3",
    size: "w-32 h-40 md:w-44 md:h-56",
    position: "top-[5%] right-[25%] md:top-[12%] md:right-[30%]",
    floatClass: "float-css-3",
    rotate: 4
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-07-12 at 01.35.08.mp4",
    alt: "Customer video 2",
    size: "w-40 h-52 md:w-60 md:h-80",
    position: "top-[15%] right-[5%] md:top-[15%] md:right-[10%]",
    floatClass: "float-css-4",
    rotate: -4
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM (2).jpeg",
    alt: "Happy customer 4",
    size: "w-24 h-32 md:w-36 md:h-48",
    position: "bottom-[15%] left-[5%] md:bottom-[20%] md:left-[12%]",
    floatClass: "float-css-5",
    rotate: 6
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-07-12 at 01.35.09.mp4",
    alt: "Customer video 3",
    size: "w-32 h-44 md:w-48 md:h-64",
    position: "bottom-[25%] right-[8%] md:bottom-[30%] md:right-[15%]",
    floatClass: "float-css-6",
    rotate: -3
  },
  {
    type: "image",
    src: "/reviews/WhatsApp Image 2026-05-03 at 3.51.27 PM.jpeg",
    alt: "Happy customer 5",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "bottom-[40%] left-[2%] md:top-[45%] md:left-[5%]",
    floatClass: "float-css-7",
    rotate: -2
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.50.13 PM (1).mp4",
    alt: "Customer video 4",
    size: "w-24 h-32 md:w-32 md:h-44",
    position: "bottom-[5%] left-[30%] md:bottom-[10%] md:left-[25%]",
    floatClass: "float-css-8",
    rotate: 5
  },
  {
    type: "video",
    src: "/reviews/WhatsApp Video 2026-05-03 at 3.50.13 PM (2).mp4",
    alt: "Customer video 5",
    size: "w-28 h-36 md:w-40 md:h-52",
    position: "bottom-[5%] right-[30%] md:bottom-[8%] md:right-[35%]",
    floatClass: "float-css-9",
    rotate: -5
  }
];
