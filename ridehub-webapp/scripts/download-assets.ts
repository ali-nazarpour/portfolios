import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const PEXELS = 'https://images.pexels.com/photos'
const HQ = '?auto=compress&cs=tinysrgb&w=1920'
const PORTRAIT = '?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop'
const SQUARE = '?auto=compress&cs=tinysrgb&w=1080&h=1080&fit=crop'
const AVATAR = '?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop'

const assets: Record<string, string> = {
  'assets/gallery/bike-trail.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${HQ}`,
  'assets/gallery/bike-mountain.jpg': `${PEXELS}/100582/pexels-photo-100582.jpeg${HQ}`,
  'assets/gallery/bike-road.jpg': `${PEXELS}/248547/pexels-photo-248547.jpeg${HQ}`,
  'assets/gallery/bike-gravel.jpg': `${PEXELS}/2762247/pexels-photo-2762247.jpeg${HQ}`,
  'assets/gallery/scooter-urban.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${HQ}`,
  'assets/gallery/scooter-city.jpg': `${PEXELS}/1592384/pexels-photo-1592384.jpeg${HQ}`,
  'assets/gallery/motorcycle-road.jpg': `${PEXELS}/1413414/pexels-photo-1413414.jpeg${HQ}`,
  'assets/gallery/motorcycle-adventure.jpg': `${PEXELS}/2116475/pexels-photo-2116475.jpeg${HQ}`,
  'assets/gallery/showroom-1.jpg': `${PEXELS}/3807277/pexels-photo-3807277.jpeg${HQ}`,
  'assets/gallery/showroom-2.jpg': `${PEXELS}/4480505/pexels-photo-4480505.jpeg${HQ}`,
  'assets/gallery/lifestyle-1.jpg': `${PEXELS}/1365425/pexels-photo-1365425.jpeg${HQ}`,
  'assets/gallery/lifestyle-2.jpg': `${PEXELS}/296282/pexels-photo-296282.jpeg${HQ}`,
  'assets/gallery/tech-1.jpg': `${PEXELS}/1592384/pexels-photo-1592384.jpeg${HQ}`,
  'assets/gallery/tech-2.jpg': `${PEXELS}/2116475/pexels-photo-2116475.jpeg${HQ}`,
  'assets/images/cinematic-reveal.jpg': `${PEXELS}/1413414/pexels-photo-1413414.jpeg${HQ}`,
  'assets/images/hero-bg.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${HQ}`,
  'assets/images/about-showroom.jpg': `${PEXELS}/3807277/pexels-photo-3807277.jpeg${HQ}`,
  'assets/images/contact-hero.jpg': `${PEXELS}/4480505/pexels-photo-4480505.jpeg${HQ}`,
  'assets/products/trek-fuel-exe.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${HQ}`,
  'assets/products/trek-fuel-exe-2.jpg': `${PEXELS}/100582/pexels-photo-100582.jpeg${HQ}`,
  'assets/products/trek-domane.jpg': `${PEXELS}/248547/pexels-photo-248547.jpeg${HQ}`,
  'assets/products/giant-trance.jpg': `${PEXELS}/100582/pexels-photo-100582.jpeg${HQ}`,
  'assets/products/giant-revolt.jpg': `${PEXELS}/2762247/pexels-photo-2762247.jpeg${HQ}`,
  'assets/products/specialized-levo.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${HQ}`,
  'assets/products/specialized-tarmac.jpg': `${PEXELS}/248547/pexels-photo-248547.jpeg${HQ}`,
  'assets/products/segway-max-g2.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${HQ}`,
  'assets/products/segway-gt3.jpg': `${PEXELS}/1592384/pexels-photo-1592384.jpeg${HQ}`,
  'assets/products/xiaomi-4-pro.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${HQ}`,
  'assets/products/xiaomi-5-max.jpg': `${PEXELS}/1592384/pexels-photo-1592384.jpeg${HQ}`,
  'assets/products/zero-srf.jpg': `${PEXELS}/1413414/pexels-photo-1413414.jpeg${HQ}`,
  'assets/products/zero-dsrx.jpg': `${PEXELS}/2116475/pexels-photo-2116475.jpeg${HQ}`,
  'assets/team/sarah-chen.jpg': `${PEXELS}/774909/pexels-photo-774909.jpeg${PORTRAIT}`,
  'assets/team/marcus-webb.jpg': `${PEXELS}/2379004/pexels-photo-2379004.jpeg${PORTRAIT}`,
  'assets/team/elena-rodriguez.jpg': `${PEXELS}/1181686/pexels-photo-1181686.jpeg${PORTRAIT}`,
  'assets/team/james-okonkwo.jpg': `${PEXELS}/1222271/pexels-photo-1222271.jpeg${PORTRAIT}`,
  'assets/team/amy-foster.jpg': `${PEXELS}/1239291/pexels-photo-1239291.jpeg${PORTRAIT}`,
  'assets/team/david-kim.jpg': `${PEXELS}/220453/pexels-photo-220453.jpeg${PORTRAIT}`,
  'assets/social/post-1.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${SQUARE}`,
  'assets/social/post-2.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${SQUARE}`,
  'assets/social/post-3.jpg': `${PEXELS}/3807277/pexels-photo-3807277.jpeg${SQUARE}`,
  'assets/social/post-4.jpg': `${PEXELS}/1413414/pexels-photo-1413414.jpeg${SQUARE}`,
  'assets/social/post-5.jpg': `${PEXELS}/2762247/pexels-photo-2762247.jpeg${SQUARE}`,
  'assets/social/post-6.jpg': `${PEXELS}/100582/pexels-photo-100582.jpeg${SQUARE}`,
  'assets/blog/ebike-guide.jpg': `${PEXELS}/2908458/pexels-photo-2908458.jpeg${HQ}`,
  'assets/blog/scooter-commute.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${HQ}`,
  'assets/blog/motorcycle-future.jpg': `${PEXELS}/1413414/pexels-photo-1413414.jpeg${HQ}`,
  'assets/blog/showroom-tips.jpg': `${PEXELS}/3807277/pexels-photo-3807277.jpeg${HQ}`,
  'assets/case-studies/municipal-1.jpg': `${PEXELS}/208736/pexels-photo-208736.jpeg${HQ}`,
  'assets/case-studies/fleet-1.jpg': `${PEXELS}/1758144/pexels-photo-1758144.jpeg${HQ}`,
  'assets/case-studies/corporate-1.jpg': `${PEXELS}/3807277/pexels-photo-3807277.jpeg${HQ}`,
  'assets/testimonials/avatar-1.jpg': `${PEXELS}/774909/pexels-photo-774909.jpeg${AVATAR}`,
  'assets/testimonials/avatar-2.jpg': `${PEXELS}/1222271/pexels-photo-1222271.jpeg${AVATAR}`,
  'assets/testimonials/avatar-3.jpg': `${PEXELS}/1239291/pexels-photo-1239291.jpeg${AVATAR}`,
  'assets/testimonials/avatar-4.jpg': `${PEXELS}/220453/pexels-photo-220453.jpeg${AVATAR}`,
  'assets/testimonials/avatar-5.jpg': `${PEXELS}/1181686/pexels-photo-1181686.jpeg${AVATAR}`,
}

async function downloadAsset(relativePath: string, url: string) {
  const filePath = join(publicDir, relativePath)
  await mkdir(dirname(filePath), { recursive: true })

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'RideHub-Asset-Downloader/1.0' },
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(filePath, buffer)
    console.log(`✓ ${relativePath}`)
  } catch (error) {
    console.error(`✗ ${relativePath}:`, error)
  }
}

console.log(`Downloading ${Object.keys(assets).length} RideHub assets...\n`)
for (const [path, url] of Object.entries(assets)) {
  await downloadAsset(path, url)
  await new Promise((r) => setTimeout(r, 200))
}
console.log('\nDone.')
