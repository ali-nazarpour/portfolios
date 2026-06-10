export interface Testimonial {
  id: string
  nameKey: string
  roleKey: string
  companyKey: string
  quoteKey: string
  rating: number
  avatar: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    nameKey: 'testimonials.t1Name',
    roleKey: 'testimonials.t1Role',
    companyKey: 'testimonials.t1Company',
    quoteKey: 'testimonials.t1Quote',
    rating: 5,
    avatar: '/assets/team/sarah-chen.jpg',
  },
  {
    id: '2',
    nameKey: 'testimonials.t2Name',
    roleKey: 'testimonials.t2Role',
    companyKey: 'testimonials.t2Company',
    quoteKey: 'testimonials.t2Quote',
    rating: 5,
    avatar: '/assets/team/marcus-weber.jpg',
  },
  {
    id: '3',
    nameKey: 'testimonials.t3Name',
    roleKey: 'testimonials.t3Role',
    companyKey: 'testimonials.t3Company',
    quoteKey: 'testimonials.t3Quote',
    rating: 5,
    avatar: '/assets/team/elena-rodriguez.jpg',
  },
  {
    id: '4',
    nameKey: 'testimonials.t4Name',
    roleKey: 'testimonials.t4Role',
    companyKey: 'testimonials.t4Company',
    quoteKey: 'testimonials.t4Quote',
    rating: 5,
    avatar: '/assets/team/james-park.jpg',
  },
  {
    id: '5',
    nameKey: 'testimonials.t5Name',
    roleKey: 'testimonials.t5Role',
    companyKey: 'testimonials.t5Company',
    quoteKey: 'testimonials.t5Quote',
    rating: 5,
    avatar: '/assets/team/amira-hassan.jpg',
  },
]
