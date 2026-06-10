import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { whyChooseItems } from '@/data/premiumContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function WhyChooseUsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 premium-gradient-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('home.whyTitle')} subtitle={t('home.whySubtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass rounded-2xl p-6 h-full relative overflow-hidden group"
              >
                {item.highlight && (
                  <span className="absolute top-4 right-4 text-2xl font-display font-bold text-gradient opacity-80">
                    {item.highlight}
                  </span>
                )}
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
