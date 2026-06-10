import type { BentoItem } from "@/types/product";

export const bentoItems: BentoItem[] = [
  {
    id: "fine-dining",
    title: "Fine Dining",
    description: "Seven-course tasting menus and omakase experiences curated by Chef Moreau.",
    image: "/assets/menu/chefs-tasting-omakase.jpg",
    size: "lg",
    link: "/menu?category=fine-dining",
  },
  {
    id: "coffee",
    title: "Artisan Coffee",
    description: "Ethically sourced beans, precision extraction, barista artistry.",
    image: "/assets/menu/signature-velvet-espresso.jpg",
    size: "sm",
    link: "/menu?category=coffee",
  },
  {
    id: "cocktails",
    title: "Signature Cocktails",
    description: "World-class mixology that complements our culinary philosophy.",
    image: "/assets/menu/golden-negroni.jpg",
    size: "sm",
    link: "/menu?category=signature-drinks",
  },
  {
    id: "private",
    title: "Private Dining",
    description: "Exclusive suites for celebrations, corporate events, and intimate gatherings.",
    image: "/assets/images/private-dining.jpg",
    size: "wide",
    link: "/contact",
  },
  {
    id: "pastry",
    title: "Pastry Atelier",
    description: "Award-winning desserts by Head Pastry Chef Sophie Chen.",
    image: "/assets/menu/pistachio-rose-tart.jpg",
    size: "tall",
    link: "/menu?category=desserts",
  },
  {
    id: "branches",
    title: "Three Destinations",
    description: "Geneva · Zurich · Paris — one philosophy of excellence.",
    image: "/assets/branches/geneva-flagship.jpg",
    size: "md",
    link: "/branches",
  },
];
