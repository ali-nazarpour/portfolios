import type { Brand } from '@/types/product'

const brandKeys: Record<Brand, string> = {
  apple: 'common.brandApple',
  samsung: 'common.brandSamsung',
  xiaomi: 'common.brandXiaomi',
}

export function getBrandLabelKey(brand: Brand): string {
  return brandKeys[brand]
}
