import type { MenuItem } from "@/types/product";

export const menuCategories = [
  "breakfast",
  "main-courses",
  "desserts",
  "coffee",
  "signature-drinks",
  "fine-dining",
] as const;

export const menuItems: MenuItem[] = [
  {
    id: "1",
    slug: "truffle-croissant-benedict",
    name: "Truffle Croissant Benedict",
    category: "breakfast",
    tagline: "Morning indulgence, redefined",
    description:
      "Flaky house-made croissant topped with poached eggs, black truffle hollandaise, and micro herbs. A symphony of buttery layers and earthy luxury.",
    image: "/assets/menu/truffle-croissant-benedict.jpg",
    galleryImages: [
      "/assets/menu/truffle-croissant-benedict.jpg",
      "/assets/gallery/gallery-01.jpg",
    ],
    ingredients: ["Croissant", "Poached eggs", "Black truffle", "Hollandaise", "Micro herbs"],
    allergens: ["Gluten", "Eggs", "Dairy"],
    calories: 620,
    price: 28,
    featured: true,
  },
  {
    id: "2",
    slug: "golden-brioche-french-toast",
    name: "Golden Brioche French Toast",
    category: "breakfast",
    tagline: "Caramelized perfection",
    description:
      "Thick-cut brioche soaked in vanilla custard, griddled to golden crispness, served with maple mascarpone and seasonal berries.",
    image: "/assets/menu/golden-brioche-french-toast.jpg",
    galleryImages: [
      "/assets/menu/golden-brioche-french-toast.jpg",
      "/assets/gallery/gallery-02.jpg",
    ],
    ingredients: ["Brioche", "Vanilla custard", "Maple mascarpone", "Berries"],
    allergens: ["Gluten", "Eggs", "Dairy"],
    calories: 540,
    price: 24,
    featured: false,
  },
  {
    id: "3",
    slug: "velvet-breakfast-board",
    name: "Velvet Breakfast Board",
    category: "breakfast",
    tagline: "A curated morning feast",
    description:
      "Artisan cheeses, smoked salmon, soft-boiled eggs, avocado rose, sourdough, and house preserves arranged on a marble board.",
    image: "/assets/menu/velvet-breakfast-board.jpg",
    galleryImages: [
      "/assets/menu/velvet-breakfast-board.jpg",
      "/assets/gallery/gallery-03.jpg",
    ],
    ingredients: ["Cheese", "Smoked salmon", "Eggs", "Avocado", "Sourdough"],
    allergens: ["Gluten", "Dairy", "Fish", "Eggs"],
    calories: 780,
    price: 42,
    featured: true,
  },
  {
    id: "4",
    slug: "wagyu-tenderloin",
    name: "Wagyu Tenderloin",
    category: "main-courses",
    tagline: "Butter-knife tenderness",
    description:
      "A5 wagyu tenderloin with red wine reduction, roasted bone marrow, and seasonal root vegetables glazed in truffle butter.",
    image: "/assets/menu/wagyu-tenderloin.jpg",
    galleryImages: [
      "/assets/menu/wagyu-tenderloin.jpg",
      "/assets/gallery/gallery-04.jpg",
    ],
    ingredients: ["Wagyu beef", "Red wine reduction", "Bone marrow", "Root vegetables"],
    allergens: ["Dairy"],
    calories: 890,
    price: 98,
    featured: true,
  },
  {
    id: "5",
    slug: "pan-seared-sea-bass",
    name: "Pan-Seared Sea Bass",
    category: "main-courses",
    tagline: "Coastal elegance on a plate",
    description:
      "Crisp-skinned sea bass with saffron beurre blanc, fennel confit, and citrus pearls for a luminous Mediterranean finish.",
    image: "/assets/menu/pan-seared-sea-bass.jpg",
    galleryImages: [
      "/assets/menu/pan-seared-sea-bass.jpg",
      "/assets/gallery/gallery-05.jpg",
    ],
    ingredients: ["Sea bass", "Saffron beurre blanc", "Fennel", "Citrus"],
    allergens: ["Fish", "Dairy"],
    calories: 520,
    price: 62,
    featured: false,
  },
  {
    id: "6",
    slug: "herb-crusted-lamb-rack",
    name: "Herb-Crusted Lamb Rack",
    category: "main-courses",
    tagline: "Provence in every bite",
    description:
      "Frenched lamb rack with herb crust, ratatouille, and rosemary jus. Slow-roasted for a blush pink center.",
    image: "/assets/menu/herb-crusted-lamb-rack.jpg",
    galleryImages: [
      "/assets/menu/herb-crusted-lamb-rack.jpg",
      "/assets/gallery/gallery-06.jpg",
    ],
    ingredients: ["Lamb rack", "Herbs", "Ratatouille", "Rosemary jus"],
    allergens: [],
    calories: 710,
    price: 74,
    featured: true,
  },
  {
    id: "7",
    slug: "dark-chocolate-souffle",
    name: "Dark Chocolate Soufflé",
    category: "desserts",
    tagline: "Rising decadence",
    description:
      "Valrhona dark chocolate soufflé with molten center, served with gold-dusted vanilla bean ice cream.",
    image: "/assets/menu/dark-chocolate-souffle.jpg",
    galleryImages: [
      "/assets/menu/dark-chocolate-souffle.jpg",
      "/assets/gallery/gallery-07.jpg",
    ],
    ingredients: ["Valrhona chocolate", "Eggs", "Vanilla ice cream"],
    allergens: ["Eggs", "Dairy", "Gluten"],
    calories: 480,
    price: 22,
    featured: true,
  },
  {
    id: "8",
    slug: "pistachio-rose-tart",
    name: "Pistachio Rose Tart",
    category: "desserts",
    tagline: "Floral and nutty harmony",
    description:
      "Sable crust filled with pistachio frangipane, rosewater cream, and candied petals. A jewel of Persian inspiration.",
    image: "/assets/menu/pistachio-rose-tart.jpg",
    galleryImages: [
      "/assets/menu/pistachio-rose-tart.jpg",
      "/assets/gallery/gallery-08.jpg",
    ],
    ingredients: ["Pistachio", "Rosewater", "Sable crust", "Cream"],
    allergens: ["Gluten", "Dairy", "Nuts"],
    calories: 410,
    price: 18,
    featured: false,
  },
  {
    id: "9",
    slug: "creme-brulee-royale",
    name: "Crème Brûlée Royale",
    category: "desserts",
    tagline: "Classic, perfected",
    description:
      "Madagascar vanilla crème brûlée with caramelized sugar glass and a whisper of aged rum.",
    image: "/assets/menu/creme-brulee-royale.jpg",
    galleryImages: [
      "/assets/menu/creme-brulee-royale.jpg",
      "/assets/gallery/gallery-09.jpg",
    ],
    ingredients: ["Vanilla", "Cream", "Egg yolks", "Rum"],
    allergens: ["Eggs", "Dairy"],
    calories: 380,
    price: 16,
    featured: false,
  },
  {
    id: "10",
    slug: "signature-velvet-espresso",
    name: "Signature Velvet Espresso",
    category: "coffee",
    tagline: "Our house blend, perfected",
    description:
      "Single-origin Ethiopian and Colombian beans, slow-roasted for notes of dark chocolate, bergamot, and caramel.",
    image: "/assets/menu/signature-velvet-espresso.jpg",
    galleryImages: [
      "/assets/menu/signature-velvet-espresso.jpg",
      "/assets/gallery/gallery-10.jpg",
    ],
    ingredients: ["Ethiopian beans", "Colombian beans"],
    allergens: [],
    calories: 5,
    price: 6,
    featured: true,
  },
  {
    id: "11",
    slug: "caramel-affogato",
    name: "Caramel Affogato",
    category: "coffee",
    tagline: "Hot meets cold, sweet meets bold",
    description:
      "Double espresso poured over salted caramel gelato with amaretti crumble and espresso dust.",
    image: "/assets/menu/caramel-affogato.jpg",
    galleryImages: [
      "/assets/menu/caramel-affogato.jpg",
      "/assets/gallery/gallery-11.jpg",
    ],
    ingredients: ["Espresso", "Caramel gelato", "Amaretti"],
    allergens: ["Dairy", "Gluten", "Nuts"],
    calories: 290,
    price: 12,
    featured: false,
  },
  {
    id: "12",
    slug: "lavender-latte",
    name: "Lavender Latte",
    category: "coffee",
    tagline: "Calm in a cup",
    description:
      "House espresso with lavender-infused oat milk, honey drizzle, and edible flower garnish.",
    image: "/assets/menu/lavender-latte.jpg",
    galleryImages: [
      "/assets/menu/lavender-latte.jpg",
      "/assets/gallery/gallery-12.jpg",
    ],
    ingredients: ["Espresso", "Oat milk", "Lavender", "Honey"],
    allergens: [],
    calories: 180,
    price: 8,
    featured: true,
  },
  {
    id: "13",
    slug: "golden-negroni",
    name: "Golden Negroni",
    category: "signature-drinks",
    tagline: "A luminous twist on a classic",
    description:
      "Barrel-aged gin, Suze, and Lillet Blanc with an orange oil mist and gold leaf accent.",
    image: "/assets/menu/golden-negroni.jpg",
    galleryImages: [
      "/assets/menu/golden-negroni.jpg",
      "/assets/gallery/gallery-01.jpg",
    ],
    ingredients: ["Gin", "Suze", "Lillet Blanc", "Orange"],
    allergens: [],
    calories: 210,
    price: 24,
    featured: true,
  },
  {
    id: "14",
    slug: "smoked-old-fashioned",
    name: "Smoked Old Fashioned",
    category: "signature-drinks",
    tagline: "Theatrical mixology",
    description:
      "Bourbon smoked with cherry wood, demerara, Angostura, and a single clear ice sphere.",
    image: "/assets/menu/smoked-old-fashioned.jpg",
    galleryImages: [
      "/assets/menu/smoked-old-fashioned.jpg",
      "/assets/gallery/gallery-02.jpg",
    ],
    ingredients: ["Bourbon", "Demerara", "Angostura", "Cherry wood smoke"],
    allergens: [],
    calories: 230,
    price: 26,
    featured: false,
  },
  {
    id: "15",
    slug: "velvet-sparkling-rose",
    name: "Velvet Sparkling Rosé",
    category: "signature-drinks",
    tagline: "Effervescent romance",
    description:
      "House sparkling rosé with hibiscus syrup, fresh raspberries, and prosecco pearls.",
    image: "/assets/menu/velvet-sparkling-rose.jpg",
    galleryImages: [
      "/assets/menu/velvet-sparkling-rose.jpg",
      "/assets/gallery/gallery-03.jpg",
    ],
    ingredients: ["Sparkling rosé", "Hibiscus", "Raspberries"],
    allergens: [],
    calories: 160,
    price: 22,
    featured: true,
  },
  {
    id: "16",
    slug: "chefs-tasting-omakase",
    name: "Chef's Tasting Omakase",
    category: "fine-dining",
    tagline: "Twelve courses of discovery",
    description:
      "An immersive tasting journey curated nightly by Executive Chef Laurent Moreau — seasonal, surprise-driven, unforgettable.",
    image: "/assets/menu/chefs-tasting-omakase.jpg",
    galleryImages: [
      "/assets/menu/chefs-tasting-omakase.jpg",
      "/assets/gallery/gallery-04.jpg",
      "/assets/gallery/gallery-05.jpg",
    ],
    ingredients: ["Seasonal selection"],
    allergens: ["Varies"],
    calories: 1200,
    price: 185,
    featured: true,
  },
  {
    id: "17",
    slug: "lobster-thermidor",
    name: "Lobster Thermidor",
    category: "fine-dining",
    tagline: "French grandeur reimagined",
    description:
      "Whole Brittany lobster in cognac cream, gruyère gratin, and saffron-infused bisque.",
    image: "/assets/menu/lobster-thermidor.jpg",
    galleryImages: [
      "/assets/menu/lobster-thermidor.jpg",
      "/assets/gallery/gallery-06.jpg",
    ],
    ingredients: ["Lobster", "Cognac cream", "Gruyère", "Saffron bisque"],
    allergens: ["Shellfish", "Dairy"],
    calories: 680,
    price: 92,
    featured: false,
  },
  {
    id: "18",
    slug: "black-truffle-risotto",
    name: "Black Truffle Risotto",
    category: "fine-dining",
    tagline: "Umami in every grain",
    description:
      "Carnaroli risotto with shaved Alba truffle, aged Parmigiano, and truffle butter finish.",
    image: "/assets/menu/black-truffle-risotto.jpg",
    galleryImages: [
      "/assets/menu/black-truffle-risotto.jpg",
      "/assets/gallery/gallery-07.jpg",
    ],
    ingredients: ["Carnaroli rice", "Alba truffle", "Parmigiano", "Truffle butter"],
    allergens: ["Dairy"],
    calories: 560,
    price: 78,
    featured: true,
  },
];

export function getMenuItemBySlug(slug: string): MenuItem | undefined {
  return menuItems.find((item) => item.slug === slug);
}

export function getFeaturedMenuItems(): MenuItem[] {
  return menuItems.filter((item) => item.featured);
}

export function getMenuItemsByCategory(category: string): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function getRecommendedPairings(item: MenuItem): MenuItem[] {
  const pairingMap: Record<string, string[]> = {
    "truffle-croissant-benedict": ["signature-velvet-espresso", "lavender-latte"],
    "wagyu-tenderloin": ["smoked-old-fashioned", "golden-negroni"],
    "dark-chocolate-souffle": ["caramel-affogato", "velvet-sparkling-rose"],
    "chefs-tasting-omakase": ["golden-negroni", "velvet-sparkling-rose"],
    "black-truffle-risotto": ["signature-velvet-espresso", "golden-negroni"],
  };
  const slugs = pairingMap[item.slug] ?? menuItems.filter((m) => m.category === "signature-drinks").slice(0, 2).map((m) => m.slug);
  return slugs.map((s) => menuItems.find((m) => m.slug === s)!).filter(Boolean);
}
