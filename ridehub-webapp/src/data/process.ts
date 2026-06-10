export interface ProcessStep {
  id: string
  step: number
  titleKey: string
  descKey: string
}

export const processSteps: ProcessStep[] = [
  { id: '1', step: 1, titleKey: 'home.process.discover', descKey: 'home.process.discoverDesc' },
  { id: '2', step: 2, titleKey: 'home.process.experience', descKey: 'home.process.experienceDesc' },
  { id: '3', step: 3, titleKey: 'home.process.customize', descKey: 'home.process.customizeDesc' },
  { id: '4', step: 4, titleKey: 'home.process.deliver', descKey: 'home.process.deliverDesc' },
  { id: '5', step: 5, titleKey: 'home.process.support', descKey: 'home.process.supportDesc' },
]
