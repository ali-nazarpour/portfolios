import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { VehicleGallery } from '@/components/products/VehicleGallery'
import { cn, pageContainerClass } from '@/lib/utils'

export default function GalleryPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <PageHero title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
      <div className={cn(pageContainerClass, 'py-12 lg:py-16')}>
        <VehicleGallery showHeading={false} />
      </div>
    </PageWrapper>
  )
}
