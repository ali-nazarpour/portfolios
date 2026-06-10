export type VehicleType = 'bicycle' | 'scooter' | 'motorcycle'

export type AvailabilityStatus = 'in-stock' | 'pre-order' | 'coming-soon' | 'limited'

export interface ProductSpecs {
  motor?: string
  battery?: string
  speed?: string
  range?: string
  weight: string
  colors: string[]
  releaseYear: number
  frame?: string
  brakes?: string
}

export interface Product {
  id: string
  slug: string
  brand: string
  name: string
  type: VehicleType
  tagline: string
  shortDescription: string
  longDescription: string
  image: string
  galleryImages: string[]
  specs: ProductSpecs
  availability: AvailabilityStatus
  featured: boolean
  priceLabel?: string
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
  types: VehicleType[]
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  brand?: string
  category: 'bicycle' | 'scooter' | 'motorcycle' | 'showroom' | 'lifestyle' | 'technology'
}

export interface FAQItem {
  id: string
  category: 'products' | 'availability' | 'warranty' | 'business' | 'support'
  questionKey: string
  answerKey: string
}

export interface NavLink {
  labelKey: string
  href: string
}

export type Language = 'en' | 'fr' | 'de'

export type Theme = 'light' | 'dark'
