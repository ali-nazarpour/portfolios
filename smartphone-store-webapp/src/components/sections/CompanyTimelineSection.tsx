import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineEvents } from '@/data/timeline'
import { SectionHeading } from '@/components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export function CompanyTimelineSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const items = section.querySelectorAll('[data-timeline-item]')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: item, start: 'top 85%' },
        },
      )
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('timeline.title')} subtitle={t('timeline.subtitle')} />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              data-timeline-item
              className={`relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              style={{ opacity: 0 }}
            >
              <div className="hidden md:block md:w-1/2" />
              <div
                className={`md:w-1/2 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <span className="inline-block text-sm font-bold text-primary mb-2">{event.year}</span>
                <div className="glass rounded-2xl overflow-hidden group hover:glow transition-shadow">
                  <img
                    src={event.image}
                    alt=""
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{t(event.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t(event.descKey)}</p>
                  </div>
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background -translate-x-1/2 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
