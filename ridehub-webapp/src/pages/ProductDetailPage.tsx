import { useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { PageWrapper } from '@/components/layout/Layout'
import { VehicleDetailHero } from '@/components/products/VehicleDetailHero'
import { RelatedVehicles } from '@/components/products/RelatedVehicles'
import { SpecsPanel } from '@/components/products/SpecsPanel'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const related = getRelatedProducts(product)

  return (
    <PageWrapper>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VehicleDetailHero product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          <div className="lg:col-span-2 space-y-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold">{t('productDetail.features')}</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">{product.longDescription}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold mb-4">{t('productDetail.gallery')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.galleryImages.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-square">
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <SpecsPanel product={product} />
            <div className="flex flex-col gap-3">
              <MagneticButton to="/contact" className="w-full justify-center">
                {t('productDetail.requestInfo')}
              </MagneticButton>
              <MagneticButton to="/contact" variant="outline" className="w-full justify-center">
                {t('productDetail.contactSales')}
              </MagneticButton>
            </div>
          </div>
        </div>

        <RelatedVehicles products={related} />
      </div>
    </PageWrapper>
  )
}
