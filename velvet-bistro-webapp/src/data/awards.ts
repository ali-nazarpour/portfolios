import type { AwardItem } from "@/types/product";

export const awardItems: AwardItem[] = [
  {
    id: "michelin",
    title: "Michelin Guide Recommended",
    organization: "Michelin Guide Switzerland",
    year: "2024",
    image: "/assets/images/award-michelin.jpg",
    description: "Recognized for exceptional cuisine and consistent excellence across all three locations.",
  },
  {
    id: "world-luxury",
    title: "Best Luxury Café",
    organization: "World Luxury Restaurant Awards",
    year: "2024",
    image: "/assets/images/award-world-luxury.jpg",
    description: "Awarded for redefining the café experience with fine dining standards.",
  },
  {
    id: "gault",
    title: "16/20 Rating",
    organization: "Gault & Millau",
    year: "2025",
    image: "/assets/images/award-gault.jpg",
    description: "Celebrated for innovative tasting menus and impeccable pastry program.",
  },
  {
    id: "tripadvisor",
    title: "Travellers' Choice",
    organization: "TripAdvisor",
    year: "2025",
    image: "/assets/images/award-tripadvisor.jpg",
    description: "Top 1% of restaurants worldwide based on guest reviews and satisfaction.",
  },
  {
    id: "sustainable",
    title: "Sustainable Dining Certified",
    organization: "Green Restaurant Association",
    year: "2024",
    image: "/assets/images/award-sustainable.jpg",
    description: "Committed to ethical sourcing, zero-waste kitchens, and carbon-neutral operations.",
  },
  {
    id: "sommelier",
    title: "Best Wine Program",
    organization: "International Sommelier Guild",
    year: "2023",
    image: "/assets/images/award-wine.jpg",
    description: "Curated collection of 200+ labels with expert pairings for every course.",
  },
];
