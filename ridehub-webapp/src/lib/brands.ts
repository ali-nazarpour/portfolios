const brandKeys: Record<string, string> = {
  Trek: 'brands.trek',
  Giant: 'brands.giant',
  Specialized: 'brands.specialized',
  Segway: 'brands.segway',
  Xiaomi: 'brands.xiaomi',
  'Zero Motorcycles': 'brands.zero',
}

export function getBrandLabelKey(brand: string): string {
  return brandKeys[brand] ?? brand
}
