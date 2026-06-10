import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VehicleDetailHeroProps {
  product: Product
}

export function VehicleDetailHero({ product }: VehicleDetailHeroProps) {
  const { t } = useTranslation()
  const [activeImage, setActiveImage] = useState(0)
  const images = [product.image, ...product.galleryImages.filter((img) => img !== product.image)]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4"
        >
          <img
            src={images[activeImage]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={cn(
                'shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                activeImage === i ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
              )}
            >
              <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t('productDetail.backToProducts')}
        </Link>

        <Badge className="mb-3">{product.brand}</Badge>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{product.name}</h1>
        <p className="text-lg text-primary font-medium mb-4">{product.tagline}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">{product.longDescription}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/contact">{t('productDetail.requestInfo')}</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/contact">
              <Mail className="h-4 w-4" /> {t('productDetail.contactSales')}
            </Link>
          </Button>
        </div>

        <SpecsPanel product={product} />
      </div>
    </div>
  )
}

function SpecsPanel({ product }: { product: Product }) {
  const { t } = useTranslation()
  const { specs, availability } = product

  const availabilityLabel = {
    'in-stock': t('products.inStock'),
    'pre-order': t('products.preOrder'),
    'coming-soon': t('products.comingSoon'),
    limited: t('products.limited'),
  }

  const specRows = [
    specs.motor && { label: t('productDetail.motor'), value: specs.motor },
    specs.battery && { label: t('productDetail.battery'), value: specs.battery },
    specs.speed && specs.speed !== 'N/A' && { label: t('productDetail.speed'), value: specs.speed },
    specs.range && specs.range !== 'N/A' && { label: t('productDetail.range'), value: specs.range },
    { label: t('productDetail.weight'), value: specs.weight },
    specs.frame && { label: t('productDetail.frame'), value: specs.frame },
    specs.brakes && { label: t('productDetail.brakes'), value: specs.brakes },
    { label: t('productDetail.year'), value: String(specs.releaseYear) },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="rounded-2xl border border-border p-6 bg-card/50 lg:sticky lg:top-24">
      <h3 className="font-display font-semibold text-lg mb-4">{t('productDetail.specs')}</h3>
      <dl className="space-y-3 mb-6">
        {specRows.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm border-b border-border/50 pb-2">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium text-right">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mb-4">
        <span className="text-sm text-muted-foreground">{t('productDetail.availability')}: </span>
        <span className="text-sm font-medium">{availabilityLabel[availability]}</span>
      </div>

      <div>
        <span className="text-sm text-muted-foreground block mb-2">{t('productDetail.colors')}</span>
        <div className="flex flex-wrap gap-2">
          {specs.colors.map((color) => (
            <span key={color} className="px-3 py-1 rounded-full text-xs bg-muted">{color}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export { SpecsPanel }
