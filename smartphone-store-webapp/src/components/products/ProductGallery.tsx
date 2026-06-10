import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  brand: string
  size?: 'small' | 'medium' | 'large'
}

interface ProductGalleryProps {
  items: GalleryItem[]
  brandFilter: string
}

export function ProductGallery({ items, brandFilter }: ProductGalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = brandFilter === 'all' ? items : items.filter((i) => i.brand === brandFilter)

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={() => setLightbox(item)}
            className={cn(
              'relative w-full break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer',
              item.size === 'large' && 'sm:col-span-2'
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <div>
                <p className="text-white font-semibold">{item.alt}</p>
                <p className="text-white/70 text-sm capitalize">{item.brand}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none">
          {lightbox && (
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
