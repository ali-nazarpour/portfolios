import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Bike, Zap, Shield, MapPin, Users, Sparkles, ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BentoGridSection() {
  const { t } = useTranslation()

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.bento.badge')} title={t('home.bento.title')} subtitle={t('home.bento.subtitle')} />
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
        <BentoCard className="col-span-2 row-span-2 p-8 flex flex-col justify-between bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" delay={0}>
          <div>
            <Bike className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">{t('home.bento.bicycles')}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{t('home.bento.bicyclesDesc')}</p>
          </div>
          <Link to="/products?type=bicycle" className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
            {t('common.learnMore')} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </BentoCard>

        <BentoCard className="col-span-1 row-span-1 p-5 flex flex-col justify-center" delay={0.05}>
          <Zap className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-display font-semibold">{t('home.bento.electric')}</h3>
          <p className="text-xs text-muted-foreground mt-1">{t('home.bento.electricDesc')}</p>
        </BentoCard>

        <BentoCard className="col-span-1 row-span-2 p-5 relative overflow-hidden" delay={0.1}>
          <img src="/assets/gallery/motorcycle-road.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
          <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="font-display font-bold text-lg">{t('home.bento.motorcycles')}</h3>
            <p className="text-xs text-muted-foreground">{t('home.bento.motorcyclesDesc')}</p>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 row-span-1 p-5" delay={0.15}>
          <Shield className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-display font-semibold text-sm">{t('home.bento.warranty')}</h3>
        </BentoCard>

        <BentoCard className="col-span-2 row-span-1 p-5 flex items-center gap-4" delay={0.2}>
          <MapPin className="h-8 w-8 text-primary shrink-0" />
          <div>
            <h3 className="font-display font-semibold">{t('home.bento.showroom')}</h3>
            <p className="text-xs text-muted-foreground">{t('home.bento.showroomDesc')}</p>
          </div>
        </BentoCard>

        <BentoCard className="col-span-1 row-span-1 p-5 bg-gradient-to-br from-violet-500/10 to-pink-500/10" delay={0.25}>
          <Users className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-display font-semibold text-sm">{t('home.bento.fleet')}</h3>
        </BentoCard>

        <BentoCard className="col-span-1 row-span-1 p-5" delay={0.3}>
          <Sparkles className="h-6 w-6 text-primary mb-2" />
          <h3 className="font-display font-semibold text-sm">{t('home.bento.curated')}</h3>
        </BentoCard>
      </div>
    </SectionShell>
  )
}

function BentoCard({ children, className, delay }: { children: ReactNode; className?: string; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ type: 'spring', stiffness: 400 }}
        className={`rounded-2xl glass-card hover:border-primary/25 transition-colors h-full ${className ?? ''}`}
      >
        {children}
      </motion.div>
    </ScrollReveal>
  )
}
