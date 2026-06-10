import type { ProcessStep } from "@/types/product";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    step: 1,
    title: "Discover & Consult",
    description:
      "Share your vision — occasion, preferences, dietary needs. Our concierge team crafts a personalized dining proposal within 24 hours.",
  },
  {
    id: "curate",
    step: 2,
    title: "Curate the Experience",
    description:
      "Chef Moreau and our mixology team design a bespoke menu — from amuse-bouche to digestif — tailored to your palate and celebration.",
  },
  {
    id: "prepare",
    step: 3,
    title: "Prepare with Precision",
    description:
      "Our kitchens source the finest seasonal ingredients. Every element is prepared fresh, plated with artistry, and timed to perfection.",
  },
  {
    id: "serve",
    step: 4,
    title: "Serve & Celebrate",
    description:
      "Impeccable service in an atmosphere of warmth and elegance. Your evening unfolds seamlessly — every detail handled, every moment memorable.",
  },
  {
    id: "remember",
    step: 5,
    title: "Remember & Return",
    description:
      "We follow up with gratitude. Many guests become part of the Velvet family — returning for milestones, seasons, and new chapters.",
  },
];
