import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getFeaturedProducts } from '@/data/products'
import { SectionHeading } from '@/components/ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

export function HorizontalScrollSection() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const products = getFeaturedProducts()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const scrollWidth = track.scrollWidth - window.innerWidth

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
      tween.scrollTrigger?.kill(true)
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <SectionHeading title={t('horizontal.title')} subtitle={t('horizontal.subtitle')} align="left" />
      </div>

      <div ref={trackRef} className="flex gap-6 px-4 md:px-8 pb-16 will-change-transform">
        {products.map((product) => (
          <Link
            key={product.slug}
            to={`/products/${product.slug}`}
            className="group shrink-0 w-[300px] md:w-[380px]"
          >
            <div className="glass rounded-3xl overflow-hidden hover:glow transition-shadow">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-primary font-medium uppercase">{product.brand}</span>
                <h3 className="font-semibold text-lg mt-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
