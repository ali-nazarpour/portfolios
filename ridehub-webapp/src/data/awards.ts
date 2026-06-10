export interface Award {
  id: string
  title: string
  organization: string
  year: string
  description: string
  icon: string
}

export const awards: Award[] = [
  {
    id: '1',
    title: 'Best Premium Mobility Retailer',
    organization: 'Mobility Excellence Awards',
    year: '2025',
    description: 'Recognized for outstanding curation and customer experience in North America.',
    icon: '/assets/awards/trophy.svg',
  },
  {
    id: '2',
    title: 'Sustainability Leadership',
    organization: 'Green Transit Council',
    year: '2024',
    description: 'Awarded for promoting zero-emission fleet solutions and eco-friendly mobility.',
    icon: '/assets/awards/leaf.svg',
  },
  {
    id: '3',
    title: 'ISO 9001 Certified',
    organization: 'International Standards Org',
    year: '2023',
    description: 'Quality management certification for operations and customer service excellence.',
    icon: '/assets/awards/certified.svg',
  },
  {
    id: '4',
    title: 'Top 50 E-Mobility Showrooms',
    organization: 'EV World Magazine',
    year: '2025',
    description: 'Ranked among the world\'s premier destinations for electric mobility exploration.',
    icon: '/assets/awards/star.svg',
  },
  {
    id: '5',
    title: 'Authorized Dealer Excellence',
    organization: 'Trek Bicycle Corporation',
    year: '2024',
    description: 'Highest tier dealer recognition for sales, service, and brand representation.',
    icon: '/assets/awards/badge.svg',
  },
  {
    id: '6',
    title: 'Community Impact Award',
    organization: 'San Francisco Chamber',
    year: '2023',
    description: 'Honored for supporting local cycling initiatives and urban mobility programs.',
    icon: '/assets/awards/community.svg',
  },
]
