import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { ProductDetailHero } from '@/components/products/ProductDetailHero'
import { SpecsPanel } from '@/components/products/SpecsPanel'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) return <Navigate to="/products" replace />

  const related = getRelatedProducts(product)

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <ProductDetailHero product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold">{t('productDetail.features')}</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">{product.longDescription}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-semibold mb-4">{t('productDetail.gallery')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-square">
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <SpecsPanel product={product} />
            <div className="flex flex-col gap-3">
              <MagneticButton to="/contact" variant="premium" size="lg" className="w-full">
                {t('productDetail.requestInfo')}
              </MagneticButton>
              <MagneticButton to="/contact" variant="outline" size="lg" className="w-full">
                {t('productDetail.contactSales')}
              </MagneticButton>
            </div>
          </div>
        </div>

        <RelatedProducts products={related} />
      </div>
    </div>
  )
}
