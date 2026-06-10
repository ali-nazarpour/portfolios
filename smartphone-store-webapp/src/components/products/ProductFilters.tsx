import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import type { Brand, SortOption } from '@/types/product'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  brand: Brand | 'all'
  onBrandChange: (value: Brand | 'all') => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
}

const brandFilters = [
  { value: 'all', labelKey: 'products.filterAll' },
  { value: 'apple', labelKey: 'products.filterApple' },
  { value: 'samsung', labelKey: 'products.filterSamsung' },
  { value: 'xiaomi', labelKey: 'products.filterXiaomi' },
] as const

const sortOptions = [
  { value: 'featured', labelKey: 'products.sortFeatured' },
  { value: 'name-asc', labelKey: 'products.sortNameAsc' },
  { value: 'name-desc', labelKey: 'products.sortNameDesc' },
  { value: 'year-desc', labelKey: 'products.sortYearDesc' },
  { value: 'year-asc', labelKey: 'products.sortYearAsc' },
] as const

export function ProductFilters({
  search,
  onSearchChange,
  brand,
  onBrandChange,
  sort,
  onSortChange,
}: ProductFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
      <div className="relative w-full lg:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('products.search')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {brandFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => onBrandChange(f.value as Brand | 'all')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              brand === f.value
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            )}
          >
            {t(f.labelKey)}
          </button>
        ))}
      </div>

      <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
