import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const CHRISTORNG =
  'https://raw.githubusercontent.com/ChrisTorng/3d-phone-show7/main/models'

/** Direct-download flagship GLBs (no re-tinted iPhone clones). */
const assets: Record<string, string> = {
  // Apple — iPhone 17 Pro Max (Get3DModels, CC Attribution, textured)
  'assets/models/apple/iphone-17-pro-max.glb':
    'https://www.get3dmodels.com/download/iphone_17_pro_by_get3dmodels.glb',

  // Samsung — real Galaxy Ultra mesh (ChrisTorng GitHub mirror, CC0-style showcase asset)
  // Replace manually with S26 Ultra GLB from Sketchfab when available (see manualModels below).
  'assets/models/samsung/galaxy-s26-ultra.glb': `${CHRISTORNG}/samsung_galaxy_s22_ultra.glb`,
}

/** Sketchfab CC models — require free login to download; no public direct URL. */
const manualModels = [
  {
    path: 'assets/models/samsung/galaxy-s26-ultra.glb',
    label: 'Samsung Galaxy S26 Ultra (preferred over S22 fallback)',
    url: 'https://sketchfab.com/3d-models/samsung-galaxy-s26-ultra-15023522b9e342a194454fb371163f8e',
    author: 'gadirovsaid7',
  },
  {
    path: 'assets/models/xiaomi/xiaomi-15-ultra.glb',
    label: 'Xiaomi flagship (Mi 11 Pro — best free real Xiaomi GLB)',
    url: 'https://sketchfab.com/3d-models/xiaomi-mi-11-pro-95745b7868604ddfafd465c0d990f7d8',
    author: 'sangambro91',
  },
]

async function downloadAsset(relativePath: string, url: string) {
  const filePath = join(publicDir, relativePath)
  await mkdir(dirname(filePath), { recursive: true })

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = Buffer.from(await response.arrayBuffer())
    await writeFile(filePath, buffer)
    console.log(`✓ ${relativePath} (${(buffer.length / 1024).toFixed(1)} KB)`)
    return true
  } catch (error) {
    console.error(`✗ ${relativePath}:`, error)
    return false
  }
}

async function main() {
  console.log('Downloading flagship phone 3D models...\n')

  for (const [path, url] of Object.entries(assets)) {
    await downloadAsset(path, url)
  }

  console.log('\n--- Manual Sketchfab downloads (real Samsung/Xiaomi, CC Attribution) ---')
  for (const model of manualModels) {
    const filePath = join(publicDir, model.path)
    const exists = existsSync(filePath)
    console.log(`\n${exists ? '✓' : '⚠'} ${model.label}`)
    console.log(`  Save to: public/${model.path}`)
    console.log(`  Source:  ${model.url}`)
    console.log(`  Author:  ${model.author} (credit in About page if used commercially)`)
    if (!exists) {
      console.log('  → Log in on Sketchfab → Download 3D Model → GLB → place at path above')
    }
  }

  const xiaomiPath = join(publicDir, 'assets/models/xiaomi/xiaomi-15-ultra.glb')
  if (!existsSync(xiaomiPath)) {
    console.log('\n⚠ Xiaomi model missing — generating procedural fallback GLB...')
    const { spawnSync } = await import('child_process')
    const result = spawnSync(process.execPath, ['scripts/generate-xiaomi-phone-glb.mjs'], {
      cwd: join(__dirname, '..'),
      stdio: 'inherit',
    })
    if (result.status !== 0 || !existsSync(xiaomiPath)) {
      console.log(
        '  → Generation failed. Download Mi 11 Pro GLB from Sketchfab (see manualModels above).',
      )
    }
  }

  console.log('\nDone!')
}

main()
