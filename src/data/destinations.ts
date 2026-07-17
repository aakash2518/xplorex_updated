export type Trip = {
  title: string;
  duration: string;
  price: string;
  description: string;
  img?: string;
  category?: string; // Group, Private, Honeymoon, Adventure, etc.
  type?: string; // Regular, Luxury, Budget
};

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  trips: number;
  from: string;
  img: string;
  intro: string[];
  highlights?: { heading: string; items: string[] }[];
  packages: Trip[];
  region: string; // India, International
  tags?: string[];
  featured?: boolean;
  visaInfo?: string;
  flag?: string;
  visaStatus?: string;
  bestTime?: string;
  currency?: string;
};

export const destinations: Destination[] = [
  // International Destinations
  {
    slug: "bali",
    name: "Bali",
    tagline: "Island of Enchantment",
    trips: 4,
    from: "₹28,000",
    img: "/assets/dest-bali.jpg",
    region: "International",
    featured: true,
    visaInfo: "Visa on Arrival available for Indians",
    bestTime: "April to October",
    currency: "Indonesian Rupiah",
    intro: ["Escape to the Island of the Gods with our exclusive Bali Tour Packages."],
    tags: ["Southeast Asia"],
    visaStatus: "Visa on Arrival",
    flag: "🇮🇩",
    packages: [{ title: "Best of Bali Group Tour", duration: "9 Days", price: "₹65,000", description: "Romantic and adventurous escape.", img: "/assets/dest-bali.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "dubai",
    name: "Dubai",
    tagline: "City of Superlatives",
    trips: 5,
    from: "₹38,000",
    img: "/assets/dest-dubai.jpg",
    region: "International",
    featured: true,
    intro: ["Experience luxury shopping and desert safaris."],
    tags: ["Middle East"],
    visaStatus: "E-Visa",
    flag: "🇦🇪",
    packages: [{ title: "Dubai Luxury Experience", duration: "6 Days", price: "₹1,10,000", description: "Premium Dubai tour.", img: "/assets/dest-dubai.jpg", category: "Luxury", type: "Premium" }],
  },
  {
    slug: "thailand",
    name: "Thailand",
    tagline: "Love and Adventure Unite in",
    trips: 4,
    from: "₹32,000",
    img: "/assets/dest-thailand.jpg",
    region: "International",
    featured: true,
    intro: ["Endless white sand beaches and golden temples."],
    tags: ["Southeast Asia"],
    visaStatus: "Visa-Free",
    flag: "🇹🇭",
    packages: [{ title: "Phuket & Krabi Beach Escape", duration: "6 Days", price: "₹32,000", description: "Island hopping tour.", img: "/assets/dest-thailand.jpg", category: "Group", type: "Budget" }],
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    tagline: "Timeless Charm",
    trips: 3,
    from: "₹45,000",
    img: "/assets/dest-vietnam.jpg",
    region: "International",
    featured: true,
    intro: ["Discover the natural beauty and rich history of Vietnam."],
    tags: ["Southeast Asia"],
    visaStatus: "E-Visa",
    flag: "🇻🇳",
    packages: [{ title: "Vietnam Highlights", duration: "7 Days", price: "₹45,000", description: "Hanoi to Ho Chi Minh City.", img: "/assets/dest-vietnam.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "georgia",
    name: "Georgia",
    tagline: "Ancient Paths, Modern Wonders",
    trips: 3,
    from: "₹55,000",
    img: "/assets/dest-georgia.jpg",
    region: "International",
    featured: true,
    visaInfo: "E-visa available for Indians",
    bestTime: "May to October",
    currency: "Georgian Lari",
    intro: ["Explore the crossroads of Europe and Asia."],
    tags: ["Central Asia"],
    visaStatus: "E-Visa",
    flag: "🇬🇪",
    packages: [{ title: "Tbilisi & Beyond", duration: "6 Days", price: "₹55,000", description: "Cultural tour of Georgia.", img: "/assets/dest-georgia.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "sri-lanka",
    name: "Sri Lanka",
    tagline: "Isle of Serenity & Splendor",
    trips: 4,
    from: "₹35,000",
    img: "/assets/dest-srilanka.jpg",
    region: "International",
    featured: true,
    intro: ["Tropical beaches and ancient ruins."],
    tags: ["Asia-Pacific"],
    visaStatus: "E-Visa",
    flag: "🇱🇰",
    packages: [{ title: "Classic Sri Lanka", duration: "8 Days", price: "₹35,000", description: "Complete island tour.", img: "/assets/dest-srilanka.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "japan",
    name: "Japan",
    tagline: "The Land Of The Rising Sun",
    trips: 3,
    from: "₹1,20,000",
    img: "/assets/dest-japan.png",
    region: "International",
    featured: true,
    intro: ["Tradition meets technology in Japan."],
    tags: ["Asia-Pacific"],
    visaStatus: "E-Visa",
    flag: "🇯🇵",
    packages: [{ title: "Tokyo & Kyoto Explorer", duration: "7 Days", price: "₹1,20,000", description: "The best of Japan.", img: "/assets/dest-japan.png", category: "Group", type: "Luxury" }],
  },
  {
    slug: "europe",
    name: "Europe",
    tagline: "The Canvas of Your Dreams",
    trips: 10,
    from: "₹1,50,000",
    img: "/assets/dest-europe.png",
    region: "International",
    featured: true,
    intro: ["From Paris to Rome, explore the heart of Europe."],
    tags: ["Europe"],
    visaStatus: "Schengen Visa",
    flag: "🇪🇺",
    packages: [{ title: "Paris, Swiss & Italy", duration: "10 Days", price: "₹1,85,000", description: "Most popular European combo.", img: "/assets/dest-europe.png", category: "Group", type: "Luxury" }],
  },
  
  // Indian Destinations
  {
    slug: "kashmir",
    name: "Kashmir",
    tagline: "Paradise on Earth",
    trips: 5,
    from: "₹19,000",
    img: "/assets/dest-kashmir.jpg",
    region: "India",
    featured: true,
    intro: ["Experience the breathtaking beauty of Kashmir."],
    tags: ["Himalaya","Mountains"],
    bestTime: "Mar-Oct",
    packages: [{ title: "Srinagar & Gulmarg Special", duration: "6 Days", price: "₹25,000", description: "Complete Kashmir experience.", img: "/assets/trip-kashmir.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    trips: 4,
    from: "₹18,000",
    img: "/assets/dest-kerala.png",
    region: "India",
    featured: true,
    intro: ["Discover Kerala's backwaters and hill stations."],
    tags: ["Beach","Heritage"],
    bestTime: "Sep-Mar",
    packages: [{ title: "Munnar & Alleppey Houseboat", duration: "6 Days", price: "₹23,000", description: "Essential Kerala.", img: "/assets/dest-kerala.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "andaman",
    name: "Andaman",
    tagline: "Emerald Islands",
    trips: 4,
    from: "₹22,000",
    img: "/assets/dest-andaman.png",
    region: "India",
    featured: true,
    intro: ["Pristine beaches and rich marine life."],
    tags: ["Beach","Adventure"],
    bestTime: "Oct-May",
    packages: [{ title: "Havelock & Neil Island", duration: "6 Days", price: "₹33,000", description: "Island hopping tour.", img: "/assets/dest-andaman.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of Kings",
    trips: 5,
    from: "₹20,000",
    img: "/assets/dest-rajasthan.png",
    region: "India",
    featured: true,
    intro: ["Experience royal heritage and palaces."],
    tags: ["Desert","Heritage"],
    bestTime: "Oct-Mar",
    packages: [{ title: "Jaipur, Jodhpur & Udaipur", duration: "8 Days", price: "₹28,000", description: "Royal heritage tour.", img: "/assets/dest-rajasthan.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    tagline: "Dreamy Alpine Escapes",
    trips: 4,
    from: "₹1,95,000",
    img: "/assets/dest-switzerland.png",
    region: "International",
    featured: true,
    intro: ["Experience the beauty of the Swiss Alps."],
    tags: ["Europe"],
    visaStatus: "Schengen Visa",
    flag: "🇨🇭",
    packages: [{ title: "Swiss Alps & Lakes", duration: "7 Days", price: "₹1,95,000", description: "The ultimate Swiss experience.", img: "/assets/dest-switzerland.png", category: "Group", type: "Luxury" }],
  },
  {
    slug: "australia",
    name: "Australia",
    tagline: "Adventure Down Under",
    trips: 5,
    from: "₹2,10,000",
    img: "/assets/dest-australia.png",
    region: "International",
    featured: true,
    intro: ["From the Great Barrier Reef to Sydney."],
    tags: ["Asia-Pacific"],
    visaStatus: "E-Visa",
    flag: "🇦🇺",
    packages: [{ title: "Sydney & Gold Coast", duration: "8 Days", price: "₹2,10,000", description: "Best of Australia.", img: "/assets/dest-australia.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "turkey",
    name: "Turkey",
    tagline: "Stories Carved in Stone",
    trips: 4,
    from: "₹85,000",
    img: "/assets/dest-turkey.png",
    region: "International",
    featured: true,
    intro: ["Explore the rich history and landscapes of Turkey."],
    tags: ["Middle East"],
    visaStatus: "E-Visa",
    flag: "🇹🇷",
    packages: [{ title: "Cappadocia & Istanbul", duration: "7 Days", price: "₹85,000", description: "Magical Turkish journey.", img: "/assets/dest-turkey.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    tagline: "Blend of History & Modernity",
    trips: 3,
    from: "₹45,000",
    img: "/assets/dest-kazakhstan.jpg", // Fallback
    region: "International",
    featured: true,
    intro: ["Discover the wonders of Central Asia."],
    tags: ["Central Asia"],
    visaStatus: "Visa-Free",
    flag: "🇰🇿",
    packages: [{ title: "Almaty City Break", duration: "5 Days", price: "₹45,000", description: "The modern face of Kazakhstan.", img: "/assets/dest-kazakhstan.jpg", category: "Group", type: "Budget" }],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    tagline: "Devbhoomi - Land of Gods",
    trips: 8,
    from: "₹12,000",
    img: "/assets/dest-uttarakhand.jpg",
    region: "India",
    featured: true,
    intro: ["Spiritual and adventurous escapes in the Himalayas."],
    tags: ["Himalaya","Mountains"],
    bestTime: "Mar-Jun",
    packages: [{ title: "Rishikesh & Mussoorie Special", duration: "5 Days", price: "₹15,000", description: "Adventure and peace.", img: "/assets/dest-uttarakhand.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "arunachal-pradesh",
    name: "Arunachal",
    tagline: "The Land of Dawn-lit Mountains",
    trips: 3,
    from: "₹28,000",
    img: "/assets/dest-arunachal.png",
    region: "India",
    featured: false,
    intro: ["Explore the hidden gem of Northeast India."],
    tags: ["Northeast","Mountains"],
    bestTime: "Oct-Apr",
    packages: [{ title: "Tawang & Ziro Valley", duration: "8 Days", price: "₹32,000", description: "Northeast adventure.", img: "/assets/dest-arunachal.png", category: "Adventure", type: "Regular" }],
  },
  {
    slug: "nagaland",
    name: "Nagaland",
    tagline: "Land of Festivals",
    trips: 2,
    from: "₹25,000",
    img: "/assets/dest-nagaland.png",
    region: "India",
    featured: false,
    intro: ["Experience the vibrant culture of Naga tribes."],
    tags: ["Northeast","Heritage"],
    bestTime: "Oct-May",
    packages: [{ title: "Hornbill Festival Tour", duration: "6 Days", price: "₹28,000", description: "Cultural extravaganza.", img: "/assets/dest-nagaland.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    tagline: "Land of Snow",
    trips: 4,
    from: "₹16,000",
    img: "/assets/dest-himachal-new.jpg",
    region: "India",
    featured: true,
    intro: ["Explore scenic hill stations and Himalayas."],
    tags: ["Himalaya","Mountains"],
    bestTime: "Mar-Jun",
    packages: [{ title: "Manali & Shimla Explorer", duration: "7 Days", price: "₹22,000", description: "Popular hill stations.", img: "/assets/dest-himachal-new.jpg", category: "Group", type: "Regular" }],
  },
  {
    slug: "ladakh",
    name: "Ladakh",
    tagline: "The Land of High Passes",
    trips: 6,
    from: "₹25,000",
    img: "/assets/dest-ladakh.png",
    region: "India",
    featured: true,
    intro: ["Discover the stark beauty of the cold desert."],
    tags: ["Himalaya","Desert"],
    bestTime: "May-Sep",
    packages: [{ title: "Leh, Nubra & Pangong", duration: "7 Days", price: "₹28,000", description: "Classic Ladakh itinerary.", img: "/assets/dest-ladakh.png", category: "Adventure", type: "Regular" }],
  },
  {
    slug: "spiti",
    name: "Spiti",
    tagline: "The Middle Land",
    trips: 3,
    from: "₹22,000",
    img: "/assets/dest-spiti.png",
    region: "India",
    featured: true,
    intro: ["Experience the remote beauty of Spiti Valley."],
    tags: ["Himalaya","Desert"],
    bestTime: "May-Oct",
    packages: [{ title: "Spiti Valley Expedition", duration: "9 Days", price: "₹25,000", description: "Epic road trip.", img: "/assets/dest-spiti.png", category: "Adventure", type: "Regular" }],
  },
  {
    slug: "meghalaya",
    name: "Meghalaya",
    tagline: "Abode of Clouds",
    trips: 4,
    from: "₹19,000",
    img: "/assets/dest-meghalaya.png",
    region: "India",
    featured: true,
    intro: ["Lush waterfalls and living root bridges."],
    tags: ["Northeast","Mountains"],
    bestTime: "Oct-Jun",
    packages: [{ title: "Cherrapunji & Shillong", duration: "6 Days", price: "₹22,000", description: "Wettest place on earth.", img: "/assets/dest-meghalaya.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    tagline: "Valley of Rice",
    trips: 4,
    from: "₹20,000",
    img: "/assets/dest-sikkim.png",
    region: "India",
    featured: false,
    intro: ["Buddhist monasteries and mountain views."],
    tags: ["Northeast","Himalaya"],
    bestTime: "Mar-May",
    packages: [{ title: "Gangtok & North Sikkim", duration: "6 Days", price: "₹24,000", description: "Complete Sikkim tour.", img: "/assets/dest-sikkim.png", category: "Group", type: "Regular" }],
  },
  {
    slug: "maldives",
    name: "Maldives",
    tagline: "Tropical Paradise",
    trips: 3,
    from: "₹85,000",
    img: "/assets/dest-maldives.jpg",
    region: "International",
    featured: true,
    intro: ["Crystal clear waters and overwater villas."],
    tags: ["Asia-Pacific"],
    visaStatus: "Visa on Arrival",
    flag: "🇲🇻",
    packages: [{ title: "Overwater Villa Experience", duration: "5 Days", price: "₹1,25,000", description: "Ultimate romance.", img: "/assets/dest-maldives.jpg", category: "Honeymoon", type: "Luxury" }],
  },
  {
    slug: "singapore",
    name: "Singapore",
    tagline: "Lion City",
    trips: 3,
    from: "₹55,000",
    img: "/assets/dest-singapore.jpg",
    region: "International",
    featured: false,
    intro: ["Modern city-state with amazing food."],
    tags: ["Southeast Asia"],
    visaStatus: "E-Visa",
    flag: "🇸🇬",
    packages: [{ title: "Singapore City & Sentosa", duration: "5 Days", price: "₹55,000", description: "Complete city tour.", img: "/assets/dest-singapore.jpg", category: "Group", type: "Regular" }],
  }

];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug.toLowerCase());

// Helper functions for filtering
export const getIndiaDestinations = () => 
  destinations.filter(d => d.region === "India");

export const getInternationalDestinations = () => 
  destinations.filter(d => d.region === "International");

export const getFeaturedDestinations = () => 
  destinations.filter(d => d.featured === true);

export const getGroupTours = () => 
  destinations.flatMap(d => 
    d.packages
      .filter(p => p.category === "Group")
      .map(p => ({ ...p, destination: d.name, destinationSlug: d.slug }))
  );

export const getHoneymoonPackages = () => 
  destinations.flatMap(d => 
    d.packages
      .filter(p => p.category === "Honeymoon")
      .map(p => ({ ...p, destination: d.name, destinationSlug: d.slug }))
  );