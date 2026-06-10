export type MenuCategory =
  | "breakfast"
  | "main-courses"
  | "desserts"
  | "coffee"
  | "signature-drinks"
  | "fine-dining";

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  category: MenuCategory;
  tagline: string;
  description: string;
  image: string;
  galleryImages: string[];
  ingredients: string[];
  allergens: string[];
  calories: number;
  price: number;
  featured: boolean;
}

export interface Branch {
  id: string;
  slug: string;
  name: string;
  image: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  lat: number;
  lng: number;
  isMain?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "food" | "drinks" | "interior" | "chef" | "dining";
  aspect: "tall" | "wide" | "square";
}

export interface FAQItem {
  id: string;
  category: "menu" | "reservations" | "branches" | "events" | "allergies" | "support";
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: { platform: "instagram" | "linkedin" | "x"; url: string }[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  platform: "instagram" | "x" | "facebook" | "whatsapp" | "youtube";
  url: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  location: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
}

export interface AchievementStat {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  image: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  outcome: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
}

export interface BrandValue {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface SocialPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
}

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  image: string;
  size: "sm" | "md" | "lg" | "wide" | "tall";
  link?: string;
}

export interface FloatingCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
}
