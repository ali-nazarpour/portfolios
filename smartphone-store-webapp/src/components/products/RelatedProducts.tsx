import { useTranslation } from 'react-i18next'
import type { Product } from '@/types/product'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductGrid } from './ProductGrid'

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { t } = useTranslation()

  if (products.length === 0) return null

  return (
    <section className="mt-20">
      <SectionHeading title={t('productDetail.related')} align="left" />
      <ProductGrid products={products} />
    </section>
  )
}
