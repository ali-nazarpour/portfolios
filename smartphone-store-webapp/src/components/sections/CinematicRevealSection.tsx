import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { getFeaturedProducts } from '@/data/products'
import { MagneticButton } from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export function CinematicRevealSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const product = getFeaturedProducts()[0]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
    })

    tl.fromTo(
      section.querySelector('[data-cinematic-bg]'),
      { scale: 1.3, opacity: 0.3 },
      { scale: 1, opacity: 1, ease: 'power2.out' },
    )
      .fromTo(
        section.querySelector('[data-cinematic-phone]'),
        { y: 100, scale: 0.8, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power3.out' },
        0,
      )
      .fromTo(
        section.querySelector('[data-cinematic-text]'),
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.2,
      )
      .fromTo(
        section.querySelector('[data-cinematic-glow]'),
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        0.3,
      )

    return () => ScrollTrigger.getAll().forEach((st) => st.kill(true))
  }, [])

  if (!product) return null

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden py-20"
    >
      <div
        data-cinematic-bg
        className="absolute inset-0 premium-gradient-bg"
      />
      <div
        data-cinematic-glow
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-cinematic-text>
            <span className="text-sm uppercase tracking-widest text-primary font-medium">
              {t('cinematic.badge')}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
              {product.name}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              {product.longDescription}
            </p>
            <MagneticButton to={`/products/${product.slug}`} variant="premium" size="lg">
              {t('cinematic.explore')}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>

          <Link
            to={`/products/${product.slug}`}
            data-cinematic-phone
            className="relative flex justify-center"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md drop-shadow-2xl"
              />
              <div className="absolute -inset-8 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
