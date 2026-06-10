import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

export function TestimonialsCarousel() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  )

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, paused])

  const current = testimonials[index]

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('testimonials.title')} subtitle={t('testimonials.subtitle')} />

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="glass rounded-3xl p-8 md:p-12 glow"
            >
              <Quote className="h-10 w-10 text-primary/40 mb-6" aria-hidden />
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                &ldquo;{t(current.quoteKey)}&rdquo;
              </p>

              <div className="flex items-center gap-1 mt-6" aria-label={`${current.rating} stars`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <div className="flex items-center gap-4 mt-8">
                <img
                  src={current.avatar}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-semibold">{t(current.nameKey)}</p>
                  <p className="text-sm text-muted-foreground">
                    {t(current.roleKey)} · {t(current.companyKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50',
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="p-2 rounded-full glass hover:bg-primary/10 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
