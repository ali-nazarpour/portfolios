import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import { galleryItems } from '@/data/gallery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const categories = ['all', 'bicycle', 'scooter', 'motorcycle', 'showroom', 'lifestyle', 'technology'] as const

interface VehicleGalleryProps {
  showHeading?: boolean
}

export function VehicleGallery({ showHeading = true }: VehicleGalleryProps) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<string>('all')
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null)

  const filtered = galleryItems.filter(
    (item) => filter === 'all' || item.category === filter
  )

  return (
    <section>
      {showHeading && <SectionHeading title={t('gallery.title')} subtitle={t('gallery.subtitle')} />}

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setLightbox(item)}
            className="relative w-full break-inside-avoid rounded-xl overflow-hidden group cursor-pointer block"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {item.brand && (
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs bg-black/60 text-white">
                {item.brand}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="p-0 border-none bg-transparent max-w-5xl">
          {lightbox && (
            <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto rounded-xl" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
