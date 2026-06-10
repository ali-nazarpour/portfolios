export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  quote: string
  vehicle: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rachel Morrison',
    role: 'Fleet Operations Director',
    company: 'Bay Area Transit',
    avatar: '/assets/testimonials/avatar-1.jpg',
    rating: 5,
    quote:
      'RideHub transformed our municipal fleet procurement. Their expert curation and dedicated support helped us deploy 120 electric scooters across downtown corridors with zero downtime.',
    vehicle: 'Segway Ninebot Fleet',
  },
  {
    id: '2',
    name: 'Daniel Okoye',
    role: 'CEO',
    company: 'VeloCity Logistics',
    avatar: '/assets/testimonials/avatar-2.jpg',
    rating: 5,
    quote:
      'From first consultation to delivery, the RideHub team exceeded expectations. Our cargo e-bike fleet has cut last-mile delivery times by 34% while reducing our carbon footprint.',
    vehicle: 'Trek Fuel EXe 9.8',
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    role: 'Head of Sustainability',
    company: 'GreenMove Corp',
    avatar: '/assets/testimonials/avatar-3.jpg',
    rating: 5,
    quote:
      'The showroom experience alone is worth the visit. RideHub helped us find the perfect electric motorcycles for our executive team — premium quality with unmatched after-sales support.',
    vehicle: 'Zero SR/F',
  },
  {
    id: '4',
    name: 'Michael Torres',
    role: 'Adventure Enthusiast',
    company: 'Personal Client',
    avatar: '/assets/testimonials/avatar-4.jpg',
    rating: 5,
    quote:
      'I have purchased three vehicles through RideHub over the years. Their specialists truly understand performance cycling and always match you with the right machine for your riding style.',
    vehicle: 'Giant Trance X Advanced',
  },
  {
    id: '5',
    name: 'Amanda Chen',
    role: 'Urban Mobility Lead',
    company: 'EcoFleet Solutions',
    avatar: '/assets/testimonials/avatar-5.jpg',
    rating: 5,
    quote:
      'RideHub is our go-to partner for corporate mobility programs. Their business team delivered a turnkey solution for 200+ employees with flexible financing and white-glove onboarding.',
    vehicle: 'Xiaomi Pro 2 Fleet',
  },
]
