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
    intro: [
      "Escape to the Island of the Gods with our exclusive Bali Tour Packages.",
      "Experience a perfect blend of rich culture, stunning natural landscapes, and vibrant nightlife. From the spiritual tranquility of Ubud's terraced rice paddies to the bustling shores of Seminyak and Kuta, Bali offers an unforgettable retreat.",
      "Indulge in traditional Balinese spa treatments, explore ancient oceanfront temples like Uluwatu, and savor world-class dining as you discover why this Indonesian paradise is a favorite for travelers worldwide."
    ],
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
    intro: [
      "Experience luxury shopping, futuristic architecture, and thrilling desert safaris.",
      "Dubai is a city of superlatives where you can stand atop the Burj Khalifa, the world's tallest building, and shop in mega-malls that feature indoor ski slopes and massive aquariums.",
      "Beyond the glitz and glamour, immerse yourself in the rich Arabian culture by exploring the traditional gold and spice souks, or embark on a mesmerizing desert safari complete with dune bashing and starlit dinners."
    ],
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
    intro: [
      "Endless white sand beaches, golden temples, and vibrant street life await you.",
      "From the bustling, energetic streets of Bangkok to the serene, crystal-clear waters of Phuket and Krabi, Thailand is a destination that promises both adventure and relaxation.",
      "Relish the world-renowned Thai cuisine, explore ancient ruins and ornate Buddhist temples, and experience the warm hospitality that earns Thailand its nickname as the 'Land of Smiles'."
    ],
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
    intro: [
      "Discover the natural beauty, rich history, and exquisite culinary heritage of Vietnam.",
      "Cruise through the emerald waters and towering limestone pillars of Halong Bay, or wander the lantern-lit streets of ancient Hoi An.",
      "Vietnam offers a captivating journey through time, blending its tumultuous history with breathtaking landscapes, bustling city streets in Ho Chi Minh, and the tranquil charm of the Mekong Delta."
    ],
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
    intro: [
      "Explore the crossroads of Europe and Asia, where ancient paths meet modern wonders.",
      "Nestled in the Caucasus Mountains, Georgia boasts a rich heritage, ancient monasteries perched on dramatic cliffs, and a uniquely welcoming culture.",
      "Wander through the cobblestone streets of Tbilisi, taste some of the world's oldest and finest wines in the Kakheti region, and hike the stunning landscapes of Kazbegi for an adventure like no other."
    ],
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
    intro: [
      "Tropical beaches, ancient ruins, and rolling tea plantations await in this island paradise.",
      "Sri Lanka is a tear-drop shaped island boasting incredible biodiversity, from elephants roaming in Minneriya National Park to the elusive leopards of Yala.",
      "Climb the iconic Sigiriya Rock Fortress, relax on the golden shores of Mirissa, and take one of the most scenic train rides in the world through the misty hills of Ella."
    ],
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
    intro: [
      "Tradition meets futuristic technology in the Land of the Rising Sun.",
      "Immerse yourself in a world where ancient Shinto shrines and serene Zen gardens coexist peacefully alongside neon-lit skyscrapers and bullet trains.",
      "Whether you are experiencing the delicate beauty of cherry blossoms in Kyoto, savoring authentic sushi in Tokyo, or relaxing in a natural hot spring (onsen) in the snowy mountains, Japan promises a truly unique journey."
    ],
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
    intro: [
      "From Paris to Rome, explore the heart of Europe's rich history and diverse cultures.",
      "Embark on a grand tour across multiple countries, experiencing iconic landmarks like the Eiffel Tower, the Colosseum, and the Swiss Alps.",
      "Indulge in diverse culinary traditions, wander through world-class museums, and travel seamlessly across borders to uncover the romance, art, and architecture that define the European continent."
    ],
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
    intro: [
      "Experience the breathtaking beauty of Kashmir, often called Heaven on Earth.",
      "Glide across the serene waters of Dal Lake in a traditional shikara, surrounded by snow-capped Himalayan peaks and vibrant floating gardens.",
      "Whether you are skiing down the pristine slopes of Gulmarg, exploring the lush valleys of Pahalgam, or simply enjoying a warm cup of Kahwa, Kashmir offers an enchanting and peaceful escape."
    ],
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
    intro: [
      "Discover Kerala's tranquil backwaters, lush hill stations, and rich cultural heritage.",
      "Cruise on traditional houseboats through the serene backwaters of Alleppey, lined with swaying palm trees and quaint villages.",
      "Relax on the pristine beaches of Kovalam, breathe in the aroma of spices and tea in the misty hills of Munnar, and rejuvenate your mind and body with authentic Ayurvedic treatments."
    ],
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
    intro: [
      "Pristine beaches, crystal-clear waters, and rich marine life define the Emerald Islands.",
      "Dive into an underwater wonderland with world-class scuba diving and snorkeling in Havelock and Neil Islands, home to vibrant coral reefs.",
      "Relax on the powdery white sands of Radhanagar Beach, often ranked among the best in Asia, and explore the dense tropical forests and historical sites of Port Blair."
    ],
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
    intro: [
      "Experience royal heritage, majestic palaces, and the vibrant culture of the Land of Kings.",
      "Wander through the majestic forts of Jaipur, witness the blue-washed houses of Jodhpur, and take a romantic boat ride on the lakes of Udaipur.",
      "Rajasthan offers a glimpse into a glorious past, complete with desert safaris in Jaisalmer, colorful traditional folk dances, and stays in incredibly restored heritage palaces."
    ],
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
    intro: [
      "Experience the unparalleled beauty of the Swiss Alps and pristine mountain lakes.",
      "Ride world-famous panoramic trains like the Glacier Express through breathtaking alpine scenery, passing charming chalets and dramatic peaks.",
      "Whether you're skiing in Zermatt beneath the iconic Matterhorn, enjoying decadent Swiss chocolate, or cruising on Lake Lucerne, Switzerland is a flawless year-round destination."
    ],
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
    intro: [
      "From the Great Barrier Reef to the Sydney Opera House, embark on an adventure Down Under.",
      "Explore a vast, diverse continent offering everything from ancient rainforests and the rugged Outback to vibrant, cosmopolitan coastal cities.",
      "Snorkel among vibrant marine life, meet unique wildlife like kangaroos and koalas, and drive along the stunning Great Ocean Road for the ultimate road trip."
    ],
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
    intro: [
      "Explore the rich history, diverse landscapes, and vibrant culture where East meets West.",
      "Wander through the historic streets of Istanbul, marveling at the Hagia Sophia and the bustling Grand Bazaar.",
      "Experience the otherworldly landscapes of Cappadocia from a hot air balloon, relax in the thermal pools of Pamukkale, and explore ancient ruins along the stunning Turquoise Coast."
    ],
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
    intro: [
      "Discover the untouched wonders and nomadic heritage of Central Asia.",
      "Kazakhstan contrasts the futuristic architecture of Astana with the stunning natural beauty of the Tian Shan mountains and vast steppes.",
      "Hike the breathtaking Charyn Canyon, visit the stunning alpine lakes like Kaindy and Kolsai, and experience the warm hospitality of this rapidly emerging destination."
    ],
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
    intro: [
      "Spiritual awakenings and thrilling adventures await in the Devbhoomi, the Land of Gods.",
      "Experience the holy atmosphere of Rishikesh along the banks of the Ganges, often regarded as the yoga capital of the world.",
      "Trek through the stunning Valley of Flowers, enjoy the colonial charm of Mussoorie and Nainital, and embark on spiritual pilgrimages surrounded by the majestic Himalayas."
    ],
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
    intro: [
      "Explore the hidden gem of Northeast India, the Land of Dawn-lit Mountains.",
      "Discover remote Buddhist monasteries perched on high ridges in Tawang and experience the unique tribal cultures in the verdant Ziro Valley.",
      "Unspoiled and adventurous, Arunachal Pradesh offers pristine lakes, high mountain passes, and dense forests perfect for off-the-beaten-path exploration."
    ],
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
    intro: [
      "Experience the vibrant culture and fierce heritage of the diverse Naga tribes.",
      "Famous for the annual Hornbill Festival, Nagaland showcases a colorful tapestry of traditional dances, crafts, and indigenous cuisine.",
      "Trek the picturesque Dzukou Valley, known for its rolling green hills and seasonal flowers, and immerse yourself in the unspoiled, raw beauty of Northeast India."
    ],
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
    intro: [
      "Explore scenic hill stations, lush valleys, and the towering peaks of the Himalayas.",
      "From the adventure hub of Manali to the colonial elegance of Shimla and the spiritual serenity of Dharamshala, Himachal offers something for every traveler.",
      "Engage in thrilling activities like paragliding in Bir Billing, trekking through the Parvati Valley, or simply relaxing in cozy cafes with mountain views."
    ],
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
    intro: [
      "Discover the stark, moon-like beauty of this cold mountain desert.",
      "Drive across some of the highest motorable passes in the world and find peace in ancient Tibetan Buddhist monasteries perched on rocky cliffs.",
      "Marvel at the shifting colors of Pangong Lake, explore the unique double-humped camels in Nubra Valley, and experience the thrill of a Himalayan road trip."
    ],
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
    intro: [
      "Experience the remote, rugged beauty of the Middle Land nestled in the Himalayas.",
      "Often compared to a 'little Tibet', Spiti Valley is defined by its barren landscapes, winding roads, and ancient cliffside monasteries like Key Gompa.",
      "Perfect for adventure seekers, this pristine valley offers a raw, unfiltered connection with nature, far away from the bustle of modern life."
    ],
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
    intro: [
      "Discover the lush waterfalls, living root bridges, and mystical caves of the Abode of Clouds.",
      "Trek through dense tropical forests to witness incredible bio-engineering feats like the double-decker living root bridge in Nongriat.",
      "Experience the pristine beauty of the crystal-clear Umngot River in Dawki and marvel at the majestic Nohkalikai Falls in Cherrapunji, one of the wettest places on earth."
    ],
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
    intro: [
      "Explore vibrant Buddhist monasteries, alpine lakes, and stunning views of the Himalayas.",
      "Wake up to the breathtaking sight of Mount Kanchenjunga and drive to the high-altitude glacial waters of Tsomgo Lake.",
      "Sikkim perfectly blends nature and spirituality, offering peaceful retreats, vibrant prayer flags fluttering in the mountain breeze, and thrilling trekking routes in the North."
    ],
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
    intro: [
      "Crystal clear turquoise waters, pristine coral reefs, and luxurious overwater villas.",
      "Experience the ultimate tropical escape on private island resorts surrounded by the vibrant marine life of the Indian Ocean.",
      "Perfect for romance or relaxation, the Maldives offers world-class snorkeling, sunset dolphin cruises, and barefoot luxury in a true island paradise."
    ],
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
    intro: [
      "A modern city-state blending futuristic architecture with rich multicultural heritage.",
      "Marvel at the iconic Supertrees in Gardens by the Bay, ride the thrilling attractions at Universal Studios Sentosa, and shop along the famous Orchard Road.",
      "Singapore is a food lover's paradise, offering everything from Michelin-starred restaurants to vibrant hawker centers serving incredible local delicacies."
    ],
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