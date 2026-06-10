export interface CaseStudy {
  id: string
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  outcome: string
  metric: string
  metricLabel: string
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Municipal E-Scooter Fleet Deployment',
    client: 'Bay Area Transit Authority',
    industry: 'Public Transit',
    challenge:
      'Replace aging shuttle routes with sustainable last-mile connectivity across 12 downtown stations.',
    solution:
      'RideHub designed and deployed 120 Segway Ninebot units with charging infrastructure, fleet management software, and staff training.',
    outcome:
      'First-mile connectivity improved by 47%, with 2.1M zero-emission trips in the first year of operation.',
    metric: '47%',
    metricLabel: 'Connectivity Improvement',
    image: '/assets/case-studies/municipal-1.jpg',
  },
  {
    id: '2',
    title: 'Corporate Last-Mile Delivery Fleet',
    client: 'VeloCity Logistics',
    industry: 'Logistics',
    challenge:
      'Reduce delivery times and carbon emissions in dense urban zones while maintaining package security.',
    solution:
      'Custom cargo e-bike fleet with Trek Fuel EXe models, route optimization, and on-site maintenance contracts.',
    outcome:
      'Delivery times dropped 34%, fuel costs eliminated, and employee satisfaction scores rose to 94%.',
    metric: '34%',
    metricLabel: 'Faster Deliveries',
    image: '/assets/case-studies/fleet-1.jpg',
  },
  {
    id: '3',
    title: 'Executive Electric Motorcycle Program',
    client: 'GreenMove Corporation',
    industry: 'Technology',
    challenge:
      'Offer premium sustainable commuting options for C-suite executives with charging at corporate campus.',
    solution:
      'Curated Zero SR/F collection with dedicated charging bays, insurance packages, and concierge service.',
    outcome:
      '100% executive adoption within 6 months, saving an estimated 18 tons of CO₂ annually.',
    metric: '18t',
    metricLabel: 'CO₂ Saved Yearly',
    image: '/assets/case-studies/corporate-1.jpg',
  },
]
