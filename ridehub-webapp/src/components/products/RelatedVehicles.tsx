import { useTranslation } from 'react-i18next'
import type { Product } from '@/types/product'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VehicleGrid } from './VehicleCard'

interface RelatedVehiclesProps {
  products: Product[]
}

export function RelatedVehicles({ products }: RelatedVehiclesProps) {
  const { t } = useTranslation()

  if (products.length === 0) return null

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <SectionHeading title={t('productDetail.related')} align="left" className="mb-8" />
      <VehicleGrid products={products} />
    </section>
  )
}
