import type { BlogPost } from "@/types/product";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "art-of-velvet-espresso",
    title: "The Art of the Velvet Espresso",
    excerpt:
      "Discover the origins of our signature blend — ethically sourced beans, precision roasting, and the barista rituals that define every cup.",
    category: "Coffee Culture",
    date: "2025-05-12",
    readTime: "6 min",
    image: "/assets/images/blog-espresso.jpg",
    featured: true,
    content: [
      "Our Velvet Espresso begins in the highlands of Ethiopia and Colombia, where we partner directly with small-batch farmers committed to sustainable practices.",
      "Each morning, our baristas calibrate grind size and extraction time to achieve the perfect balance — rich crema, notes of dark chocolate and caramel, and a silky finish.",
      "The result is more than coffee. It is the heartbeat of Velvet Bistro — the first sip that welcomes you and the last that sends you into the day with grace.",
    ],
  },
  {
    id: "2",
    slug: "seasonal-tasting-menu-spring",
    title: "Spring Tasting Menu: A Celebration of Renewal",
    excerpt:
      "Chef Moreau unveils a seven-course journey through spring's finest ingredients — asparagus, morel mushrooms, and lamb from Alpine pastures.",
    category: "Chef's Table",
    date: "2025-04-28",
    readTime: "8 min",
    image: "/assets/images/blog-tasting.jpg",
    content: [
      "Spring at Velvet Bistro is a time of rebirth. Our kitchens come alive with the first harvests of the season.",
      "The tasting menu opens with a delicate asparagus velouté, followed by hand-foraged morels in a truffle emulsion.",
      "Each course tells a story of place and season — a culinary narrative that changes with the rhythm of nature.",
    ],
  },
  {
    id: "3",
    slug: "mixology-behind-golden-negroni",
    title: "Behind the Bar: Crafting the Golden Negroni",
    excerpt:
      "Head Mixologist Marco Bellini shares the inspiration and technique behind our most requested signature cocktail.",
    category: "Mixology",
    date: "2025-04-15",
    readTime: "5 min",
    image: "/assets/menu/golden-negroni.jpg",
    content: [
      "The Golden Negroni reimagines a classic through a lens of luxury — aged gin, saffron-infused vermouth, and a gold-leaf garnish.",
      "Marco spent six months perfecting the balance, drawing inspiration from Venetian aperitivo culture and Swiss precision.",
      "Served in a hand-blown crystal glass, it is as much a visual statement as a sensory one.",
    ],
  },
  {
    id: "4",
    slug: "sustainable-sourcing-commitment",
    title: "Our Commitment to Sustainable Sourcing",
    excerpt:
      "From farm to table — how Velvet Bistro partners with ethical producers across Europe to deliver quality without compromise.",
    category: "Sustainability",
    date: "2025-03-20",
    readTime: "7 min",
    image: "/assets/images/blog-sustainability.jpg",
    content: [
      "Sustainability is not a trend at Velvet Bistro — it is a foundation. We trace every ingredient to its source.",
      "Our wagyu comes from regenerative farms in Switzerland. Our seafood is MSC-certified. Our vegetables arrive from local organic cooperatives.",
      "By 2026, we aim for 100% carbon-neutral operations across all three locations.",
    ],
  },
];

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return blogPosts.filter((p) => !p.featured).slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
