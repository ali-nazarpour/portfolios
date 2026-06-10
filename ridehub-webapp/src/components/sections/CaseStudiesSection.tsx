import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { caseStudies } from '@/data/caseStudies'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CaseStudiesSection() {
  const { t } = useTranslation()

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.caseStudies.badge')} title={t('home.caseStudies.title')} subtitle={t('home.caseStudies.subtitle')} />
      </ScrollReveal>

      <div className="space-y-16">
        {caseStudies.map((study, i) => (
          <ScrollReveal key={study.id} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.005 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative group">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute bottom-4 left-4 glass-card px-4 py-2 rounded-xl">
                    <span className="font-display text-2xl font-bold gradient-text">{study.metric}</span>
                    <span className="text-xs text-muted-foreground block">{study.metricLabel}</span>
                  </div>
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">{study.industry}</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-2">{study.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{study.client}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t('home.caseStudies.challenge')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t('home.caseStudies.solution')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">{t('home.caseStudies.outcome')}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.outcome}</p>
                  </div>
                </div>
                <button type="button" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  {t('home.caseStudies.readStory')} <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
