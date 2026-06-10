export const siteConfig = {
  name: 'RideHub',
  tagline: 'Premium Mobility Showcase',
  description:
    'RideHub is a premium corporate showcase for world-class bicycles, electric scooters, and motorcycles. Discover engineering excellence, curated collections, and expert guidance.',
  url: 'https://ridehub.com',
  phone: '+1 (555) 847-2900',
  email: 'hello@ridehub.com',
  whatsapp: '+15558472900',
  address: {
    street: '2847 Velocity Boulevard',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    country: 'United States',
  },
  coordinates: {
    lat: 37.7694,
    lng: -122.3882,
  },
  workingHours: {
    weekdays: 'Mon – Fri: 9:00 AM – 7:00 PM',
    saturday: 'Sat: 10:00 AM – 6:00 PM',
    sunday: 'Sun: 11:00 AM – 5:00 PM',
  },
  social: {
    instagram: 'https://instagram.com/ridehub',
    x: 'https://x.com/ridehub',
    facebook: 'https://facebook.com/ridehub',
    whatsapp: 'https://wa.me/15558472900',
    youtube: 'https://youtube.com/@ridehub',
  },
  stats: {
    brands: 24,
    products: 180,
    customers: 12500,
    years: 15,
  },
}

export const navLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.products', href: '/products' },
  { labelKey: 'nav.gallery', href: '/gallery' },
  { labelKey: 'nav.blog', href: '/blog' },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.contact', href: '/contact' },
  { labelKey: 'nav.faq', href: '/faq' },
]

export const vehicleTypes = ['bicycle', 'scooter', 'motorcycle'] as const

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const
