import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollStorySlides } from '@/data/premiumContent'
import { SectionHeading } from '@/components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export function ScrollStorySection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const slides = container.querySelectorAll('[data-story-slide]')

    slides.forEach((slide, i) => {
      const text = slide.querySelector('[data-story-text]')
      const image = slide.querySelector('[data-story-image]')

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0.3, y: 40 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: slide,
              start: 'top center',
              end: 'center center',
              scrub: 1,
            },
          },
        )
      }

      if (image) {
        gsap.fromTo(
          image,
          { scale: 1.2, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: slide,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      if (i < slides.length - 1) {
        gsap.to(slide, {
          opacity: 0.3,
          scrollTrigger: {
            trigger: slides[i + 1],
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill(true))
  }, [])

  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <SectionHeading title={t('story.title')} subtitle={t('story.subtitle')} />
      </div>

      <div ref={containerRef} className="relative">
        {scrollStorySlides.map((slide, index) => (
          <div
            key={slide.id}
            data-story-slide
            className="min-h-[80vh] flex items-center sticky top-0"
            style={{ zIndex: scrollStorySlides.length - index }}
          >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div data-story-text className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-sm font-medium text-primary uppercase tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-3xl md:text-5xl font-semibold mt-4 mb-6">
                    {t(slide.titleKey)}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                    {t(slide.descKey)}
                  </p>
                </div>
                <div
                  data-story-image
                  className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                >
                  <img src={slide.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="h-[30vh]" aria-hidden />
      </div>
    </section>
  )
}
