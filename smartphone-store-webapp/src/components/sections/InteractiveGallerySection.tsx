import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, ZoomIn } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryItems } from '@/data/gallery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

const filters = ['all', 'apple', 'samsung', 'xiaomi'] as const
type Filter = (typeof filters)[number]

export function InteractiveGallerySection() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered = galleryItems.filter(
    (item) => filter === 'all' || item.brand === filter,
  )

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('[data-gallery-item]')
    items.forEach((item, i) => {
      item.setAttribute('style', `animation-delay: ${i * 0.05}s`)
    })
  }, [filter])

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('homeGallery.title')} subtitle={t('homeGallery.subtitle')} />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'glass hover:bg-primary/10',
              )}
            >
              {f === 'all' ? t('gallery.filterAll') : t(`common.brand${f.charAt(0).toUpperCase() + f.slice(1)}`)}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {filtered.slice(0, 12).map((item) => (
            <ScrollReveal key={item.id}>
              <button
                data-gallery-item
                onClick={() => setLightbox(item.src)}
                className="group relative w-full break-inside-avoid rounded-2xl overflow-hidden animate-fade-in"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <MagneticButton to="/gallery" variant="outline" size="lg">
            {t('homeGallery.viewAll')}
          </MagneticButton>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label={t('gallery.closeLightbox')}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt=""
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
