import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { siteConfig } from '@/config/site'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const statKeys = [
  { key: 'brands', value: siteConfig.stats.brands },
  { key: 'products', value: siteConfig.stats.products },
  { key: 'customers', value: siteConfig.stats.customers },
  { key: 'years', value: siteConfig.stats.years },
] as const

function StatItem({ label, value }: { label: string; value: number }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.textContent = `${value}+`
      return
    }

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.val)}+`
      },
    })

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [value])

  return (
    <div className="text-center">
      <span ref={numRef} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text block mb-2">
        0+
      </span>
      <span className="text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  )
}

export function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {statKeys.map(({ key, value }) => (
              <StatItem key={key} label={t(`stats.${key}`)} value={value} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
