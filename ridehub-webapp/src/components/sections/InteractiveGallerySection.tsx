import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { galleryItems } from '@/data/gallery'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const categories = ['all', 'bicycle', 'scooter', 'motorcycle', 'showroom', 'lifestyle'] as const

export function InteractiveGallerySection() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<string>('all')
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null)
  const preview = galleryItems.slice(0, 9)

  const filtered = useMemo(
    () => (filter === 'all' ? preview : preview.filter((item) => item.category === filter)),
    [filter, preview]
  )

  return (
    <SectionShell variant="muted">
      <ScrollReveal>
        <SectionHeading badge={t('home.gallery.badge')} title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                filter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              )}
            >
              {t(`gallery.${cat}`)}
            </button>
          ))}
        </div>
      </ScrollReveal>

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center mt-10">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/gallery">{t('home.gallery.viewAll')}</Link>
        </Button>
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
            <button type="button" className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white" aria-label="Close" onClick={() => setLightbox(null)}>
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  )
}
