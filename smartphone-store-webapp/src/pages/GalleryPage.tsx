import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { galleryItems } from '@/data/gallery'
import { ProductGallery } from '@/components/products/ProductGallery'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

const filters = [
  { value: 'all', labelKey: 'gallery.filterAll' },
  { value: 'apple', labelKey: 'common.brandApple' },
  { value: 'samsung', labelKey: 'common.brandSamsung' },
  { value: 'xiaomi', labelKey: 'common.brandXiaomi' },
]

export function GalleryPage() {
  const { t } = useTranslation()
  const [brandFilter, setBrandFilter] = useState('all')

  return (
    <>
      <section className="relative pt-32 pb-16 premium-gradient-bg overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('gallery.title')} subtitle={t('gallery.subtitle')} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setBrandFilter(f.value)}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all',
                  brandFilter === f.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent'
                )}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>

          <ProductGallery items={galleryItems} brandFilter={brandFilter} />
        </div>
      </section>
    </>
  )
}
