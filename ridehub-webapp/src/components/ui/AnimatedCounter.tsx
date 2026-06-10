import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formatNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.textContent = prefix + formatNumber(value) + suffix
      return
    }

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: value,
      duration,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.textContent = prefix + formatNumber(Math.round(obj.val)) + suffix
      },
    })

    return () => {
      tween.kill()
    }
  }, [value, suffix, prefix, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}0{suffix}
    </span>
  )
}
