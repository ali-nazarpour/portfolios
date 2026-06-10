import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products, getFeaturedProducts } from '@/data/products'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { VehicleFilters, type SortOption } from '@/components/products/VehicleFilters'
import { VehicleGrid } from '@/components/products/VehicleCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useState, useEffect } from 'react'

export default function ProductsPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all')
  const [brandFilter, setBrandFilter] = useState(searchParams.get('brand') || 'all')
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  useEffect(() => {
    const type = searchParams.get('type')
    const brand = searchParams.get('brand')
    if (type) setTypeFilter(type)
    if (brand) setBrandFilter(brand)
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
    }

    if (typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter)
    }

    if (brandFilter !== 'all') {
      result = result.filter((p) => p.brand.toLowerCase() === brandFilter.toLowerCase())
    }

    switch (sortBy) {
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'newest':
        result.sort((a, b) => b.specs.releaseYear - a.specs.releaseYear)
        break
    }

    return result
  }, [search, typeFilter, brandFilter, sortBy])

  const featured = getFeaturedProducts().slice(0, 2)
  const hasActiveFilters = search !== '' || typeFilter !== 'all' || brandFilter !== 'all'

  const handleClear = () => {
    setSearch('')
    setTypeFilter('all')
    setBrandFilter('all')
    setSearchParams({})
  }

  return (
    <PageWrapper>
      <PageHero title={t('products.title')} subtitle={t('products.subtitle')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {!hasActiveFilters && (
          <ScrollReveal className="mb-12">
            <SectionHeading title={t('products.featured')} align="left" className="mb-6" />
            <VehicleGrid products={featured} />
          </ScrollReveal>
        )}

        <VehicleFilters
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeChange={(v) => {
            setTypeFilter(v)
            setSearchParams(v !== 'all' ? { type: v } : {})
          }}
          brandFilter={brandFilter}
          onBrandChange={(v) => {
            setBrandFilter(v)
            setSearchParams(v !== 'all' ? { brand: v } : {})
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClear={handleClear}
          hasActiveFilters={hasActiveFilters}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">{t('products.noResults')}</p>
          </div>
        ) : (
          <VehicleGrid products={filtered} />
        )}
      </div>
    </PageWrapper>
  )
}
