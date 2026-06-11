import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'

const steps = [
  { key: 'discover', image: '/assets/gallery/showroom-1.jpg' },
  { key: 'experience', image: '/assets/gallery/bike-trail.jpg' },
  { key: 'deliver', image: '/assets/gallery/lifestyle-1.jpg' },
]

export function ScrollStorySection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const panels = pin.querySelectorAll('.story-panel')
    const texts = pin.querySelectorAll('.story-text')
    const images = pin.querySelectorAll('.story-image')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${steps.length * 100}%`,
        pin: pin,
        scrub: 1,
      },
    })

    panels.forEach((_, i) => {
      if (i === 0) return
      tl.to(texts[i - 1], { opacity: 0, y: -30, duration: 0.5 }, i)
        .to(images[i - 1], { opacity: 0, scale: 0.95, duration: 0.5 }, i)
        .fromTo(texts[i], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, i)
        .fromTo(images[i], { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.5 }, i)
    })

    return () => {
      tl.scrollTrigger?.kill(true)
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
            {t('home.story.badge')}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            <div className="relative h-[300px] md:h-[400px]">
              {steps.map((step, i) => (
                <div key={step.key} className={`story-panel story-image absolute inset-0 rounded-2xl overflow-hidden ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={step.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              ))}
            </div>
            <div className="relative h-[200px]">
              {steps.map((step, i) => (
                <div key={step.key} className={`story-panel story-text absolute inset-0 flex flex-col justify-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="text-sm text-primary font-semibold mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">{t(`home.story.${step.key}`)}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{t(`home.story.${step.key}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
