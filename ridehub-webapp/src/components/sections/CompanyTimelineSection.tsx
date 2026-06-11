import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { timelineEvents } from '@/data/timeline'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

export function CompanyTimelineSection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const tween = gsap.fromTo(
      el.querySelectorAll('.timeline-item'),
      { opacity: 0, x: (i) => (i % 2 === 0 ? -30 : 30) },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      }
    )

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [])

  return (
    <SectionShell variant="muted">
      <ScrollReveal>
        <SectionHeading badge={t('home.timeline.badge')} title={t('home.timeline.title')} subtitle={t('home.timeline.subtitle')} />
      </ScrollReveal>

      <div ref={containerRef} className="relative max-w-2xl mx-auto pl-8 md:pl-0">
        <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
        <div className="space-y-10">
          {timelineEvents.map((event, i) => {
            const isCardLeft = i % 2 === 0

            return (
              <div key={event.id} className="timeline-item relative md:grid md:grid-cols-2 md:gap-8">
                <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background md:-translate-x-1.5 top-6 z-10" />
                <div
                  className={cn(
                    'pt-1',
                    isCardLeft
                      ? 'md:col-start-2 md:text-left md:pl-12'
                      : 'md:col-start-1 md:text-right md:pr-12'
                  )}
                >
                  <span className="font-display text-2xl font-bold gradient-text">{event.year}</span>
                </div>
                <div
                  className={cn(
                    'mt-2 md:mt-0',
                    isCardLeft ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12'
                  )}
                >
                  <div
                    className={cn(
                      'p-6 rounded-2xl glass-card hover:border-primary/20 transition-colors',
                      event.highlight && 'ring-1 ring-primary/20'
                    )}
                  >
                    <h3 className="font-display font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
