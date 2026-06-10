import type { LucideIcon } from 'lucide-react'
import { Award, Shield, Headphones, Store, Zap, Globe, Users, Leaf } from 'lucide-react'

export interface WhyUsFeature {
  id: string
  icon: LucideIcon
  titleKey: string
  descKey: string
  stat?: string
}

export const whyUsFeatures: WhyUsFeature[] = [
  { id: '1', icon: Award, titleKey: 'home.whyUs.expertise', descKey: 'home.whyUs.expertiseDesc', stat: '15+' },
  { id: '2', icon: Shield, titleKey: 'home.whyUs.quality', descKey: 'home.whyUs.qualityDesc', stat: '24' },
  { id: '3', icon: Headphones, titleKey: 'home.whyUs.service', descKey: 'home.whyUs.serviceDesc', stat: '24h' },
  { id: '4', icon: Store, titleKey: 'home.whyUs.experience', descKey: 'home.whyUs.experienceDesc', stat: '8k' },
  { id: '5', icon: Zap, titleKey: 'home.whyUs.innovation', descKey: 'home.whyUs.innovationDesc', stat: '180+' },
  { id: '6', icon: Globe, titleKey: 'home.whyUs.global', descKey: 'home.whyUs.globalDesc', stat: '18' },
  { id: '7', icon: Users, titleKey: 'home.whyUs.community', descKey: 'home.whyUs.communityDesc', stat: '12k' },
  { id: '8', icon: Leaf, titleKey: 'home.whyUs.sustainability', descKey: 'home.whyUs.sustainabilityDesc', stat: '0' },
]

export interface AchievementStat {
  key: string
  value: number
  suffix?: string
  prefix?: string
}

export const achievementStats: AchievementStat[] = [
  { key: 'customers', value: 12500, suffix: '+' },
  { key: 'delivered', value: 8500, suffix: '+' },
  { key: 'years', value: 15, suffix: '+' },
  { key: 'countries', value: 18, suffix: '' },
  { key: 'awards', value: 12, suffix: '+' },
  { key: 'growth', value: 340, suffix: '%', prefix: '' },
]
