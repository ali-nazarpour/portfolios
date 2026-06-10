import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gsap } from '@/hooks/useLenis'
import { getFeaturedProducts } from '@/data/products'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function HorizontalScrollSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const products = getFeaturedProducts()

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const scrollWidth = track.scrollWidth - section.offsetWidth

    const tween = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill(false)
      tween.kill()
    }
  }, [products.length])

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-muted/20">
      <SectionShell className="pb-8">
        <ScrollReveal>
          <SectionHeading badge={t('home.horizontal.badge')} title={t('home.horizontal.title')} subtitle={t('home.horizontal.subtitle')} />
        </ScrollReveal>
      </SectionShell>

      <div ref={trackRef} className="flex gap-6 pl-4 sm:pl-6 lg:pl-8 pr-8 sm:pr-12 lg:pr-16 pb-24 w-max">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.slug}`}
            className="group shrink-0 w-[300px] md:w-[380px] rounded-2xl overflow-hidden glass-card hover:border-primary/30 transition-colors"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-6">
              <span className="text-xs text-primary font-semibold uppercase">{product.brand}</span>
              <h3 className="font-display text-xl font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
