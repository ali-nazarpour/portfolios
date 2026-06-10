import { Target, Eye, Heart, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface BrandValue {
  id: string
  titleKey: string
  descKey: string
  icon: LucideIcon
  color: string
}

export const brandValues: BrandValue[] = [
  { id: 'mission', titleKey: 'home.values.mission', descKey: 'home.values.missionDesc', icon: Target, color: 'from-violet-500/20 to-purple-500/10' },
  { id: 'vision', titleKey: 'home.values.vision', descKey: 'home.values.visionDesc', icon: Eye, color: 'from-blue-500/20 to-cyan-500/10' },
  { id: 'culture', titleKey: 'home.values.culture', descKey: 'home.values.cultureDesc', icon: Heart, color: 'from-pink-500/20 to-rose-500/10' },
  { id: 'innovation', titleKey: 'home.values.innovation', descKey: 'home.values.innovationDesc', icon: Sparkles, color: 'from-amber-500/20 to-orange-500/10' },
]
