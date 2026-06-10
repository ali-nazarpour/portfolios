import type { Brand, Product } from '@/types/product'

export const brands: Brand[] = [
  {
    id: 'trek',
    name: 'Trek',
    logo: '/assets/brands/trek.svg',
    description: 'American cycling innovation since 1976.',
    types: ['bicycle'],
  },
  {
    id: 'giant',
    name: 'Giant',
    logo: '/assets/brands/giant.svg',
    description: 'World-leading bicycle engineering and design.',
    types: ['bicycle'],
  },
  {
    id: 'specialized',
    name: 'Specialized',
    logo: '/assets/brands/specialized.svg',
    description: 'Performance bicycles for every rider.',
    types: ['bicycle'],
  },
  {
    id: 'segway',
    name: 'Segway',
    logo: '/assets/brands/segway.svg',
    description: 'Smart personal mobility redefined.',
    types: ['scooter'],
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi',
    logo: '/assets/brands/xiaomi.svg',
    description: 'Accessible electric urban mobility.',
    types: ['scooter'],
  },
  {
    id: 'zero',
    name: 'Zero Motorcycles',
    logo: '/assets/brands/zero.svg',
    description: 'Pure electric motorcycle performance.',
    types: ['motorcycle'],
  },
]

export const products: Product[] = [
  {
    id: '1',
    slug: 'trek-fuel-exe-9-8',
    brand: 'Trek',
    name: 'Fuel EXe 9.8',
    type: 'bicycle',
    tagline: 'Electric trail dominance',
    shortDescription: 'Lightweight e-MTB with natural ride feel and trail-shredding power.',
    longDescription:
      'The Trek Fuel EXe 9.8 combines a refined TQ harmonic drive motor with premium suspension for riders who demand both natural pedaling dynamics and explosive climbing capability. Carbon frame, FOX suspension, and SRAM AXS shifting deliver a flagship trail experience.',
    image: '/assets/products/trek-fuel-exe.jpg',
    galleryImages: [
      '/assets/products/trek-fuel-exe.jpg',
      '/assets/products/trek-fuel-exe-2.jpg',
      '/assets/gallery/bike-trail.jpg',
    ],
    specs: {
      motor: 'TQ harmonic drive, 50 Nm',
      battery: '360 Wh integrated',
      speed: '25 km/h assist',
      range: 'Up to 80 km',
      weight: '19.2 kg',
      colors: ['Carbon Smoke', 'Matte Olive', 'Deep Navy'],
      releaseYear: 2025,
      frame: 'OCLV Mountain Carbon',
      brakes: 'SRAM Code RSC hydraulic',
    },
    availability: 'in-stock',
    featured: true,
    priceLabel: 'Premium Collection',
  },
  {
    id: '2',
    slug: 'giant-trance-x-advanced-pro',
    brand: 'Giant',
    name: 'Trance X Advanced Pro',
    type: 'bicycle',
    tagline: 'Enduro-ready precision',
    shortDescription: 'Advanced carbon enduro bike built for aggressive terrain.',
    longDescription:
      'Giant Trance X Advanced Pro features Maestro suspension, a stiff Advanced-grade composite frame, and progressive geometry tuned for enduro racing and all-mountain exploration. Confidence-inspiring on descents, efficient on climbs.',
    image: '/assets/products/giant-trance.jpg',
    galleryImages: [
      '/assets/products/giant-trance.jpg',
      '/assets/gallery/bike-mountain.jpg',
      '/assets/gallery/showroom-1.jpg',
    ],
    specs: {
      weight: '14.8 kg',
      colors: ['Charcoal', 'Electric Blue', 'Raw Carbon'],
      releaseYear: 2025,
      frame: 'Advanced-Grade Composite',
      brakes: 'Shimano XT 4-piston',
      speed: 'N/A',
      range: 'N/A',
    },
    availability: 'in-stock',
    featured: true,
  },
  {
    id: '3',
    slug: 'specialized-turbo-levo-expert',
    brand: 'Specialized',
    name: 'Turbo Levo Expert',
    type: 'bicycle',
    tagline: 'The benchmark e-MTB',
    shortDescription: 'Industry-leading e-mountain bike with seamless power delivery.',
    longDescription:
      'Specialized Turbo Levo Expert sets the standard for electric mountain biking with the 2.2 motor, 700 Wh battery, and Rx Trail tuned suspension. Smart control via the Mission Control app unlocks personalized ride profiles.',
    image: '/assets/products/specialized-levo.jpg',
    galleryImages: [
      '/assets/products/specialized-levo.jpg',
      '/assets/gallery/bike-trail.jpg',
      '/assets/gallery/lifestyle-1.jpg',
    ],
    specs: {
      motor: 'Specialized 2.2, 90 Nm',
      battery: '700 Wh',
      speed: '25 km/h assist',
      range: 'Up to 120 km',
      weight: '22.5 kg',
      colors: ['Gloss Black', 'Sage Green', 'Doppio Sand'],
      releaseYear: 2025,
      frame: 'FACT 11m Carbon',
      brakes: 'SRAM Code Bronze Stealth',
    },
    availability: 'in-stock',
    featured: true,
  },
  {
    id: '4',
    slug: 'trek-domane-sl-7',
    brand: 'Trek',
    name: 'Domane SL 7',
    type: 'bicycle',
    tagline: 'Endurance redefined',
    shortDescription: 'IsoSpeed comfort meets race-ready carbon performance.',
    longDescription:
      'The Trek Domane SL 7 is engineered for long days in the saddle. IsoSpeed decoupler technology smooths rough roads while aerodynamic tube shaping and electronic shifting keep you fast and fresh.',
    image: '/assets/products/trek-domane.jpg',
    galleryImages: [
      '/assets/products/trek-domane.jpg',
      '/assets/gallery/bike-road.jpg',
      '/assets/gallery/lifestyle-2.jpg',
    ],
    specs: {
      weight: '8.2 kg',
      colors: ['Plasma Grey', 'Crimson Red', 'White'],
      releaseYear: 2024,
      frame: '500 Series OCLV Carbon',
      brakes: 'Shimano Ultegra Di2 hydraulic',
      speed: 'N/A',
      range: 'N/A',
    },
    availability: 'in-stock',
    featured: false,
  },
  {
    id: '5',
    slug: 'segway-ninebot-max-g2',
    brand: 'Segway',
    name: 'Ninebot Max G2',
    type: 'scooter',
    tagline: 'Urban range champion',
    shortDescription: 'Long-range electric scooter with premium ride comfort.',
    longDescription:
      'Segway Ninebot Max G2 delivers extended range and refined suspension for daily commuters. Self-sealing tires, dual braking, and intelligent BMS make it the definitive urban mobility companion.',
    image: '/assets/products/segway-max-g2.jpg',
    galleryImages: [
      '/assets/products/segway-max-g2.jpg',
      '/assets/gallery/scooter-urban.jpg',
      '/assets/gallery/lifestyle-1.jpg',
    ],
    specs: {
      motor: '1000 W rear hub',
      battery: '551 Wh',
      speed: '25 km/h',
      range: 'Up to 70 km',
      weight: '24.3 kg',
      colors: ['Matte Black', 'Space Grey'],
      releaseYear: 2024,
    },
    availability: 'in-stock',
    featured: true,
  },
  {
    id: '6',
    slug: 'segway-superscooter-gt3',
    brand: 'Segway',
    name: 'SuperScooter GT3',
    type: 'scooter',
    tagline: 'Performance urban machine',
    shortDescription: 'High-performance scooter with dual motors and premium build.',
    longDescription:
      'The Segway SuperScooter GT3 pushes urban mobility into performance territory with dual 1500W motors, automotive-grade chassis, and advanced traction control for confident riding in any condition.',
    image: '/assets/products/segway-gt3.jpg',
    galleryImages: [
      '/assets/products/segway-gt3.jpg',
      '/assets/gallery/scooter-city.jpg',
      '/assets/gallery/tech-1.jpg',
    ],
    specs: {
      motor: 'Dual 1500 W',
      battery: '1080 Wh',
      speed: '45 km/h',
      range: 'Up to 95 km',
      weight: '47 kg',
      colors: ['Stealth Black', 'Titanium'],
      releaseYear: 2025,
    },
    availability: 'pre-order',
    featured: true,
  },
  {
    id: '7',
    slug: 'xiaomi-electric-scooter-4-pro',
    brand: 'Xiaomi',
    name: 'Electric Scooter 4 Pro',
    type: 'scooter',
    tagline: 'Smart city mobility',
    shortDescription: 'Feature-rich commuter scooter with app connectivity.',
    longDescription:
      'Xiaomi Electric Scooter 4 Pro combines a powerful 960W motor with a spacious deck and intuitive dashboard. Connect via Mi Home app for firmware updates, ride statistics, and security features.',
    image: '/assets/products/xiaomi-4-pro.jpg',
    galleryImages: [
      '/assets/products/xiaomi-4-pro.jpg',
      '/assets/gallery/scooter-urban.jpg',
      '/assets/gallery/lifestyle-2.jpg',
    ],
    specs: {
      motor: '960 W max',
      battery: '468 Wh',
      speed: '25 km/h',
      range: 'Up to 45 km',
      weight: '17.0 kg',
      colors: ['Black', 'Silver'],
      releaseYear: 2024,
    },
    availability: 'in-stock',
    featured: false,
  },
  {
    id: '8',
    slug: 'xiaomi-electric-scooter-5-max',
    brand: 'Xiaomi',
    name: 'Electric Scooter 5 Max',
    type: 'scooter',
    tagline: 'Next-gen commuter',
    shortDescription: 'Upgraded range and comfort for daily urban travel.',
    longDescription:
      'The Xiaomi Electric Scooter 5 Max elevates the commuter experience with enhanced suspension, extended battery capacity, and refined folding mechanism for seamless multimodal transport.',
    image: '/assets/products/xiaomi-5-max.jpg',
    galleryImages: [
      '/assets/products/xiaomi-5-max.jpg',
      '/assets/gallery/scooter-city.jpg',
      '/assets/gallery/showroom-2.jpg',
    ],
    specs: {
      motor: '1200 W max',
      battery: '624 Wh',
      speed: '25 km/h',
      range: 'Up to 60 km',
      weight: '19.5 kg',
      colors: ['Midnight Black', 'Pearl White'],
      releaseYear: 2025,
    },
    availability: 'coming-soon',
    featured: false,
  },
  {
    id: '9',
    slug: 'zero-srf',
    brand: 'Zero Motorcycles',
    name: 'SR/F',
    type: 'motorcycle',
    tagline: 'Electric superbike',
    shortDescription: 'Flagship naked electric motorcycle with Cypher III platform.',
    longDescription:
      'Zero SR/F represents the pinnacle of electric motorcycling. The Cypher III operating system, 110 hp motor, and premium Bosch ABS deliver a connected, exhilarating ride with zero emissions.',
    image: '/assets/products/zero-srf.jpg',
    galleryImages: [
      '/assets/products/zero-srf.jpg',
      '/assets/gallery/motorcycle-road.jpg',
      '/assets/gallery/tech-2.jpg',
    ],
    specs: {
      motor: 'Z-Force 75-10, 110 hp',
      battery: '14.4 kWh',
      speed: '200 km/h',
      range: 'Up to 260 km city',
      weight: '220 kg',
      colors: ['Graphite', 'Silver'],
      releaseYear: 2025,
    },
    availability: 'in-stock',
    featured: true,
  },
  {
    id: '10',
    slug: 'zero-dsr-x',
    brand: 'Zero Motorcycles',
    name: 'DSR/X',
    type: 'motorcycle',
    tagline: 'Adventure electrified',
    shortDescription: 'Dual-sport electric adventure bike for on and off-road.',
    longDescription:
      'Zero DSR/X brings adventure touring into the electric era with long-range capability, rugged suspension, and luggage-ready design. Explore further with silent, instant torque delivery.',
    image: '/assets/products/zero-dsrx.jpg',
    galleryImages: [
      '/assets/products/zero-dsrx.jpg',
      '/assets/gallery/motorcycle-adventure.jpg',
      '/assets/gallery/lifestyle-1.jpg',
    ],
    specs: {
      motor: 'Z-Force 75-10X, 100 hp',
      battery: '17.3 kWh',
      speed: '180 km/h',
      range: 'Up to 290 km city',
      weight: '247 kg',
      colors: ['Desert Sand', 'Asphalt Black'],
      releaseYear: 2025,
    },
    availability: 'limited',
    featured: true,
  },
  {
    id: '11',
    slug: 'giant-revolt-advanced-pro',
    brand: 'Giant',
    name: 'Revolt Advanced Pro',
    type: 'bicycle',
    tagline: 'Gravel exploration',
    shortDescription: 'Carbon gravel bike for limitless adventure routes.',
    longDescription:
      'Giant Revolt Advanced Pro combines lightweight carbon construction with clearance for wide tires and mounting points for bikepacking. From fire roads to gran fondos, it adapts to every adventure.',
    image: '/assets/products/giant-revolt.jpg',
    galleryImages: [
      '/assets/products/giant-revolt.jpg',
      '/assets/gallery/bike-gravel.jpg',
      '/assets/gallery/lifestyle-2.jpg',
    ],
    specs: {
      weight: '9.1 kg',
      colors: ['Smoke', 'Ocean Depth', 'Desert Tan'],
      releaseYear: 2024,
      frame: 'Advanced-Grade Composite',
      brakes: 'SRAM Force AXS hydraulic',
      speed: 'N/A',
      range: 'N/A',
    },
    availability: 'in-stock',
    featured: false,
  },
  {
    id: '12',
    slug: 'specialized-s-works-tarmac-sl8',
    brand: 'Specialized',
    name: 'S-Works Tarmac SL8',
    type: 'bicycle',
    tagline: 'Race-day perfection',
    shortDescription: 'The fastest race bike ever created by Specialized.',
    longDescription:
      'S-Works Tarmac SL8 is the result of relentless aerodynamic and weight optimization. WorldTour proven, it delivers unmatched stiffness-to-weight ratio for climbers and sprinters alike.',
    image: '/assets/products/specialized-tarmac.jpg',
    galleryImages: [
      '/assets/products/specialized-tarmac.jpg',
      '/assets/gallery/bike-road.jpg',
      '/assets/gallery/showroom-1.jpg',
    ],
    specs: {
      weight: '6.8 kg',
      colors: ['Satin Carbon', 'Team Red', 'Metallic White'],
      releaseYear: 2025,
      frame: 'FACT 12r Carbon',
      brakes: 'SRAM Red AXS',
      speed: 'N/A',
      range: 'N/A',
    },
    availability: 'limited',
    featured: false,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.type === product.type || p.brand === product.brand))
    .slice(0, limit)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
}

export function getProductsByType(type: string): Product[] {
  return products.filter((p) => p.type === type)
}
