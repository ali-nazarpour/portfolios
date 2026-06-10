import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Package } from 'lucide-react'
import { products } from '@/data/products'
import type { Brand, SortOption } from '@/types/product'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductGrid } from '@/components/products/ProductGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function ProductsPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const brandParam = searchParams.get('brand') as Brand | null

  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState<Brand | 'all'>(brandParam && ['apple', 'samsung', 'xiaomi'].includes(brandParam) ? brandParam : 'all')
  const [sort, setSort] = useState<SortOption>('featured')

  const filtered = useMemo(() => {
    let result = [...products]

    if (brand !== 'all') {
      result = result.filter((p) => p.brand === brand)
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'year-desc':
        result.sort((a, b) => b.releaseYear - a.releaseYear)
        break
      case 'year-asc':
        result.sort((a, b) => a.releaseYear - b.releaseYear)
        break
    }

    return result
  }, [brand, search, sort])

  const featuredProducts = products.filter((p) => p.featured).slice(0, 3)

  return (
    <>
      <section className="relative pt-32 pb-16 premium-gradient-bg overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading title={t('products.title')} subtitle={t('products.subtitle')} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <ProductFilters
            search={search}
            onSearchChange={setSearch}
            brand={brand}
            onBrandChange={setBrand}
            sort={sort}
            onSortChange={setSort}
          />

          {brand === 'all' && !search && (
            <ScrollReveal className="mb-12">
              <h3 className="font-semibold text-lg mb-6">{t('products.featured')}</h3>
              <ProductGrid products={featuredProducts} />
            </ScrollReveal>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            {t('products.results', { count: filtered.length })}
          </p>

          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{t('products.noResults')}</h3>
              <p className="text-muted-foreground mt-2">{t('products.noResultsDesc')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
