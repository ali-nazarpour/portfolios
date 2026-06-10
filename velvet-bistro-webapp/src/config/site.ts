export const siteConfig = {
  name: "Velvet Bistro",
  tagline: "Where culinary artistry meets timeless elegance",
  description:
    "An award-winning luxury café and fine dining destination offering curated menus, signature drinks, and unforgettable ambiance across Geneva, Zurich, and Paris.",
  email: "concierge@velvetbistro.com",
  phone: "+41 22 555 0198",
  address: "12 Quai du Mont-Blanc, 1201 Geneva, Switzerland",
  hours: "Mon–Sun · 7:00 AM – 11:00 PM",
  founded: 2012,
  coordinates: { lat: 46.2044, lng: 6.1432 },
  whatsapp: "+41225550198",
} as const;

export const navLinks = [
  { key: "home", path: "/" },
  { key: "menu", path: "/menu" },
  { key: "gallery", path: "/gallery" },
  { key: "blog", path: "/blog" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
  { key: "faq", path: "/faq" },
] as const;

export const megaMenuCategories = [
  { key: "breakfast", path: "/menu?category=breakfast" },
  { key: "mainCourses", path: "/menu?category=main-courses" },
  { key: "desserts", path: "/menu?category=desserts" },
  { key: "coffee", path: "/menu?category=coffee" },
  { key: "signatureDrinks", path: "/menu?category=signature-drinks" },
  { key: "fineDining", path: "/menu?category=fine-dining" },
] as const;
