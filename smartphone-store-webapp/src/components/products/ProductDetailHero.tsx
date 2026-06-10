import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { getBrandLabelKey } from '@/lib/brands'
import { cn } from '@/lib/utils'

interface ProductDetailHeroProps {
  product: Product
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  const { t } = useTranslation()
  const [activeImage, setActiveImage] = useState(0)
  const images = [product.image, ...product.gallery]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              alt={product.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                'shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                activeImage === i ? 'border-primary shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Badge variant="outline" className="w-fit mb-4 capitalize">
          {t(getBrandLabelKey(product.brand))}
        </Badge>
        <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">{product.name}</h1>
        <p className="text-xl text-primary mt-2">{product.tagline}</p>
        <p className="text-muted-foreground mt-4 leading-relaxed">{product.longDescription}</p>

        <div className="flex flex-wrap gap-2 mt-6">
          {product.colors.map((color) => (
            <div
              key={color.name}
              className="w-8 h-8 rounded-full border-2 border-border shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
