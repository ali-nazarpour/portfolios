import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { processSteps } from '@/data/process'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProcessSection() {
  const { t } = useTranslation()
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tween = gsap.fromTo(el, { scaleX: 0 }, {
      scaleX: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: el.parentElement, start: 'top 75%' },
      duration: 1.2,
    })

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [])

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.process.badge')} title={t('home.process.title')} subtitle={t('home.process.subtitle')} />
      </ScrollReveal>

      <div className="relative">
        <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border overflow-hidden">
          <div ref={lineRef} className="h-full w-full bg-gradient-to-r from-primary via-primary/50 to-primary origin-left" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.id} delay={i * 0.1}>
              <div className="relative text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-display text-xl font-bold text-primary group-hover:scale-110 transform duration-300">
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{t(step.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
