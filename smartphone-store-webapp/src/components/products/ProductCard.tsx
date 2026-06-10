import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { getBrandLabelKey } from '@/lib/brands'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  index?: number
}

const availabilityVariant = {
  'in-stock': 'success' as const,
  limited: 'warning' as const,
  'pre-order': 'info' as const,
  'out-of-stock': 'secondary' as const,
}

const availabilityKey = {
  'in-stock': 'productDetail.inStock',
  limited: 'productDetail.limited',
  'pre-order': 'productDetail.preOrder',
  'out-of-stock': 'productDetail.outOfStock',
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/products/${product.slug}`}
        className="group block rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {product.featured && (
            <Badge className="absolute top-4 left-4" variant="default">
              {t('products.featured')}
            </Badge>
          )}
          <Badge
            className="absolute top-4 right-4"
            variant={availabilityVariant[product.availability]}
          >
            {t(availabilityKey[product.availability])}
          </Badge>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                'w-2 h-2 rounded-full',
                product.brand === 'apple' && 'bg-gray-400',
                product.brand === 'samsung' && 'bg-blue-500',
                product.brand === 'xiaomi' && 'bg-orange-500'
              )}
            />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {t(getBrandLabelKey(product.brand))}
            </span>
          </div>
          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.shortDescription}</p>
          <div className="flex items-center gap-1 mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {t('products.viewDetails')}
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
