import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { brandValues } from '@/data/brandValues'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BrandValuesSection() {
  const { t } = useTranslation()

  return (
    <SectionShell variant="muted">
      <div className="absolute inset-0 gradient-bg opacity-40 pointer-events-none" />
      <ScrollReveal>
        <SectionHeading badge={t('home.values.badge')} title={t('home.values.title')} subtitle={t('home.values.subtitle')} />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brandValues.map(({ id, icon: Icon, titleKey, descKey, color }, i) => (
          <ScrollReveal key={id} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              className={`relative p-8 rounded-2xl glass-card overflow-hidden h-full bg-gradient-to-br ${color}`}
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-background/50 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{t(titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(descKey)}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
