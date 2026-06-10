export interface TeamMember {
  id: string
  nameKey: string
  roleKey: string
  bioKey: string
  image: string
  linkedin?: string
  x?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    nameKey: 'team.m1Name',
    roleKey: 'team.m1Role',
    bioKey: 'team.m1Bio',
    image: '/assets/team/david-kim.jpg',
    linkedin: '#',
    x: '#',
  },
  {
    id: '2',
    nameKey: 'team.m2Name',
    roleKey: 'team.m2Role',
    bioKey: 'team.m2Bio',
    image: '/assets/team/sarah-chen.jpg',
    linkedin: '#',
  },
  {
    id: '3',
    nameKey: 'team.m3Name',
    roleKey: 'team.m3Role',
    bioKey: 'team.m3Bio',
    image: '/assets/team/marcus-weber.jpg',
    linkedin: '#',
    x: '#',
  },
  {
    id: '4',
    nameKey: 'team.m4Name',
    roleKey: 'team.m4Role',
    bioKey: 'team.m4Bio',
    image: '/assets/team/elena-rodriguez.jpg',
    linkedin: '#',
  },
]
