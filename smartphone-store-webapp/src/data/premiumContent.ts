import {
  Building2,
  Camera,
  Cpu,
  Globe,
  Headphones,
  Shield,
  Smartphone,
  Sparkles,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface BentoItem {
  id: string
  titleKey: string
  descKey: string
  icon: LucideIcon
  image?: string
  className: string
  link?: string
}

export const bentoItems: BentoItem[] = [
  {
    id: 'flagships',
    titleKey: 'bento.flagshipsTitle',
    descKey: 'bento.flagshipsDesc',
    icon: Smartphone,
    image: '/assets/products/apple-iphone-16-pro.jpg',
    className: 'md:col-span-2 md:row-span-2',
    link: '/products',
  },
  {
    id: 'enterprise',
    titleKey: 'bento.enterpriseTitle',
    descKey: 'bento.enterpriseDesc',
    icon: Building2,
    className: 'md:col-span-1',
    link: '/contact',
  },
  {
    id: 'consultation',
    titleKey: 'bento.consultTitle',
    descKey: 'bento.consultDesc',
    icon: Headphones,
    className: 'md:col-span-1',
    link: '/contact',
  },
  {
    id: 'camera',
    titleKey: 'bento.cameraTitle',
    descKey: 'bento.cameraDesc',
    icon: Camera,
    image: '/assets/products/samsung-galaxy-s25-ultra.jpg',
    className: 'md:col-span-1 md:row-span-2',
    link: '/gallery',
  },
  {
    id: 'performance',
    titleKey: 'bento.perfTitle',
    descKey: 'bento.perfDesc',
    icon: Cpu,
    className: 'md:col-span-1',
  },
  {
    id: 'global',
    titleKey: 'bento.globalTitle',
    descKey: 'bento.globalDesc',
    icon: Globe,
    className: 'md:col-span-1',
  },
  {
    id: 'warranty',
    titleKey: 'bento.warrantyTitle',
    descKey: 'bento.warrantyDesc',
    icon: Shield,
    className: 'md:col-span-1',
    link: '/faq',
  },
  {
    id: 'innovation',
    titleKey: 'bento.innovTitle',
    descKey: 'bento.innovDesc',
    icon: Sparkles,
    image: '/assets/products/xiaomi-15-ultra.jpg',
    className: 'md:col-span-2',
    link: '/products?brand=xiaomi',
  },
  {
    id: 'fast',
    titleKey: 'bento.fastTitle',
    descKey: 'bento.fastDesc',
    icon: Zap,
    className: 'md:col-span-1',
  },
]

export interface WhyChooseItem {
  id: string
  titleKey: string
  descKey: string
  icon: LucideIcon
  highlight?: string
}

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: '1',
    titleKey: 'home.why1Title',
    descKey: 'home.why1Desc',
    icon: Sparkles,
    highlight: '48+',
  },
  {
    id: '2',
    titleKey: 'home.why2Title',
    descKey: 'home.why2Desc',
    icon: Headphones,
    highlight: '24/7',
  },
  {
    id: '3',
    titleKey: 'home.why3Title',
    descKey: 'home.why3Desc',
    icon: Building2,
    highlight: '2,500+',
  },
  {
    id: '4',
    titleKey: 'home.why4Title',
    descKey: 'home.why4Desc',
    icon: Shield,
  },
  {
    id: '5',
    titleKey: 'whyChoose.w5Title',
    descKey: 'whyChoose.w5Desc',
    icon: Globe,
    highlight: '32',
  },
  {
    id: '6',
    titleKey: 'whyChoose.w6Title',
    descKey: 'whyChoose.w6Desc',
    icon: Zap,
  },
]

export interface FloatingCard {
  id: string
  titleKey: string
  descKey: string
  icon: LucideIcon
  depth: number
}

export const floatingCards: FloatingCard[] = [
  { id: '1', titleKey: 'floating.c1Title', descKey: 'floating.c1Desc', icon: Smartphone, depth: 1 },
  { id: '2', titleKey: 'floating.c2Title', descKey: 'floating.c2Desc', icon: Shield, depth: 2 },
  { id: '3', titleKey: 'floating.c3Title', descKey: 'floating.c3Desc', icon: Headphones, depth: 1.5 },
  { id: '4', titleKey: 'floating.c4Title', descKey: 'floating.c4Desc', icon: Sparkles, depth: 2.5 },
]

export interface ScrollStorySlide {
  id: string
  titleKey: string
  descKey: string
  image: string
}

export const scrollStorySlides: ScrollStorySlide[] = [
  {
    id: '1',
    titleKey: 'story.s1Title',
    descKey: 'story.s1Desc',
    image: '/assets/images/showroom.jpg',
  },
  {
    id: '2',
    titleKey: 'story.s2Title',
    descKey: 'story.s2Desc',
    image: '/assets/images/technology.jpg',
  },
  {
    id: '3',
    titleKey: 'story.s3Title',
    descKey: 'story.s3Desc',
    image: '/assets/images/retail.jpg',
  },
]
