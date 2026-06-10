export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  highlight?: boolean
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    year: '2010',
    title: 'RideHub Founded',
    description:
      'Sarah Chen opens the first RideHub showroom in San Francisco with a vision to unite premium bicycles, scooters, and motorcycles under one roof.',
    highlight: true,
  },
  {
    id: '2',
    year: '2013',
    title: 'First Brand Partnerships',
    description:
      'Signed exclusive showcase agreements with Trek, Giant, and Specialized — establishing RideHub as a trusted premium retailer.',
  },
  {
    id: '3',
    year: '2016',
    title: 'Electric Mobility Expansion',
    description:
      'Added Segway and Xiaomi to the collection, pioneering the electric scooter category in the Bay Area market.',
  },
  {
    id: '4',
    year: '2019',
    title: 'Corporate Fleet Division',
    description:
      'Launched dedicated business solutions serving municipalities and corporations with turnkey fleet deployments.',
    highlight: true,
  },
  {
    id: '5',
    year: '2022',
    title: 'Zero Motorcycles Partnership',
    description:
      'Became an authorized showcase partner for Zero Motorcycles, completing the premium e-mobility trifecta.',
  },
  {
    id: '6',
    year: '2025',
    title: '12,500+ Clients Milestone',
    description:
      'Celebrated serving over 12,500 clients across 18 countries with 24 partner brands and 180+ vehicles showcased.',
    highlight: true,
  },
]
