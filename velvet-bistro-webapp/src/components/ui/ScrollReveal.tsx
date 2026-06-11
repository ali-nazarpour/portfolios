import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

function completeIfVisible(el: HTMLElement, tween: gsap.core.Tween) {
  ScrollTrigger.refresh()

  if (tween.scrollTrigger?.isActive) {
    tween.progress(1)
    return
  }

  const rect = el.getBoundingClientRect()
  const viewHeight = window.innerHeight || document.documentElement.clientHeight

  if (rect.top < viewHeight * 0.9 && rect.bottom > 0) {
    tween.progress(1)
  }
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.7,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, clearProps: 'transform' })
      return
    }

    const offsets = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: -40 },
      right: { y: 0, x: 40 },
    }

    gsap.set(el, { opacity: 0, ...offsets[direction] })
  }, [direction])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const offsets = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: -40 },
      right: { y: 0, x: 40 },
    }

    const offset = offsets[direction]

    const tween = gsap.fromTo(
      el,
      { opacity: 0, ...offset },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          scroller: document.documentElement,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        completeIfVisible(el, tween)
      })
    })

    return () => {
      tween.scrollTrigger?.kill(true)
      tween.kill()
    }
  }, [delay, direction, duration])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
