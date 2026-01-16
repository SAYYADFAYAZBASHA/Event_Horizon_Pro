export interface Event {
  id: string;
  name: string;
  date: string;
  category: "Marriage" | "Birthday" | "Corporate" | "Engagement" | "Anniversary" | "Baby Shower";
  location: string;
  description: string;
  coverImage: string;
  fullDescription: string;
  budget: {
    venue: number;
    decoration: number;
    catering: number;
    photography: number;
    miscellaneous: number;
  };
  products: Product[];
  decorationLayouts: DecorationLayout[];
  timeline: TimelineItem[];
  testimonials: Testimonial[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: "Flowers" | "Lights" | "Food" | "Decoration" | "Stage" | "Seating";
}

export interface DecorationLayout {
  id: string;
  title: string;
  description: string;
  image: string;
  type: "Stage" | "Entrance" | "Lighting" | "Centerpiece" | "Theme";
}

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  eventType: string;
}

// Base event templates for generating more events
const eventTemplates = {
  Marriage: [
    { name: "Royal Garden Wedding", location: "The Grand Palace, Mumbai", coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
    { name: "Beach Wedding Bliss", location: "Seaside Resort, Goa", coverImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" },
    { name: "Palace Wedding Celebration", location: "Royal Heritage Palace, Jaipur", coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" },
    { name: "Destination Wedding Dreams", location: "Mountain View Resort, Shimla", coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" },
    { name: "Classic Elegance Wedding", location: "Grand Ballroom, Chennai", coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80" },
    { name: "Rustic Vineyard Wedding", location: "Wine Estate, Nashik", coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
    { name: "Traditional Temple Wedding", location: "Sacred Temple, Varanasi", coverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" },
    { name: "Modern Minimalist Wedding", location: "Art Gallery, Bangalore", coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" },
  ],
  Birthday: [
    { name: "Enchanted Birthday Bash", location: "Sky Lounge, Bangalore", coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80" },
    { name: "Vintage Theme Birthday", location: "The Gatsby Club, Goa", coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" },
    { name: "Kids Wonderland Party", location: "Fantasy Land, Delhi", coverImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80" },
    { name: "Tropical Paradise Birthday", location: "Beach Club, Mumbai", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" },
    { name: "Glamorous Night Party", location: "Rooftop Lounge, Pune", coverImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80" },
    { name: "Sports Theme Birthday", location: "Stadium Club, Hyderabad", coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" },
    { name: "Garden Tea Party", location: "Botanical Gardens, Kolkata", coverImage: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80" },
    { name: "Superhero Adventure Party", location: "Adventure Zone, Chennai", coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" },
  ],
  Corporate: [
    { name: "Corporate Excellence Summit", location: "Tech Hub Convention Center, Hyderabad", coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { name: "Tech Startup Launch", location: "Innovation Center, Chennai", coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" },
    { name: "Annual Gala Dinner", location: "Grand Ballroom, Mumbai", coverImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" },
    { name: "Leadership Conference", location: "Executive Tower, Bangalore", coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80" },
    { name: "Product Launch Event", location: "Exhibition Center, Delhi", coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
    { name: "Networking Mixer", location: "Business Hub, Pune", coverImage: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80" },
    { name: "Award Ceremony Night", location: "Grand Theater, Kolkata", coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80" },
    { name: "Team Building Retreat", location: "Mountain Resort, Lonavala", coverImage: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" },
  ],
  Engagement: [
    { name: "Romantic Engagement Soirée", location: "Lakeside Manor, Udaipur", coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
    { name: "Sunset Engagement Party", location: "Hilltop Villa, Ooty", coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80" },
    { name: "Garden Engagement Ceremony", location: "Rose Garden Estate, Bangalore", coverImage: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80" },
    { name: "Elegant Ballroom Engagement", location: "Crystal Palace, Mumbai", coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" },
    { name: "Intimate Terrace Engagement", location: "Sky Villa, Goa", coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80" },
    { name: "Royal Heritage Engagement", location: "Maharaja Palace, Jaipur", coverImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" },
    { name: "Modern Chic Engagement", location: "Art Loft, Delhi", coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80" },
    { name: "Candlelit Engagement Night", location: "Heritage Hotel, Hyderabad", coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  ],
  Anniversary: [
    { name: "Golden Anniversary Gala", location: "Heritage Hall, Delhi", coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
    { name: "Silver Jubilee Celebration", location: "Grand Pavilion, Mumbai", coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" },
    { name: "Diamond Anniversary Party", location: "Royal Club, Chennai", coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
    { name: "Romantic Anniversary Dinner", location: "Candlelight Terrace, Pune", coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
    { name: "Pearl Anniversary Bash", location: "Ocean View Resort, Goa", coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
    { name: "Ruby Anniversary Gala", location: "Grand Ballroom, Kolkata", coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80" },
    { name: "Emerald Anniversary Night", location: "Forest Resort, Coorg", coverImage: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80" },
    { name: "Sapphire Anniversary Event", location: "Lake Palace, Udaipur", coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" },
  ],
  "Baby Shower": [
    { name: "Little Star Baby Shower", location: "Garden Terrace, Pune", coverImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80" },
    { name: "Teddy Bear Picnic Shower", location: "Park Pavilion, Bangalore", coverImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80" },
    { name: "Unicorn Dreams Shower", location: "Rainbow Hall, Mumbai", coverImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80" },
    { name: "Safari Adventure Shower", location: "Zoo Gardens, Hyderabad", coverImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80" },
    { name: "Twinkle Twinkle Shower", location: "Starlight Venue, Delhi", coverImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80" },
    { name: "Pastel Paradise Shower", location: "Flower Garden, Chennai", coverImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80" },
    { name: "Woodland Creatures Shower", location: "Forest Cafe, Lonavala", coverImage: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80" },
    { name: "Ocean Theme Baby Shower", location: "Beach Club, Goa", coverImage: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80" },
  ],
};

const descriptions: Record<string, string[]> = {
  Marriage: [
    "A magical wedding celebration with elegant floral arrangements and romantic lighting.",
    "An enchanting beachside ceremony with sunset views and ocean breezes.",
    "A grand palace wedding featuring traditional rituals and modern elegance.",
    "A stunning destination wedding surrounded by breathtaking mountain scenery.",
    "A classic and sophisticated celebration of love and commitment.",
    "A rustic vineyard wedding with wine tasting and elegant garden décor.",
    "A sacred traditional ceremony honoring cultural heritage and spirituality.",
    "A sleek modern wedding with minimalist design and artistic touches.",
  ],
  Birthday: [
    "An unforgettable birthday celebration with stunning city views and vibrant entertainment.",
    "A glamorous vintage-themed party inspired by the roaring twenties.",
    "A magical wonderland party perfect for kids of all ages.",
    "A tropical paradise celebration with beach vibes and exotic drinks.",
    "A sophisticated night party with champagne and city lights.",
    "An action-packed sports-themed celebration for athletic enthusiasts.",
    "An elegant afternoon tea party in a beautiful garden setting.",
    "An exciting superhero adventure with costumes and themed activities.",
  ],
  Corporate: [
    "A prestigious corporate event showcasing innovation and fostering business connections.",
    "An electrifying product launch event showcasing cutting-edge technology.",
    "An elegant annual gala celebrating company achievements and milestones.",
    "An inspiring leadership conference with industry thought leaders.",
    "A dynamic product launch with media coverage and demonstrations.",
    "A casual networking mixer for building professional relationships.",
    "A prestigious award ceremony honoring outstanding achievements.",
    "An engaging team building retreat for strengthening corporate bonds.",
  ],
  Engagement: [
    "A dreamy lakeside engagement celebration with romantic ambiance and elegant décor.",
    "A breathtaking sunset engagement party with panoramic views.",
    "A beautiful garden ceremony surrounded by blooming flowers.",
    "An elegant ballroom engagement with crystal chandeliers and luxury.",
    "An intimate terrace celebration with ocean views and privacy.",
    "A royal heritage engagement in a magnificent palace setting.",
    "A modern and chic engagement party with contemporary design.",
    "A romantic candlelit evening celebrating love and commitment.",
  ],
  Anniversary: [
    "A magnificent celebration of 50 years of love and togetherness.",
    "A joyous celebration marking 25 years of marriage and memories.",
    "A spectacular diamond anniversary honoring 60 years together.",
    "An intimate anniversary dinner for two with gourmet cuisine.",
    "A beautiful pearl anniversary celebration by the ocean.",
    "A grand ruby anniversary gala marking 40 years of love.",
    "A serene emerald anniversary in a peaceful forest setting.",
    "A royal sapphire anniversary celebration at a lakeside palace.",
  ],
  "Baby Shower": [
    "A whimsical celebration welcoming the newest little star with love and joy.",
    "An adorable outdoor picnic shower with teddy bear themes.",
    "A magical unicorn-themed shower full of rainbows and sparkles.",
    "An adventurous safari-themed celebration for the little explorer.",
    "A starlit evening shower with twinkling lights and celestial décor.",
    "A pastel paradise celebration with soft colors and sweet treats.",
    "A charming woodland creatures shower in a natural setting.",
    "A refreshing ocean-themed shower with beach vibes and fun.",
  ],
};

const budgetRanges = {
  Marriage: { venue: [400000, 600000], decoration: [200000, 300000], catering: [300000, 500000], photography: [100000, 200000], miscellaneous: [80000, 150000] },
  Birthday: { venue: [100000, 250000], decoration: [50000, 120000], catering: [80000, 200000], photography: [30000, 80000], miscellaneous: [30000, 70000] },
  Corporate: { venue: [200000, 400000], decoration: [80000, 150000], catering: [150000, 300000], photography: [50000, 100000], miscellaneous: [50000, 100000] },
  Engagement: { venue: [250000, 450000], decoration: [150000, 250000], catering: [200000, 350000], photography: [80000, 150000], miscellaneous: [60000, 120000] },
  Anniversary: { venue: [300000, 500000], decoration: [150000, 250000], catering: [250000, 400000], photography: [80000, 150000], miscellaneous: [100000, 180000] },
  "Baby Shower": { venue: [60000, 120000], decoration: [40000, 80000], catering: [50000, 100000], photography: [25000, 50000], miscellaneous: [20000, 40000] },
};

const generateRandomBudget = (category: Event["category"]) => {
  const ranges = budgetRanges[category];
  return {
    venue: Math.floor(Math.random() * (ranges.venue[1] - ranges.venue[0]) + ranges.venue[0]),
    decoration: Math.floor(Math.random() * (ranges.decoration[1] - ranges.decoration[0]) + ranges.decoration[0]),
    catering: Math.floor(Math.random() * (ranges.catering[1] - ranges.catering[0]) + ranges.catering[0]),
    photography: Math.floor(Math.random() * (ranges.photography[1] - ranges.photography[0]) + ranges.photography[0]),
    miscellaneous: Math.floor(Math.random() * (ranges.miscellaneous[1] - ranges.miscellaneous[0]) + ranges.miscellaneous[0]),
  };
};

const generateDate = (index: number): string => {
  const baseDate = new Date("2025-01-15");
  baseDate.setDate(baseDate.getDate() + index * 7 + Math.floor(Math.random() * 14));
  return baseDate.toISOString().split("T")[0];
};

const categories: Event["category"][] = ["Marriage", "Birthday", "Corporate", "Engagement", "Anniversary", "Baby Shower"];

const defaultProducts: Product[] = [
  { id: "p1", name: "Premium Flower Arrangements", image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80", price: 5000, quantity: 30, category: "Flowers" },
  { id: "p2", name: "Crystal Lighting", image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400&q=80", price: 20000, quantity: 10, category: "Lights" },
  { id: "p3", name: "Gourmet Catering", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", price: 2000, quantity: 100, category: "Food" },
  { id: "p4", name: "Elegant Decorations", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&q=80", price: 15000, quantity: 15, category: "Decoration" },
];

const defaultDecorationLayouts: DecorationLayout[] = [
  { id: "d1", title: "Main Stage Setup", description: "Elegant main stage with themed decorations", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", type: "Stage" },
  { id: "d2", title: "Grand Entrance", description: "Stunning entrance archway with floral accents", image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80", type: "Entrance" },
  { id: "d3", title: "Ambient Lighting", description: "Beautiful lighting creating perfect atmosphere", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80", type: "Lighting" },
];

const defaultTimeline: TimelineItem[] = [
  { time: "5:00 PM", title: "Guest Arrival", description: "Welcome and refreshments" },
  { time: "6:00 PM", title: "Main Event", description: "Key celebrations and activities" },
  { time: "7:30 PM", title: "Dinner Service", description: "Gourmet dining experience" },
  { time: "9:00 PM", title: "Entertainment", description: "Music and dancing" },
];

const defaultTestimonials: Testimonial[] = [
  { id: "t1", name: "Happy Client", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", rating: 5, comment: "Absolutely wonderful experience!", eventType: "Event" },
];

// Generate 50+ events
export const events: Event[] = [];

let eventId = 1;
for (let round = 0; round < 7; round++) {
  for (const category of categories) {
    const templates = eventTemplates[category];
    const descList = descriptions[category];
    const templateIndex = round % templates.length;
    const template = templates[templateIndex];
    const description = descList[templateIndex];
    
    events.push({
      id: String(eventId),
      name: template.name + (round > 0 ? ` ${round + 1}` : ""),
      date: generateDate(eventId),
      category,
      location: template.location,
      description,
      coverImage: template.coverImage,
      fullDescription: `Experience an unforgettable ${category.toLowerCase()} event at ${template.location}. ${description} Every detail has been carefully curated to create lasting memories for you and your guests.`,
      budget: generateRandomBudget(category),
      products: defaultProducts.map((p, i) => ({ ...p, id: `p${eventId}-${i}` })),
      decorationLayouts: defaultDecorationLayouts.map((d, i) => ({ ...d, id: `d${eventId}-${i}` })),
      timeline: defaultTimeline,
      testimonials: defaultTestimonials.map((t, i) => ({ ...t, id: `t${eventId}-${i}`, eventType: category })),
    });
    
    eventId++;
    if (eventId > 54) break;
  }
  if (eventId > 54) break;
}

export const getCategoryColor = (category: Event["category"]) => {
  const colors = {
    Marriage: "from-pink-500 to-rose-500",
    Birthday: "from-purple-500 to-indigo-500",
    Corporate: "from-blue-500 to-cyan-500",
    Engagement: "from-red-500 to-pink-500",
    Anniversary: "from-amber-500 to-orange-500",
    "Baby Shower": "from-teal-500 to-emerald-500",
  };
  return colors[category] || "from-gray-500 to-gray-600";
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
