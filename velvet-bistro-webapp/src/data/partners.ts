export interface Partner {
  id: string
  name: string
  logo: string
}

export const partners: Partner[] = [
  { id: 'michelin', name: 'Michelin Guide', logo: '/assets/partners/michelin.svg' },
  { id: 'gault', name: 'Gault & Millau', logo: '/assets/partners/gault-millau.svg' },
  { id: 'world-luxury', name: 'World Luxury Restaurant Awards', logo: '/assets/partners/world-luxury.svg' },
  { id: 'tripadvisor', name: 'TripAdvisor', logo: '/assets/partners/tripadvisor.svg' },
  { id: 'swiss-tourism', name: 'Switzerland Tourism', logo: '/assets/partners/swiss-tourism.svg' },
  { id: 'lavazza', name: 'Lavazza Premium', logo: '/assets/partners/lavazza.svg' },
  { id: 'valrhona', name: 'Valrhona Chocolate', logo: '/assets/partners/valrhona.svg' },
  { id: 'perrier-jouet', name: 'Perrier-Jouët', logo: '/assets/partners/perrier-jouet.svg' },
]
