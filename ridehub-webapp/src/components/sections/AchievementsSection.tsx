import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { achievementStats } from '@/data/premiumContent'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

function AnimatedStat({ label, value, suffix = '+', prefix = '' }: { label: string; value: number; suffix?: string; prefix?: string }) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = numRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.textContent = `${prefix}${value}${suffix}`
      return
    }
    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration: 2.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
      },
    })

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [value, suffix, prefix])

  return (
    <div className="text-center p-6 rounded-2xl glass-card hover:border-primary/20 transition-colors">
      <span ref={numRef} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text block mb-2">
        {prefix}0{suffix}
      </span>
      <span className="text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  )
}

export function AchievementsSection() {
  const { t } = useTranslation()

  return (
    <SectionShell variant="bordered">
      <div className="absolute inset-0 gradient-bg opacity-30 pointer-events-none" />
      <ScrollReveal>
        <SectionHeading badge={t('home.achievements.badge')} title={t('home.achievements.title')} subtitle={t('home.achievements.subtitle')} />
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {achievementStats.map(({ key, value, suffix, prefix }, i) => (
          <ScrollReveal key={key} delay={i * 0.08}>
            <AnimatedStat label={t(`home.achievements.${key}`)} value={value} suffix={suffix} prefix={prefix} />
          </ScrollReveal>
        ))}
      </div>
    </SectionShell>
  )
}
