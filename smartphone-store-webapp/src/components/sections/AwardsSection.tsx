import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { awards } from '@/data/awards'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function AwardsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('awards.title')} subtitle={t('awards.subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award, index) => (
            <ScrollReveal key={award.id} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group glass rounded-2xl p-6 h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <award.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {award.year}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(award.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(award.descKey)}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
