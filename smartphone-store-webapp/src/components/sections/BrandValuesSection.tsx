import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { brandValues, missionVision } from '@/data/brandValues'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BrandValuesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 premium-gradient-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('values.title')} subtitle={t('values.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ScrollReveal>
            <div className="glass rounded-3xl p-8 h-full border-l-4 border-l-primary">
              <h3 className="font-display text-2xl font-semibold mb-4">
                {t(missionVision.missionTitleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t(missionVision.missionDescKey)}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="glass rounded-3xl p-8 h-full border-l-4 border-l-purple-500">
              <h3 className="font-display text-2xl font-semibold mb-4">
                {t(missionVision.visionTitleKey)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{t(missionVision.visionDescKey)}</p>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandValues.map((value, index) => (
            <ScrollReveal key={value.id} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 h-full group"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(value.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(value.descKey)}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
