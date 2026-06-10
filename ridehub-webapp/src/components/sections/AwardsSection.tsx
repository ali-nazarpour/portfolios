import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { awards } from '@/data/awards'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function AwardsSection() {
  const { t } = useTranslation()

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.awards.badge')} title={t('home.awards.title')} subtitle={t('home.awards.subtitle')} />
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {awards.map((award, i) => (
          <ScrollReveal key={award.id} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group p-6 rounded-2xl glass-card h-full hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <img src={award.icon} alt="" className="w-8 h-8" aria-hidden />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{award.year}</span>
                  <h3 className="font-display font-semibold text-lg mt-1 mb-1">{award.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{award.organization}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{award.description}</p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
