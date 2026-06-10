import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { whyUsFeatures } from '@/data/premiumContent'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function WhyChooseUsSection() {
  const { t } = useTranslation()

  return (
    <SectionShell variant="muted">
      <div className="absolute inset-0 gradient-bg opacity-40 pointer-events-none" />
      <ScrollReveal>
        <SectionHeading badge={t('home.whyUs.badge')} title={t('home.whyUs.title')} subtitle={t('home.whyUs.subtitle')} />
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyUsFeatures.map(({ id, icon: Icon, titleKey, descKey, stat }, i) => (
          <ScrollReveal key={id} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="group relative p-6 rounded-2xl glass-card h-full overflow-hidden"
            >
              {stat && (
                <span className="absolute top-4 right-4 font-display text-2xl font-bold text-primary/15 group-hover:text-primary/25 transition-colors">
                  {stat}
                </span>
              )}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{t(titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(descKey)}</p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
