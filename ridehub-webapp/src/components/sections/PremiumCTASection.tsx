import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'

export function PremiumCTASection() {
  const { t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tween = gsap.fromTo(el.children, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    })

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [])

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <AnimatedGradientBackground className="absolute inset-0 opacity-60" />
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      <div ref={contentRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
          {t('home.cta.badge')}
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {t('home.cta.title')}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
          {t('home.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full text-base px-8 h-14 glow">
            <Link to="/contact">
              {t('home.cta.primary')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 h-14 bg-background/50">
            <Link to="/products">{t('hero.exploreProducts')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
