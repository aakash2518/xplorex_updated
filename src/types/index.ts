export interface Trip {
  title: string;
  duration: string;
  price: string;
  description: string;
  img?: string;
  category?: string;
  type?: string;
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  trips: number;
  from: string;
  img: string;
  intro: string[];
  highlights?: { heading: string; items: string[] }[];
  packages: Trip[];
  region: string;
  featured?: boolean;
  visaInfo?: string;
  bestTime?: string;
  currency?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  image: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export interface EnquiryData {
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  month?: string;
  travelers?: string;
  budget?: string;
  notes?: string;
  subject?: string;
}

export interface SiteSettings {
  companyName: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  whatsapp: string;
  bio: string;
}
