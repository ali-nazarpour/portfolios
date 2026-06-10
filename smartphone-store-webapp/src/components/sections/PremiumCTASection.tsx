import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export function PremiumCTASection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.fromTo(
      section.querySelector('[data-cta-content]'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: { trigger: section, start: 'top 75%' },
      },
    )

    gsap.to(section.querySelector('[data-cta-orb]'), {
      y: -30,
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      <AnimatedGradientBackground />
      <div
        data-cta-orb
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div data-cta-content className="max-w-3xl mx-auto text-center" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            {t('premiumCta.badge')}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {t('premiumCta.title')}
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">
            {t('premiumCta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <MagneticButton to="/contact" variant="premium" size="xl">
              {t('premiumCta.primary')}
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
            <MagneticButton to="/products" variant="glass" size="xl">
              {t('premiumCta.secondary')}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
