import { Award, BadgeCheck, Shield, Star, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface AwardItem {
  id: string
  titleKey: string
  descKey: string
  year: string
  icon: LucideIcon
}

export const awards: AwardItem[] = [
  {
    id: '1',
    titleKey: 'awards.a1Title',
    descKey: 'awards.a1Desc',
    year: '2024',
    icon: Trophy,
  },
  {
    id: '2',
    titleKey: 'awards.a2Title',
    descKey: 'awards.a2Desc',
    year: '2024',
    icon: Award,
  },
  {
    id: '3',
    titleKey: 'awards.a3Title',
    descKey: 'awards.a3Desc',
    year: '2023',
    icon: Shield,
  },
  {
    id: '4',
    titleKey: 'awards.a4Title',
    descKey: 'awards.a4Desc',
    year: '2023',
    icon: BadgeCheck,
  },
  {
    id: '5',
    titleKey: 'awards.a5Title',
    descKey: 'awards.a5Desc',
    year: '2025',
    icon: Star,
  },
  {
    id: '6',
    titleKey: 'awards.a6Title',
    descKey: 'awards.a6Desc',
    year: '2024',
    icon: Trophy,
  },
]
