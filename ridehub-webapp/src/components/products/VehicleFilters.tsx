import { useTranslation } from 'react-i18next'
import { Search, X } from 'lucide-react'
import { brands } from '@/data/products'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'newest'

interface VehicleFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeChange: (value: string) => void
  brandFilter: string
  onBrandChange: (value: string) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  onClear: () => void
  hasActiveFilters: boolean
}

export function VehicleFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  brandFilter,
  onBrandChange,
  sortBy,
  onSortChange,
  onClear,
  hasActiveFilters,
}: VehicleFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('products.search')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label={t('products.search')}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t('products.filterType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('products.allTypes')}</SelectItem>
            <SelectItem value="bicycle">{t('products.bicycle')}</SelectItem>
            <SelectItem value="scooter">{t('products.scooter')}</SelectItem>
            <SelectItem value="motorcycle">{t('products.motorcycle')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={brandFilter} onValueChange={onBrandChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t('products.filterBrand')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('products.allBrands')}</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t('products.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">{t('products.sortFeatured')}</SelectItem>
            <SelectItem value="name-asc">{t('products.sortNameAsc')}</SelectItem>
            <SelectItem value="name-desc">{t('products.sortNameDesc')}</SelectItem>
            <SelectItem value="newest">{t('products.sortNewest')}</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="gap-1">
            <X className="h-4 w-4" /> {t('products.clearFilters')}
          </Button>
        )}
      </div>
    </div>
  )
}
