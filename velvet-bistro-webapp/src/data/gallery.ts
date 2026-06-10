import type { GalleryImage } from "@/types/product";

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/assets/gallery/gallery-01.jpg", alt: "Gourmet plated dish", category: "food", aspect: "wide" },
  { id: "g2", src: "/assets/gallery/gallery-02.jpg", alt: "Artisan breakfast spread", category: "food", aspect: "tall" },
  { id: "g3", src: "/assets/gallery/gallery-03.jpg", alt: "Café interior with warm lighting", category: "interior", aspect: "square" },
  { id: "g4", src: "/assets/gallery/gallery-04.jpg", alt: "Fine dining table setting", category: "dining", aspect: "wide" },
  { id: "g5", src: "/assets/gallery/gallery-05.jpg", alt: "Seafood main course", category: "food", aspect: "tall" },
  { id: "g6", src: "/assets/gallery/gallery-06.jpg", alt: "Signature cocktail", category: "drinks", aspect: "square" },
  { id: "g7", src: "/assets/gallery/gallery-07.jpg", alt: "Espresso being poured", category: "drinks", aspect: "wide" },
  { id: "g8", src: "/assets/gallery/gallery-08.jpg", alt: "Luxury restaurant lounge", category: "interior", aspect: "tall" },
  { id: "g9", src: "/assets/gallery/gallery-09.jpg", alt: "Chef preparing dish", category: "chef", aspect: "square" },
  { id: "g10", src: "/assets/gallery/gallery-10.jpg", alt: "Dessert presentation", category: "food", aspect: "wide" },
  { id: "g11", src: "/assets/gallery/gallery-11.jpg", alt: "Evening ambiance", category: "interior", aspect: "tall" },
  { id: "g12", src: "/assets/gallery/gallery-12.jpg", alt: "Wine and dining experience", category: "dining", aspect: "square" },
];

export const galleryCategories = ["all", "food", "drinks", "interior", "chef", "dining"] as const;
