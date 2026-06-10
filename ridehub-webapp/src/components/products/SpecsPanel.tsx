import { useTranslation } from 'react-i18next'
import { Battery, Gauge, Zap, Weight, Calendar, Package, Cog, Disc } from 'lucide-react'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'

interface SpecsPanelProps {
  product: Product
}

const availabilityVariant = {
  'in-stock': 'success' as const,
  limited: 'warning' as const,
  'pre-order': 'warning' as const,
  'coming-soon': 'secondary' as const,
}

const availabilityKey = {
  'in-stock': 'products.inStock',
  limited: 'products.limited',
  'pre-order': 'products.preOrder',
  'coming-soon': 'products.comingSoon',
}

export function SpecsPanel({ product }: SpecsPanelProps) {
  const { t } = useTranslation()
  const { specs } = product

  const specRows = [
    specs.motor && { icon: Zap, label: t('productDetail.motor'), value: specs.motor },
    specs.battery && { icon: Battery, label: t('productDetail.battery'), value: specs.battery },
    specs.speed && { icon: Gauge, label: t('productDetail.speed'), value: specs.speed },
    specs.range && { icon: Cog, label: t('productDetail.range'), value: specs.range },
    { icon: Weight, label: t('productDetail.weight'), value: specs.weight },
    specs.frame && { icon: Cog, label: t('productDetail.frame'), value: specs.frame },
    specs.brakes && { icon: Disc, label: t('productDetail.brakes'), value: specs.brakes },
    { icon: Calendar, label: t('productDetail.year'), value: String(specs.releaseYear) },
    { icon: Package, label: t('productDetail.availability'), value: t(availabilityKey[product.availability]) },
  ].filter(Boolean) as { icon: typeof Battery; label: string; value: string }[]

  return (
    <div className="glass rounded-2xl p-6 space-y-5">
      <h3 className="font-semibold text-lg">{t('productDetail.specs')}</h3>
      {specRows.map((spec) => (
        <div key={spec.label} className="flex gap-3">
          <spec.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</p>
            <p className="text-sm font-medium mt-0.5">{spec.value}</p>
          </div>
        </div>
      ))}

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          {t('productDetail.colors')}
        </p>
        <div className="flex flex-wrap gap-2">
          {specs.colors.map((color) => (
            <span
              key={color}
              className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border"
            >
              {color}
            </span>
          ))}
        </div>
      </div>

      <Badge variant={availabilityVariant[product.availability]} className="text-sm">
        {t(availabilityKey[product.availability])}
      </Badge>
    </div>
  )
}
