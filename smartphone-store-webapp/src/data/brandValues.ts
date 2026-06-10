import { Eye, Heart, Lightbulb, Rocket, Shield, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface BrandValue {
  id: string
  titleKey: string
  descKey: string
  icon: LucideIcon
}

export const brandValues: BrandValue[] = [
  { id: '1', titleKey: 'values.v1Title', descKey: 'values.v1Desc', icon: Lightbulb },
  { id: '2', titleKey: 'values.v2Title', descKey: 'values.v2Desc', icon: Shield },
  { id: '3', titleKey: 'values.v3Title', descKey: 'values.v3Desc', icon: Heart },
  { id: '4', titleKey: 'values.v4Title', descKey: 'values.v4Desc', icon: Rocket },
  { id: '5', titleKey: 'values.v5Title', descKey: 'values.v5Desc', icon: Eye },
  { id: '6', titleKey: 'values.v6Title', descKey: 'values.v6Desc', icon: Users },
]

export const missionVision = {
  missionTitleKey: 'values.missionTitle',
  missionDescKey: 'values.missionDesc',
  visionTitleKey: 'values.visionTitle',
  visionDescKey: 'values.visionDesc',
}
