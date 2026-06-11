import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  BatteryCharging,
  Bike,
  MapPin,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BentoGridSection() {
  const { t } = useTranslation()

  const items: BentoCardItemProps[] = [
    {
      icon: Bike,
      title: t('home.bento.bicycles'),
      description: t('home.bento.bicyclesDesc'),
      href: '/products?type=bicycle',
      variant: 'featured',
      delay: 0,
    },
    {
      icon: Zap,
      title: t('home.bento.electric'),
      description: t('home.bento.electricDesc'),
      delay: 0.05,
    },
    {
      icon: BatteryCharging,
      title: t('home.bento.motorcycles'),
      description: t('home.bento.motorcyclesDesc'),
      href: '/products?type=motorcycle',
      variant: 'accent',
      delay: 0.1,
    },
    {
      icon: Shield,
      title: t('home.bento.warranty'),
      description: t('home.bento.warrantyDesc'),
      delay: 0.15,
    },
    {
      icon: MapPin,
      title: t('home.bento.showroom'),
      description: t('home.bento.showroomDesc'),
      href: '/contact',
      delay: 0.2,
    },
    {
      icon: Users,
      title: t('home.bento.fleet'),
      description: t('home.bento.fleetDesc'),
      variant: 'accent',
      delay: 0.25,
    },
    {
      icon: Sparkles,
      title: t('home.bento.curated'),
      description: t('home.bento.curatedDesc'),
      delay: 0.3,
    },
  ]

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.bento.badge')} title={t('home.bento.title')} subtitle={t('home.bento.subtitle')} />
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <BentoCardItem key={item.title} learnMoreLabel={t('common.learnMore')} {...item} />
        ))}
      </div>
    </SectionShell>
  )
}

type BentoVariant = 'default' | 'featured' | 'accent'

interface BentoCardItemProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  variant?: BentoVariant
  delay?: number
  learnMoreLabel?: string
}

function BentoCardItem({
  icon: Icon,
  title,
  description,
  href,
  variant = 'default',
  delay = 0,
  learnMoreLabel,
}: BentoCardItemProps) {
  const variantClass: Record<BentoVariant, string> = {
    default: '',
    featured: 'bg-gradient-to-br from-primary/15 via-primary/5 to-transparent',
    accent: 'bg-gradient-to-br from-violet-500/10 to-pink-500/10',
  }

  return (
    <BentoCard delay={delay} className={cn('min-h-[168px]', variantClass[variant])}>
      <Icon className="h-6 w-6 text-primary mb-3 shrink-0" aria-hidden />
      <h3 className="font-display text-base font-semibold leading-snug">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">{description}</p>
      {href && learnMoreLabel ? (
        <Link
          to={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          {learnMoreLabel} <ArrowUpRight className="h-4 w-4 shrink-0" />
        </Link>
      ) : null}
    </BentoCard>
  )
}

function BentoCard({
  children,
  className,
  delay,
}: {
  children: ReactNode
  className?: string
  delay: number
}) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className={cn(
          'rounded-2xl glass-card hover:border-primary/25 transition-colors h-full overflow-hidden',
          'p-6 flex flex-col',
          className,
        )}
      >
        {children}
      </motion.div>
    </ScrollReveal>
  )
}
