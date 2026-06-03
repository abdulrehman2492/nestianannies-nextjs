// src/lib/data.ts

export interface Nanny {
  id: number;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  city: string;
  state: string;
  hourlyRate: number;
  experience: number;
  languages: string[];
  avgRating: number;
  reviewCount: number;
  about: string;
  image: string;
  services: string[];
  badges: string[];
  availability: string;
  verified: boolean;
  latitude: number;
  longitude: number;
}

export const SERVICES = [
  { id: 1, name: "Newborn Care", description: "Specialized care for infants under 3 months." },
  { id: 2, name: "Toddler Care", description: "Engaging activities and routines for toddlers." },
  { id: 3, name: "After-School & Homework Support", description: "Help with homework and activities." },
  { id: 4, name: "Language Immersion — French", description: "Bilingual French care for kids." },
  { id: 5, name: "Language Immersion — Spanish", description: "Bilingual Spanish care for kids." },
  { id: 6, name: "Meal Preparation", description: "Healthy meals for your family." },
  { id: 7, name: "Overnight & Weekend Care", description: "Flexible schedule for busy parents." }
];

export const NANNIES: Nanny[] = [
  {
    id: 3,
    slug: "perry-kirk",
    latitude: 53.6445,
    longitude: -113.6320,
    firstName: "Perry",
    lastName: "Kirk",
    fullName: "Perry Kirk",
    city: "St. Albert",
    state: "Alberta",
    hourlyRate: 25,
    experience: 5,
    languages: ["English", "French"],
    avgRating: 5,
    reviewCount: 12,
    about:
      "I am a warm, patient caregiver with 5 years of experience working with children of all ages. I specialize in bilingual French-English care and love helping children develop language skills through play and storytelling.",
    image: "/images/nannies/69fa6a49ba8001778018889.png",
    services: ["Newborn Care", "Toddler Care", "Language Immersion — French"],
    badges: ["Bilingual", "CPR Certified", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 4,
    slug: "regan-dickerson",
    latitude: 53.5346,
    longitude: -113.3228,
    firstName: "Regan",
    lastName: "Dickerson",
    fullName: "Regan Dickerson",
    city: "Sherwood Park",
    state: "Alberta",
    hourlyRate: 22,
    experience: 3,
    languages: ["English"],
    avgRating: 5,
    reviewCount: 8,
    about:
      "Dedicated and nurturing caregiver based in Sherwood Park. I have a background in early childhood education and love creating structured, fun environments for kids to thrive.",
    image: "/images/nannies/69fa6dd21967d1778019794.png",
    services: ["Toddler Care", "After-School & Homework Support"],
    badges: ["ECE Certified", "Background Checked", "First Aid"],
    availability: "Part-time",
    verified: true,
  },
  {
    id: 6,
    slug: "jade-simpson",
    latitude: 53.5455,
    longitude: -113.9194,
    firstName: "Jade",
    lastName: "Simpson",
    fullName: "Jade Simpson",
    city: "Spruce Grove",
    state: "Alberta",
    hourlyRate: 26,
    experience: 4,
    languages: ["English"],
    avgRating: 5,
    reviewCount: 10,
    about:
      "Experienced and passionate about childcare, I bring creativity and structure to every shift. I enjoy outdoor activities, arts and crafts, and building strong, trusting relationships with families.",
    image: "/images/nannies/69fb5beb1798b1778080747.png",
    services: ["Newborn Care", "Toddler Care", "Meal Preparation"],
    badges: ["CPR Certified", "Background Checked", "Newborn Specialist"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 7,
    slug: "boris-mccullough",
    latitude: 53.5620,
    longitude: -113.5050,
    firstName: "Boris",
    lastName: "Mccullough",
    fullName: "Boris Mccullough",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 19,
    experience: 5,
    languages: ["English"],
    avgRating: 5,
    reviewCount: 6,
    about:
      "I am a reliable and energetic caregiver with 5 years of experience. I enjoy helping children grow through sports, reading, and educational activities.",
    image: "/images/nannies/69fcae3f889ad1778167359.png",
    services: ["After-School & Homework Support", "Overnight & Weekend Care"],
    badges: ["Background Checked", "First Aid", "Male Caregiver"],
    availability: "Flexible",
    verified: true,
  },
  {
    id: 1,
    slug: "chanda-tillman",
    latitude: 53.5515,
    longitude: -113.5070,
    firstName: "Chanda",
    lastName: "Tillman",
    fullName: "Chanda Tillman",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 28,
    experience: 4,
    languages: ["English", "French"],
    avgRating: 4.8,
    reviewCount: 15,
    about:
      "Bilingual caregiver with a gentle, nurturing approach. I have experience with newborns through school-age children and am passionate about bilingual development in early childhood.",
    image: "/images/nannies/nanny_1.jpg",
    services: ["Newborn Care", "Language Immersion — French", "Meal Preparation"],
    badges: ["Bilingual", "Newborn Specialist", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 2,
    slug: "jaime-burt",
    latitude: 53.5550,
    longitude: -113.5320,
    firstName: "Jaime",
    lastName: "Burt",
    fullName: "Jaime Burt",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 32,
    experience: 6,
    languages: ["English", "Spanish"],
    avgRating: 4.9,
    reviewCount: 21,
    about:
      "Senior nanny with 6 years of experience working with diverse families in Edmonton. Fluent in English and Spanish, I offer bilingual care with a warm, professional approach.",
    image: "/images/nannies/nanny_2.jpg",
    services: ["Toddler Care", "After-School & Homework Support", "Language Immersion — French"],
    badges: ["Bilingual", "ECE Trained", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 5,
    slug: "imani-macias",
    latitude: 53.5280,
    longitude: -113.3190,
    firstName: "Imani",
    lastName: "Macias",
    fullName: "Imani Macias",
    city: "Sherwood Park",
    state: "Alberta",
    hourlyRate: 30,
    experience: 7,
    languages: ["English", "French", "Spanish"],
    avgRating: 4.7,
    reviewCount: 18,
    about:
      "Trilingual caregiver with 7 years of experience. I bring a rich cultural background and multilingual abilities to every family I serve, specialising in play-based learning and developmental activities.",
    image: "/images/nannies/nanny_5.jpg",
    services: ["Newborn Care", "Toddler Care", "Language Immersion — French"],
    badges: ["Trilingual", "CPR Certified", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 8,
    slug: "brynne-bradshaw",
    latitude: 53.4390,
    longitude: -113.5880,
    firstName: "Brynne",
    lastName: "Bradshaw",
    fullName: "Brynne Bradshaw",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 18,
    experience: 2,
    languages: ["English"],
    avgRating: 4.5,
    reviewCount: 4,
    about:
      "Enthusiastic and energetic caregiver, newer to professional nannying but passionate about children's development. I completed my Early Childhood Education certificate and love working with toddlers.",
    image: "/images/nannies/nanny_8.jpg",
    services: ["Toddler Care", "After-School & Homework Support"],
    badges: ["ECE Certificate", "Background Checked", "First Aid"],
    availability: "Part-time",
    verified: true,
  },
  {
    id: 13,
    slug: "marie-lefebvre",
    latitude: 53.5461,
    longitude: -113.4938,
    firstName: "Marie",
    lastName: "Lefebvre",
    fullName: "Marie Lefebvre",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 35,
    experience: 8,
    languages: ["English", "French"],
    avgRating: 4.9,
    reviewCount: 24,
    about: "Bonjour! I am Marie, a bilingual nanny with 8 years of experience in Edmonton. I specialize in newborn and toddler care. First Aid and CPR certified. Fully background checked and approved by Nestia.",
    image: "/images/nannies/nanny_13.jpg",
    services: ["Newborn Care", "Toddler Care", "Language Immersion — French"],
    badges: ["First Aid", "CPR", "Level 1 Alberta", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
  {
    id: 14,
    slug: "emily-chen",
    latitude: 53.5213,
    longitude: -113.5025,
    firstName: "Emily",
    lastName: "Chen",
    fullName: "Emily Chen",
    city: "Edmonton",
    state: "Alberta",
    hourlyRate: 28,
    experience: 5,
    languages: ["English", "Mandarin"],
    avgRating: 4.7,
    reviewCount: 16,
    about: "Hi! I am Emily, an experienced nanny specializing in after-school care and homework support. I am fluent in English and Mandarin. Fully approved and verified by Nestia Nannies.",
    image: "/images/nannies/nanny_14.jpg",
    services: ["After-School & Homework Support", "Toddler Care"],
    badges: ["First Aid", "CPR", "Background Checked"],
    availability: "Part-time",
    verified: true,
  },
  {
    id: 15,
    slug: "sophie-tremblay",
    latitude: 53.6520,
    longitude: -113.6258,
    firstName: "Sophie",
    lastName: "Tremblay",
    fullName: "Sophie Tremblay",
    city: "St. Albert",
    state: "Alberta",
    hourlyRate: 30,
    experience: 6,
    languages: ["English", "French"],
    avgRating: 4.8,
    reviewCount: 19,
    about: "Bonjour / Hello! I am Sophie, a fully bilingual French-English nanny based in St. Albert. I specialize in language immersion care — your child will naturally develop French through play and daily activities.",
    image: "/images/nannies/nanny_15.jpg",
    services: ["Language Immersion — French", "Newborn Care", "Toddler Care"],
    badges: ["First Aid", "CPR", "Level 1 Alberta", "Background Checked"],
    availability: "Full-time",
    verified: true,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Nestia connected us with an incredible nanny for our newborn. The whole process was seamless and Marthe was so helpful throughout.",
    name: "Sarah M.",
    location: "Edmonton",
    rating: 5,
    image: "/images/nannies/nanny_13.jpg",
  },
  {
    id: 2,
    quote:
      "Our nanny speaks perfect French and English. Our kids absolutely love her. Booking through Nestia was the best decision we made.",
    name: "Pierre & Julie B.",
    location: "St. Albert",
    rating: 5,
    image: "/images/nannies/nanny_10.jpg",
  },
  {
    id: 3,
    quote:
      "As a working parent, having a Nestia-approved nanny has been life-changing. Reliable, warm, and professional every single day.",
    name: "Amanda T.",
    location: "Edmonton",
    rating: 5,
    image: "/images/nannies/nanny_11.jpg",
  },
  {
    id: 4,
    quote:
      "The admin approval process gave us real confidence. We knew our nanny had been thoroughly vetted before she ever walked through our door.",
    name: "David & Rachel K.",
    location: "Sherwood Park",
    rating: 5,
    image: "/images/nannies/nanny_14.jpg",
  },
];

export const FAQS = [
  {
    q: "How are Nestia Nannies vetted?",
    a: "Every nanny on our platform undergoes a thorough background check, identity verification, reference checks, and an in-person or video interview with our team before being approved. We also verify CPR/First Aid certifications where applicable.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve the Edmonton Metropolitan Region, including Edmonton, St. Albert, Sherwood Park, Spruce Grove, Leduc, Fort Saskatchewan, Beaumont, and surrounding communities in Alberta.",
  },
  {
    q: "How do I book a nanny?",
    a: "Browse our 'Find a Nanny' page, filter by city, language, rate, and availability, then view a nanny's profile and send a booking request. Our team will confirm the match within 24 hours.",
  },
  {
    q: "What types of care do nannies provide?",
    a: "Our nannies offer newborn care, toddler care, after-school care, French/bilingual language immersion, meal preparation, overnight and weekend care, and more. Each nanny's profile lists their specific services.",
  },
  {
    q: "Can I request a bilingual or French-speaking nanny?",
    a: "Absolutely. Use the language filter on the 'Find a Nanny' page to search for nannies who speak French, Spanish, Mandarin, or other languages. Many of our nannies are fluent in two or more languages.",
  },
  {
    q: "What are your rates?",
    a: "Hourly rates vary by nanny experience and services offered, typically ranging from $18–$35/hr. You can see each nanny's rate on their profile. A 15% platform service fee applies to bookings.",
  },
  {
    q: "Can I become a nanny on Nestia?",
    a: "Yes! Visit our 'Become a Nanny' page to apply. You'll complete an online application, submit your documents, and be reviewed by our team. Approved nannies are listed on the platform and connected with families.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed securely through our platform. We never share your financial information, and all transactions are encrypted with industry-standard SSL protocols.",
  },
  {
    q: "What if I need to cancel or reschedule a booking?",
    a: "You can cancel or reschedule bookings through your parent dashboard. Please note our 24-hour cancellation policy — cancellations made less than 24 hours before the booking may incur a fee.",
  },
  {
    q: "Do nannies have first aid and CPR certification?",
    a: "Many of our nannies hold valid CPR and First Aid certifications. You can filter for certified nannies on the search page. Certification details are also listed on each nanny's profile.",
  },
];

export function getNannyBySlug(slug: string): Nanny | undefined {
  return NANNIES.find((n) => n.slug === slug);
}

export function searchNannies(params: {
  city?: string;
  language?: string;
  maxRate?: number;
  search?: string;
}): Nanny[] {
  return NANNIES.filter((n) => {
    if (params.city && n.city !== params.city) return false;
    if (params.language && !n.languages.includes(params.language)) return false;
    if (params.maxRate && n.hourlyRate > params.maxRate) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      if (
        !n.fullName.toLowerCase().includes(q) &&
        !n.city.toLowerCase().includes(q) &&
        !n.languages.join(" ").toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

// Extended services with images
export const SERVICES_WITH_IMAGES = [
  { id: 1, name: "Newborn Care", slug: "newborn-care", description: "Gentle, expert care for babies 0–12 months. Feeding support, sleep routines, and loving attention.", image: "newborn-care.jpg" },
  { id: 2, name: "Toddler Care", slug: "toddler-care", description: "Engaging, nurturing care for children ages 1–4. Activities for language and motor skills development.", image: "toddler-care.jpg" },
  { id: 3, name: "After-School & Homework Support", slug: "after-school-homework", description: "Structured homework help, healthy snacks, and supervised activities for school-age children.", image: "after-school.jpg" },
  { id: 4, name: "Meal Preparation", slug: "meal-preparation", description: "Healthy, home-cooked meals tailored to your child's dietary needs. Menus kids actually love.", image: "meal-prep.jpg" },
  { id: 5, name: "Language Immersion — French", slug: "language-immersion-french", description: "Daily French exposure through play, stories, songs, and conversation for bilingual development.", image: "french.jpg" },
  { id: 6, name: "Overnight & Weekend Care", slug: "overnight-weekend-care", description: "Dependable overnight and weekend coverage so you can rest, travel, or work worry-free.", image: "overnight.jpg" },
];

// Parent demo accounts with locations (Edmonton area)
export const PARENT_DEMO_ACCOUNTS = [
  { email: "parent@nestianannies.com", username: "sarah_johnson_demo", password: "Demo@1234", role: "parent" as const, firstName: "Sarah", lastName: "Johnson", city: "Edmonton", latitude: 53.5468, longitude: -113.4920 },
  { email: "delor963@mailinator.com", username: "delor963", password: "Demo@1234", role: "parent" as const, firstName: "Demo", lastName: "Parent", city: "Sherwood Park", latitude: 53.5360, longitude: -113.3260 },
];

// Haversine distance in km
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
