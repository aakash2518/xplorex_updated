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
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1/WhatsApp_Video_2026-07-12_at_01.35.48.mp4",
    alt: "Customer review 1",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241575/WhatsApp_Video_2026-07-12_at_01.35.09.mp4",
    alt: "Customer review 2",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241583/WhatsApp_Video_2026-05-03_at_3.50.14_PM.mp4",
    alt: "Customer review 3",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241586/WhatsApp_Video_2026-07-12_at_01.35.08.mp4",
    alt: "Customer review 4",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241592/WhatsApp_Video_2026-05-03_at_3.50.14_PM_2.mp4",
    alt: "Customer review 5",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241596/WhatsApp_Video_2026-05-03_at_3.50.14_PM_3.mp4",
    alt: "Customer review 6",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241600/WhatsApp_Video_2026-05-03_at_3.50.13_PM.mp4",
    alt: "Customer review 7",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241610/WhatsApp_Video_2026-05-03_at_3.50.13_PM_2.mp4",
    alt: "Customer review 8",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dwhphisiq/video/upload/f_auto,q_auto/v1787241667/WhatsApp_Video_2026-05-03_at_3.44.41_PM.mp4",
    alt: "Customer review 9",
    size: "w-full h-full", position: "", floatClass: "", rotate: 0
  }
];

