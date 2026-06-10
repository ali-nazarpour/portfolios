import { useTranslation } from 'react-i18next'
import { Monitor, Cpu, Camera, Battery, HardDrive, Calendar, Package } from 'lucide-react'
import type { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'

interface SpecsPanelProps {
  product: Product
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

export function SpecsPanel({ product }: SpecsPanelProps) {
  const { t } = useTranslation()

  const specs = [
    { icon: Monitor, label: t('productDetail.display'), value: product.display },
    { icon: Cpu, label: t('productDetail.chipset'), value: product.chipset },
    { icon: Camera, label: t('productDetail.camera'), value: product.camera },
    { icon: Battery, label: t('productDetail.battery'), value: product.battery },
    { icon: HardDrive, label: t('productDetail.storage'), value: product.storage.join(', ') },
    { icon: Calendar, label: t('productDetail.releaseYear'), value: String(product.releaseYear) },
    { icon: Package, label: t('productDetail.availability'), value: t(availabilityKey[product.availability]) },
  ]

  return (
    <div className="glass rounded-2xl p-6 space-y-5">
      <h3 className="font-semibold text-lg">{t('productDetail.specs')}</h3>
      {specs.map((spec) => (
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
          {product.colors.map((color) => (
            <div key={color.name} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border-2 border-border shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
              <span className="text-xs text-muted-foreground">{color.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Badge variant={availabilityVariant[product.availability]} className="text-sm">
        {t(availabilityKey[product.availability])}
      </Badge>
    </div>
  )
}
