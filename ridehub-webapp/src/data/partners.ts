export interface Partner {
  id: string
  name: string
  logo: string
}

export const partners: Partner[] = [
  { id: 'trek', name: 'Trek', logo: '/assets/brands/trek.svg' },
  { id: 'giant', name: 'Giant', logo: '/assets/brands/giant.svg' },
  { id: 'specialized', name: 'Specialized', logo: '/assets/brands/specialized.svg' },
  { id: 'segway', name: 'Segway', logo: '/assets/brands/segway.svg' },
  { id: 'xiaomi', name: 'Xiaomi', logo: '/assets/brands/xiaomi.svg' },
  { id: 'zero', name: 'Zero', logo: '/assets/brands/zero.svg' },
  { id: 'bay-transit', name: 'Bay Area Transit', logo: '/assets/partners/bay-transit.svg' },
  { id: 'velocity', name: 'VeloCity', logo: '/assets/partners/velocity.svg' },
  { id: 'greenmove', name: 'GreenMove', logo: '/assets/partners/greenmove.svg' },
  { id: 'ecofleet', name: 'EcoFleet', logo: '/assets/partners/ecofleet.svg' },
]
