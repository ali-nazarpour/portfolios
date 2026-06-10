import type { CaseStudy } from "@/types/product";

export const caseStudies: CaseStudy[] = [
  {
    id: "corporate-gala",
    title: "Annual Corporate Gala Dinner",
    client: "Swiss International Holdings",
    outcome: "Flawless 200-guest black-tie event",
    description:
      "A bespoke seven-course menu with wine pairings, live cooking stations, and personalized service for Geneva's premier corporate gathering.",
    image: "/assets/images/case-corporate.jpg",
    metrics: [
      { label: "Guests", value: "200" },
      { label: "Courses", value: "7" },
      { label: "Satisfaction", value: "100%" },
    ],
  },
  {
    id: "wedding-reception",
    title: "Destination Wedding Reception",
    client: "The Laurent Family",
    outcome: "An unforgettable celebration of love",
    description:
      "Three-day culinary experience across Geneva and Zurich — welcome brunch, ceremony canapés, and a grand reception with custom dessert tower.",
    image: "/assets/gallery/gallery-08.jpg",
    metrics: [
      { label: "Days", value: "3" },
      { label: "Guests", value: "150" },
      { label: "Custom Dishes", value: "12" },
    ],
  },
  {
    id: "product-launch",
    title: "Luxury Brand Product Launch",
    client: "Maison Éclat Paris",
    outcome: "Media buzz and sold-out follow-up events",
    description:
      "An immersive dining experience aligned with the brand's new fragrance line — scent-inspired amuse-bouches and a cocktail program mirroring each note.",
    image: "/assets/images/case-launch.jpg",
    metrics: [
      { label: "Media Coverage", value: "45+" },
      { label: "Influencers", value: "28" },
      { label: "ROI", value: "320%" },
    ],
  },
];
