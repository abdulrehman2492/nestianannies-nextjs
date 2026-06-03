// /src/lib/constants.ts

export const COMMISSION_RATE = 0.15; // 15%
export const SEARCH_RADIUS_KM = 5;

export const SERVICES = [
  {
    id: "newborn-care",
    name: "Newborn Care",
    description:
      "Specialized care for newborns and infants up to 12 months, including feeding support, sleep routines, and developmental activities.",
  },
  {
    id: "toddler-care",
    name: "Toddler Care",
    description:
      "Engaging, nurturing care for toddlers aged 1–3 years, focused on play-based learning and milestone development.",
  },
  {
    id: "after-school",
    name: "After-School & Homework Support",
    description:
      "Safe pick-up, homework assistance, and enriching after-school activities for school-aged children.",
  },
  {
    id: "meal-preparation",
    name: "Meal Preparation",
    description:
      "Healthy, nutritious meal planning and preparation tailored to your children's dietary needs and preferences.",
  },
  {
    id: "language-immersion",
    name: "Language Immersion — French",
    description:
      "Bilingual French-English care that immerses your child in a second language through play, stories, and conversation.",
  },
  {
    id: "overnight-weekend",
    name: "Overnight & Weekend Care",
    description:
      "Reliable overnight and weekend coverage so parents can rest, travel, or attend events with complete peace of mind.",
  },
] as const;

export const EDMONTON_CITIES = [
  "Edmonton",
  "St. Albert",
  "Sherwood Park",
  "Leduc",
  "Spruce Grove",
  "Stony Plain",
  "Fort Saskatchewan",
  "Beaumont",
  "Calmar",
  "Devon",
  "Morinville",
] as const;

export const LANGUAGES = [
  "English",
  "French",
  "Spanish",
  "Mandarin",
  "Arabic",
  "Tagalog",
  "Punjabi",
  "Urdu",
  "Hindi",
  "Portuguese",
] as const;

export const NANNY_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  ACTION_REQUIRED: "action_required",
} as const;

export type NannyStatus = (typeof NANNY_STATUSES)[keyof typeof NANNY_STATUSES];

export const EXPERIENCE_RANGES = [
  { label: "0–1 year", min: 0, max: 1 },
  { label: "2–3 years", min: 2, max: 3 },
  { label: "4–5 years", min: 4, max: 5 },
  { label: "6+ years", min: 6, max: 99 },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/caregivers", label: "Find a Nanny" },
  { href: "/become-a-nanny", label: "Become a Nanny" },
  { href: "/faq", label: "FAQ's" },
  { href: "/contact", label: "Contact" },
] as const;

export const SITE_INFO = {
  name: "Nestia Nannies",
  tagline: "WHERE LUXURY CARE MEETS PEACE OF MIND",
  description:
    "Luxury bilingual childcare for families in Edmonton and nearby areas.",
  email: "hello@nestianannies.com",
  phone: "+1 780 555-0100",
  address: "Edmonton, AB, Canada",
} as const;
