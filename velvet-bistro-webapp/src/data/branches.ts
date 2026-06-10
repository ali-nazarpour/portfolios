import type { Branch } from "@/types/product";

export const branches: Branch[] = [
  {
    id: "geneva",
    slug: "geneva-flagship",
    name: "Geneva Flagship",
    image: "/assets/branches/geneva-flagship.jpg",
    address: "12 Quai du Mont-Blanc",
    city: "Geneva",
    country: "Switzerland",
    phone: "+41 22 555 0198",
    email: "geneva@velvetbistro.com",
    hours: "Mon–Sun · 7:00 AM – 11:00 PM",
    lat: 46.2044,
    lng: 6.1432,
    isMain: true,
  },
  {
    id: "zurich",
    slug: "zurich-lounge",
    name: "Zurich Lounge",
    image: "/assets/branches/zurich-lounge.jpg",
    address: "45 Bahnhofstrasse",
    city: "Zurich",
    country: "Switzerland",
    phone: "+41 44 555 0287",
    email: "zurich@velvetbistro.com",
    hours: "Mon–Sat · 8:00 AM – 10:00 PM · Sun · 9:00 AM – 9:00 PM",
    lat: 47.3769,
    lng: 8.5417,
  },
  {
    id: "paris",
    slug: "paris-atelier",
    name: "Paris Atelier",
    image: "/assets/branches/paris-atelier.jpg",
    address: "8 Rue de Rivoli",
    city: "Paris",
    country: "France",
    phone: "+33 1 5555 0198",
    email: "paris@velvetbistro.com",
    hours: "Tue–Sun · 8:00 AM – 11:00 PM · Mon · Closed",
    lat: 48.8566,
    lng: 2.3522,
  },
];

export function getBranchBySlug(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export function getMainBranch(): Branch {
  return branches.find((b) => b.isMain) ?? branches[0];
}
