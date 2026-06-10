import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { processSteps } from '@/data/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProcessSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('process.title')} subtitle={t('process.subtitle')} />

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="relative text-center">
                  <div className="relative z-10 mx-auto w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4 glow">
                    <step.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{t(step.titleKey)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
