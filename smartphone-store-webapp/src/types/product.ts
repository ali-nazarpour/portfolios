export type Brand = 'apple' | 'samsung' | 'xiaomi'

export type AvailabilityStatus = 'in-stock' | 'limited' | 'pre-order' | 'out-of-stock'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  brand: Brand
  name: string
  tagline: string
  shortDescription: string
  longDescription: string
  image: string
  gallery: string[]
  display: string
  chipset: string
  camera: string
  battery: string
  storage: string[]
  colors: ProductColor[]
  releaseYear: number
  availability: AvailabilityStatus
  featured: boolean
}

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'year-desc' | 'year-asc'
