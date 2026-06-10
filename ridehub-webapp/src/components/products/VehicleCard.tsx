import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface VehicleCardProps {
  product: Product
  index?: number
}

const availabilityVariant = {
  'in-stock': 'success' as const,
  'pre-order': 'warning' as const,
  'coming-soon': 'secondary' as const,
  limited: 'default' as const,
}

export function VehicleCard({ product, index = 0 }: VehicleCardProps) {
  const { t } = useTranslation()

  const availabilityLabel = {
    'in-stock': t('products.inStock'),
    'pre-order': t('products.preOrder'),
    'coming-soon': t('products.comingSoon'),
    limited: t('products.limited'),
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant={availabilityVariant[product.availability]}>
                {availabilityLabel[product.availability]}
              </Badge>
              {product.featured && <Badge variant="default">{t('nav.featured')}</Badge>}
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                {t('featured.viewDetails')} <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{product.brand}</span>
              <span className="text-xs text-muted-foreground capitalize">{t(`products.${product.type}`)}</span>
            </div>
            <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.shortDescription}</p>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

interface VehicleGridProps {
  products: Product[]
  className?: string
}

export function VehicleGrid({ products, className }: VehicleGridProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8', className)}>
      {products.map((product, i) => (
        <VehicleCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}
