import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getFeaturedProducts } from '@/data/products'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionShell } from '@/components/ui/SectionShell'
import { VehicleGrid } from '@/components/products/VehicleCard'
import { Button } from '@/components/ui/button'

export function FeaturedSection() {
  const { t } = useTranslation()
  const featured = getFeaturedProducts().slice(0, 3)

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading title={t('featured.title')} subtitle={t('featured.subtitle')} />
      </ScrollReveal>
      <VehicleGrid products={featured} />
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/products">{t('nav.viewAll')}</Link>
        </Button>
      </div>
    </SectionShell>
  )
}
