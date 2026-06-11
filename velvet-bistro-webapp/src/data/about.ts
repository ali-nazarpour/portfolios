import type { TeamMember, Stat } from "@/types/product";

export const teamMembers: TeamMember[] = [
  {
    id: "chef",
    name: "Laurent Moreau",
    role: "Executive Chef",
    bio: "Two Michelin-star trained, Laurent brings 20 years of haute cuisine experience from Lyon to Geneva.",
    image: "/assets/images/team-laurent.jpg",
    social: [
      { platform: "instagram", url: "https://instagram.com/velvetbistro" },
      { platform: "linkedin", url: "https://linkedin.com/company/velvetbistro" },
    ],
  },
  {
    id: "pastry",
    name: "Sophie Chen",
    role: "Head Pastry Chef",
    bio: "Award-winning patissière specializing in modern French desserts with Asian-inspired accents.",
    image: "/assets/images/team-sophie.jpg",
    social: [{ platform: "instagram", url: "https://instagram.com/velvetbistro" }],
  },
  {
    id: "bar",
    name: "Marco Bellini",
    role: "Head Mixologist",
    bio: "World-class bartender crafting signature cocktails that complement our culinary philosophy.",
    image: "/assets/images/team-marco.jpg",
    social: [
      { platform: "instagram", url: "https://instagram.com/velvetbistro" },
      { platform: "x", url: "https://x.com/velvetbistro" },
    ],
  },
];

export const restaurantStats: Stat[] = [
  { value: "12+", label: "Years of Excellence" },
  { value: "3", label: "European Locations" },
  { value: "48", label: "Award-Winning Dishes" },
  { value: "98%", label: "Guest Satisfaction" },
];

export const awards = [
  "Michelin Guide Recommended 2024",
  "World Luxury Restaurant Awards — Best Café",
  "Gault & Millau — 16/20",
  "TripAdvisor Travellers' Choice 2025",
];
