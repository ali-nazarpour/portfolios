export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  x?: string
  leadership: boolean
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: '15 years shaping premium mobility retail. Former product lead at a global cycling brand.',
    image: '/assets/team/sarah-chen.jpg',
    linkedin: '#',
    x: '#',
    leadership: true,
  },
  {
    id: '2',
    name: 'Marcus Webb',
    role: 'Chief Operating Officer',
    bio: 'Operations strategist with expertise in showroom experience and fleet deployment at scale.',
    image: '/assets/team/marcus-webb.jpg',
    linkedin: '#',
    leadership: true,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Head of Curation',
    bio: 'Mobility specialist who hand-selects every vehicle in the RideHub collection.',
    image: '/assets/team/elena-rodriguez.jpg',
    linkedin: '#',
    leadership: true,
  },
  {
    id: '4',
    name: 'James Okonkwo',
    role: 'Business Development',
    bio: 'Leads corporate and municipal fleet partnerships across North America.',
    image: '/assets/team/james-okonkwo.jpg',
    linkedin: '#',
    leadership: false,
  },
  {
    id: '5',
    name: 'Amy Foster',
    role: 'Customer Experience',
    bio: 'Ensures every client journey from inquiry to delivery is seamless and personal.',
    image: '/assets/team/amy-foster.jpg',
    linkedin: '#',
    leadership: false,
  },
  {
    id: '6',
    name: 'David Kim',
    role: 'Technical Specialist',
    bio: 'Certified technician across all partner brands. Expert in e-mobility diagnostics.',
    image: '/assets/team/david-kim.jpg',
    linkedin: '#',
    leadership: false,
  },
]
