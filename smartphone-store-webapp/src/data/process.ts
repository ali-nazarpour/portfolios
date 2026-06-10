import { ClipboardCheck, Headphones, Package, Search, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ProcessStep {
  id: string
  step: number
  titleKey: string
  descKey: string
  icon: LucideIcon
}

export const processSteps: ProcessStep[] = [
  { id: '1', step: 1, titleKey: 'process.s1Title', descKey: 'process.s1Desc', icon: Search },
  { id: '2', step: 2, titleKey: 'process.s2Title', descKey: 'process.s2Desc', icon: ClipboardCheck },
  { id: '3', step: 3, titleKey: 'process.s3Title', descKey: 'process.s3Desc', icon: Package },
  { id: '4', step: 4, titleKey: 'process.s4Title', descKey: 'process.s4Desc', icon: Truck },
  { id: '5', step: 5, titleKey: 'process.s5Title', descKey: 'process.s5Desc', icon: Headphones },
]
