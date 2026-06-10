import { useTranslation } from 'react-i18next'
import { Globe, Star, Trophy, Users } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const stats = [
  { value: 2500, labelKey: 'stats.clients', suffix: '+', icon: Users },
  { value: 48, labelKey: 'stats.products', suffix: '+', icon: Star },
  { value: 15, labelKey: 'stats.years', suffix: '+', icon: Trophy },
  { value: 32, labelKey: 'stats.countries', suffix: '', icon: Globe },
  { value: 12000, labelKey: 'stats.delivered', suffix: '+', icon: Star },
  { value: 18, labelKey: 'stats.awards', suffix: '', icon: Trophy },
]

export function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('stats.title')} subtitle={t('stats.subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.labelKey} delay={index * 0.08}>
              <div className="glass rounded-2xl p-6 text-center hover:glow transition-shadow">
                <div className="p-2 rounded-lg bg-primary/10 w-fit mx-auto mb-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-muted-foreground mt-2 text-xs md:text-sm">{t(stat.labelKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
