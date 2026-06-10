/**
 * @deprecated Use `python scripts/download-images.py` (npm run download-assets).
 * Node fetch/undici can fail with SSL errors on Windows; Python requests is reliable.
 */
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const pythonScript = join(scriptDir, 'download-images.py')

const result = spawnSync('python', [pythonScript], { stdio: 'inherit' })
process.exit(result.status ?? 1)
