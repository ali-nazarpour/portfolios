export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ultimate-ebike-buyers-guide-2026',
    title: 'The Ultimate E-Bike Buyer\'s Guide for 2026',
    excerpt:
      'Everything you need to know before investing in a premium electric bicycle — motor types, battery tech, and test ride tips.',
    content:
      'Electric bicycles have evolved dramatically. From lightweight trail e-MTBs to urban commuters, understanding motor placement, battery capacity, and frame geometry is essential. At RideHub, we recommend starting with your primary use case: trail, road, or hybrid. Schedule a showroom visit to experience the natural ride feel of harmonic drive systems versus hub motors.',
    image: '/assets/blog/ebike-guide.jpg',
    category: 'E-Bikes',
    author: 'Elena Rodriguez',
    date: '2026-05-12',
    readTime: '8 min',
    featured: true,
  },
  {
    id: '2',
    slug: 'urban-scooter-commute-revolution',
    title: 'How Electric Scooters Are Revolutionizing Urban Commutes',
    excerpt:
      'Discover why cities and corporations are adopting premium e-scooters for sustainable last-mile mobility.',
    content:
      'Urban congestion demands smarter mobility solutions. Premium electric scooters offer 40+ km range, regenerative braking, and fleet management integrations that make them ideal for corporate campuses and city transit hubs.',
    image: '/assets/blog/scooter-commute.jpg',
    category: 'Scooters',
    author: 'James Okonkwo',
    date: '2026-04-28',
    readTime: '6 min',
  },
  {
    id: '3',
    slug: 'electric-motorcycle-future',
    title: 'The Future of Electric Motorcycles Is Here',
    excerpt:
      'Zero-emission performance that rivals combustion — exploring the latest in electric motorcycle technology.',
    content:
      'Electric motorcycles now deliver 200+ km range, instant torque, and whisper-quiet operation. Brands like Zero Motorcycles are redefining what premium two-wheel mobility looks like for enthusiasts and fleet operators alike.',
    image: '/assets/blog/motorcycle-future.jpg',
    category: 'Motorcycles',
    author: 'Marcus Webb',
    date: '2026-04-15',
    readTime: '7 min',
  },
  {
    id: '4',
    slug: 'showroom-visit-tips',
    title: '5 Tips for Getting the Most From Your Showroom Visit',
    excerpt:
      'Plan the perfect test ride experience at RideHub\'s flagship San Francisco showroom.',
    content:
      'Bring your riding gear, know your budget range, and come with questions about warranty and service. Our specialists will guide you through hands-on exploration of bicycles, scooters, and motorcycles tailored to your lifestyle.',
    image: '/assets/blog/showroom-tips.jpg',
    category: 'Showroom',
    author: 'Amy Foster',
    date: '2026-03-30',
    readTime: '4 min',
  },
]

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0]
}

export function getRecentPosts(limit = 3): BlogPost[] {
  return blogPosts.filter((p) => !p.featured).slice(0, limit)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
