import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function CinematicRevealSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const content = contentRef.current
    if (!section || !image || !content) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const imageTween = gsap.fromTo(image, { scale: 1.3, opacity: 0.5 }, {
      scale: 1,
      opacity: 1,
      scrollTrigger: { trigger: section, start: 'top 80%', end: 'center center', scrub: 1 },
    })

    const contentTween = gsap.fromTo(content, { y: 60, opacity: 0 }, {
      y: 0,
      opacity: 1,
      scrollTrigger: { trigger: section, start: 'top 60%', end: 'center center', scrub: 1 },
    })

    return () => {
      imageTween.scrollTrigger?.kill(false)
      contentTween.scrollTrigger?.kill(false)
      imageTween.kill()
      contentTween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <img src="/assets/images/cinematic-reveal.jpg" alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div ref={contentRef} className="max-w-xl">
          <ScrollReveal y={20}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
              {t('home.cinematic.badge')}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t('home.cinematic.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('home.cinematic.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/products">{t('hero.exploreProducts')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/contact">{t('productDetail.contactSales')}</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
