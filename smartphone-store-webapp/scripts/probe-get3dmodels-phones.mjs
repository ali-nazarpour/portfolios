const slugs = [
  'phone_17_pro_max',
  'iphone_17_pro',
  'iphone_17_pro_max',
  'samsung_galaxy_s26_ultra',
  'samsung_galaxy_s25_ultra',
  'samsung_galaxy_s24_ultra',
  'xiaomi_15_ultra',
  'xiaomi_14_ultra',
  'xiaomi_13_pro',
  'xiaomi_phone',
  'android_phone',
  'smartphone',
]

for (const slug of slugs) {
  const url = `https://www.get3dmodels.com/download/${slug}_by_get3dmodels.glb`
  const r = await fetch(url, { method: 'HEAD' })
  if (r.ok) console.log('OK', r.headers.get('content-length'), slug)
}
