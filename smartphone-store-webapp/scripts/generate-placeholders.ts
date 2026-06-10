import { existsSync, mkdirSync, writeFileSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const allAssets = [
  'assets/images/showroom.jpg',
  'assets/images/technology.jpg',
  'assets/images/retail.jpg',
  'assets/images/contact.jpg',
  'assets/brands/apple.jpg',
  'assets/brands/samsung.jpg',
  'assets/brands/xiaomi.jpg',
  'assets/products/apple-iphone-16-pro.jpg',
  'assets/products/apple-iphone-16.jpg',
  'assets/products/apple-iphone-15-pro-max.jpg',
  'assets/products/apple-iphone-se.jpg',
  'assets/products/samsung-galaxy-s25-ultra.jpg',
  'assets/products/samsung-galaxy-s25.jpg',
  'assets/products/samsung-galaxy-z-fold6.jpg',
  'assets/products/samsung-galaxy-a55.jpg',
  'assets/products/xiaomi-15-ultra.jpg',
  'assets/products/xiaomi-15.jpg',
  'assets/products/xiaomi-14t-pro.jpg',
  'assets/products/xiaomi-redmi-note-14-pro.jpg',
  'assets/gallery/apple-hero-1.jpg',
  'assets/gallery/apple-hero-2.jpg',
  'assets/gallery/apple-hero-3.jpg',
  'assets/gallery/apple-hero-4.jpg',
  'assets/gallery/apple-detail-1.jpg',
  'assets/gallery/apple-detail-2.jpg',
  'assets/gallery/apple-detail-3.jpg',
  'assets/gallery/apple-detail-4.jpg',
  'assets/gallery/samsung-hero-1.jpg',
  'assets/gallery/samsung-hero-2.jpg',
  'assets/gallery/samsung-hero-3.jpg',
  'assets/gallery/samsung-hero-4.jpg',
  'assets/gallery/samsung-detail-1.jpg',
  'assets/gallery/samsung-detail-2.jpg',
  'assets/gallery/samsung-detail-3.jpg',
  'assets/gallery/samsung-detail-4.jpg',
  'assets/gallery/xiaomi-hero-1.jpg',
  'assets/gallery/xiaomi-hero-2.jpg',
  'assets/gallery/xiaomi-hero-3.jpg',
  'assets/gallery/xiaomi-hero-4.jpg',
  'assets/gallery/xiaomi-detail-1.jpg',
  'assets/gallery/xiaomi-detail-2.jpg',
  'assets/gallery/xiaomi-detail-3.jpg',
  'assets/gallery/xiaomi-detail-4.jpg',
  'assets/team/david-kim.jpg',
  'assets/team/sarah-chen.jpg',
  'assets/team/marcus-weber.jpg',
  'assets/team/elena-rodriguez.jpg',
  'assets/team/james-park.jpg',
  'assets/team/amira-hassan.jpg',
  'assets/social/post-1.jpg',
  'assets/social/post-2.jpg',
  'assets/social/post-3.jpg',
  'assets/social/post-4.jpg',
  'assets/social/post-5.jpg',
  'assets/social/post-6.jpg',
]

function getFallback(path: string): string {
  if (path.includes('apple')) return 'assets/products/apple-iphone-16-pro.jpg'
  if (path.includes('samsung')) return 'assets/products/samsung-galaxy-s25-ultra.jpg'
  if (path.includes('xiaomi')) return 'assets/products/xiaomi-15-ultra.jpg'
  if (path.includes('showroom') || path.includes('technology')) return 'assets/images/retail.jpg'
  return 'assets/products/apple-iphone-16-pro.jpg'
}

function createSvgPlaceholder(name: string): string {
  const label = name.replace(/\.(jpg|svg)$/, '').replace(/.*\//, '').replace(/-/g, ' ')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="50%" style="stop-color:#1e3a5f"/>
      <stop offset="100%" style="stop-color:#2563eb"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect x="280" y="180" width="240" height="480" rx="32" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
  <rect x="300" y="210" width="200" height="400" rx="16" fill="rgba(255,255,255,0.06)"/>
  <text x="400" y="780" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="system-ui,sans-serif" font-size="16">${label}</text>
</svg>`
}

for (const assetPath of allAssets) {
  const fullPath = join(publicDir, assetPath)
  if (existsSync(fullPath)) {
    console.log(`✓ exists ${assetPath}`)
    continue
  }

  mkdirSync(dirname(fullPath), { recursive: true })
  const fallback = join(publicDir, getFallback(assetPath))

  if (existsSync(fallback)) {
    copyFileSync(fallback, fullPath)
    console.log(`↳ copied ${getFallback(assetPath)} → ${assetPath}`)
  } else {
    const svgPath = fullPath.replace('.jpg', '.svg')
    writeFileSync(svgPath, createSvgPlaceholder(assetPath))
    console.log(`✓ svg ${svgPath.replace(publicDir + '/', '')}`)
  }
}

console.log('Done!')
