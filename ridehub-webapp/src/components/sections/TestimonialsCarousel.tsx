import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { testimonials } from '@/data/testimonials'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

export function TestimonialsCarousel() {
  const { t } = useTranslation()
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive((i) => (i + 1) % testimonials.length), [])
  const prev = useCallback(() => setActive((i) => (i - 1 + testimonials.length) % testimonials.length), [])

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, reduced])

  const item = testimonials[active]

  return (
    <SectionShell variant="muted">
      <div className="absolute inset-0 gradient-bg opacity-40 pointer-events-none" />
      <ScrollReveal>
        <SectionHeading badge={t('home.testimonials.badge')} title={t('home.testimonials.title')} subtitle={t('home.testimonials.subtitle')} />
      </ScrollReveal>

      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={reduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="glass-card rounded-3xl p-8 md:p-12 relative"
          >
            <Quote className="absolute top-6 right-8 h-12 w-12 text-primary/15" aria-hidden />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex gap-1 mb-4" aria-label={`${item.rating} stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl leading-relaxed mb-6 text-foreground/90">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-display font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role} · {item.company}</p>
                  <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">{item.vehicle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button type="button" onClick={prev} className="p-2 rounded-full glass hover:bg-primary/10 transition-colors" aria-label="Previous testimonial">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t_, i) => (
              <button
                key={t_.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn('w-2.5 h-2.5 rounded-full transition-all', i === active ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-primary/50')}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} className="p-2 rounded-full glass hover:bg-primary/10 transition-colors" aria-label="Next testimonial">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionShell>
  )
}
