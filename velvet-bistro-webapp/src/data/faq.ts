import type { FAQItem } from "@/types/product";

export const faqItems: FAQItem[] = [
  {
    id: "menu-1",
    category: "menu",
    question: "Do you offer seasonal menu changes?",
    answer:
      "Yes. Our culinary team refreshes the menu quarterly, incorporating the finest seasonal ingredients from trusted local and international purveyors.",
  },
  {
    id: "menu-2",
    category: "menu",
    question: "Can I request custom dietary modifications?",
    answer:
      "Absolutely. Please inform our team of any dietary preferences or restrictions when ordering, and our chefs will gladly accommodate where possible.",
  },
  {
    id: "res-1",
    category: "reservations",
    question: "How do I make a reservation?",
    answer:
      "Use our contact form or call your preferred branch directly. This showcase site simulates inquiries only — our concierge team responds within 24 hours.",
  },
  {
    id: "res-2",
    category: "reservations",
    question: "What is your cancellation policy?",
    answer:
      "We kindly request 24 hours notice for cancellations. For private dining and tasting menus, 48 hours notice is appreciated.",
  },
  {
    id: "branch-1",
    category: "branches",
    question: "Which branch is the flagship location?",
    answer:
      "Our Geneva Flagship on Quai du Mont-Blanc is our original and flagship location, home to our full fine dining experience.",
  },
  {
    id: "branch-2",
    category: "branches",
    question: "Do all branches serve the same menu?",
    answer:
      "Each branch offers our core menu with location-specific specials. Fine dining tasting menus are exclusive to Geneva and Paris.",
  },
  {
    id: "event-1",
    category: "events",
    question: "Do you host private events?",
    answer:
      "Yes. We offer private dining rooms, corporate events, and bespoke celebrations. Contact us to discuss your occasion.",
  },
  {
    id: "event-2",
    category: "events",
    question: "Can you accommodate wedding receptions?",
    answer:
      "Our Paris Atelier and Geneva Flagship feature dedicated event spaces for intimate wedding receptions up to 80 guests.",
  },
  {
    id: "allergy-1",
    category: "allergies",
    question: "How do you handle food allergies?",
    answer:
      "All allergen information is listed on our menu. Our kitchen follows strict protocols — please always inform your server of severe allergies.",
  },
  {
    id: "allergy-2",
    category: "allergies",
    question: "Do you offer gluten-free options?",
    answer:
      "Many dishes can be adapted gluten-free. We also offer dedicated gluten-free bread and pasta upon request.",
  },
  {
    id: "support-1",
    category: "support",
    question: "How can I provide feedback?",
    answer:
      "We welcome your feedback via our contact form, email, or in person with your server. Guest experience is our highest priority.",
  },
  {
    id: "support-2",
    category: "support",
    question: "Do you offer gift cards?",
    answer:
      "Digital and physical gift cards are available at all branches and through our concierge email. Perfect for any occasion.",
  },
];

export const faqCategories = ["menu", "reservations", "branches", "events", "allergies", "support"] as const;
