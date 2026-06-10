import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { caseStudies } from '@/data/caseStudies'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CaseStudiesSection() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const current = caseStudies[active]

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('cases.title')} subtitle={t('cases.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute bottom-6 left-6 glass rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-3xl font-display font-bold">{current.metricValue}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{t(current.metricKey)}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="flex flex-wrap gap-2 mb-6">
              {caseStudies.map((study, i) => (
                <button
                  key={study.id}
                  onClick={() => setActive(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    i === active
                      ? 'bg-primary text-primary-foreground'
                      : 'glass hover:bg-primary/10'
                  }`}
                >
                  {t(study.clientKey)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-xs uppercase tracking-widest text-primary font-medium">
                  {t(current.industryKey)}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold mt-2 mb-4">
                  {t(current.titleKey)}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t('cases.challenge')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(current.challengeKey)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t('cases.outcome')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(current.outcomeKey)}</p>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-6 hover:gap-2 transition-all">
                  {t('cases.readStory')} <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
