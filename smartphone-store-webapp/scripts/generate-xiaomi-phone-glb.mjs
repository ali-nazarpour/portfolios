/**
 * Builds a Xiaomi-style flagship phone GLB (Y-up, portrait — matches Apple/Samsung hero orientation).
 */
import { Blob } from 'node:buffer'

if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    result = null
    onload = null
    onloadend = null
    onerror = null

    readAsArrayBuffer(blob) {
      Promise.resolve(blob.arrayBuffer())
        .then((buffer) => {
          this.result = buffer
          const event = { target: { result: buffer } }
          this.onload?.(event)
          this.onloadend?.(event)
        })
        .catch((error) => this.onerror?.(error))
    }

    readAsDataURL(blob) {
      Promise.resolve(blob.arrayBuffer())
        .then((buffer) => {
          const base64 = Buffer.from(buffer).toString('base64')
          const mime = blob.type || 'application/octet-stream'
          this.result = `data:${mime};base64,${base64}`
          const event = { target: { result: this.result } }
          this.onload?.(event)
          this.onloadend?.(event)
        })
        .catch((error) => this.onerror?.(error))
    }
  }
}

import { mkdir, writeFile } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = join(__dirname, '..', 'public', 'assets', 'models', 'xiaomi', 'xiaomi-15-ultra.glb')

/** Add a flush lens stack: metal barrel + dark glass disc + outer ring (all coplanar on back). */
function addCameraLens(group, x, y, radius, backZ, camY, ringMat, lensMat) {
  const z = backZ - 0.014

  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(radius + 0.006, radius + 0.006, 0.01, 32),
    ringMat,
  )
  barrel.name = 'MetalRing'
  barrel.rotation.x = Math.PI / 2
  barrel.position.set(x, camY + y, z)
  group.add(barrel)

  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.82, radius * 0.82, 0.003, 32),
    lensMat,
  )
  glass.name = 'LensGlass'
  glass.rotation.x = Math.PI / 2
  glass.position.set(x, camY + y, z - 0.006)
  group.add(glass)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(radius + 0.002, 0.0025, 8, 32),
    ringMat,
  )
  ring.name = 'MetalRing'
  ring.rotation.x = Math.PI / 2
  ring.position.set(x, camY + y, z - 0.007)
  group.add(ring)
}

/** Portrait phone: width=X, height=Y, thickness=Z (same convention as Apple/Samsung GLBs). */
function createXiaomiPhone() {
  const group = new THREE.Group()
  group.name = 'Xiaomi15Ultra'

  const bodyMat = new THREE.MeshStandardMaterial({
    name: 'Body',
    color: '#1a1816',
    metalness: 0.9,
    roughness: 0.28,
  })

  const frameMat = new THREE.MeshStandardMaterial({
    name: 'Frame',
    color: '#3f3a36',
    metalness: 0.95,
    roughness: 0.2,
  })

  const screenMat = new THREE.MeshStandardMaterial({
    name: 'Display',
    color: '#050505',
    metalness: 0.1,
    roughness: 0.05,
    emissive: '#0f172a',
    emissiveIntensity: 0.22,
  })

  const cameraMat = new THREE.MeshStandardMaterial({
    name: 'CameraModule',
    color: '#141210',
    metalness: 0.92,
    roughness: 0.2,
  })

  const lensMat = new THREE.MeshPhysicalMaterial({
    name: 'LensGlass',
    color: '#050507',
    metalness: 0.08,
    roughness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    reflectivity: 1,
  })

  const ringMat = new THREE.MeshStandardMaterial({
    name: 'MetalRing',
    color: '#4a4540',
    metalness: 0.98,
    roughness: 0.15,
  })

  const accentMat = new THREE.MeshStandardMaterial({
    name: 'LeicaAccent',
    color: '#dc2626',
    metalness: 0.35,
    roughness: 0.4,
    emissive: '#991b1b',
    emissiveIntensity: 0.1,
  })

  const width = 0.72
  const height = 1.56
  const depth = 0.09
  const backZ = -(depth / 2)
  const camY = height * 0.28

  const body = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 6, 0.04), bodyMat)
  body.name = 'Body'
  group.add(body)

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.92, height * 0.94), screenMat)
  screen.name = 'Display'
  screen.position.set(0, 0, depth / 2 + 0.001)
  group.add(screen)

  // Circular camera island — flat puck flush with the back panel.
  const island = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.012, 64), cameraMat)
  island.name = 'CameraModule'
  island.rotation.x = Math.PI / 2
  island.position.set(0, camY, backZ - 0.006)
  group.add(island)

  const lensLayout = [
    { x: 0, y: 0.055, radius: 0.058 },
    { x: 0.078, y: 0, radius: 0.044 },
    { x: -0.078, y: 0, radius: 0.044 },
    { x: 0, y: -0.055, radius: 0.038 },
  ]

  for (const lens of lensLayout) {
    addCameraLens(group, lens.x, lens.y, lens.radius, backZ, camY, ringMat, lensMat)
  }

  const leicaDot = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.005, 24), accentMat)
  leicaDot.name = 'LeicaAccent'
  leicaDot.rotation.x = Math.PI / 2
  leicaDot.position.set(0.115, camY + 0.115, backZ - 0.008)
  group.add(leicaDot)

  const powerBtn = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.1, 0.02), frameMat)
  powerBtn.position.set(width / 2 + 0.006, height * 0.12, 0)
  group.add(powerBtn)

  const volBtn = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.14, 0.02), frameMat)
  volBtn.position.set(-width / 2 - 0.006, height * 0.08, 0)
  group.add(volBtn)

  return group
}

function exportGlb(object) {
  const exporter = new GLTFExporter()
  return new Promise((resolve, reject) => {
    exporter.parse(
      object,
      (result) => {
        if (result instanceof ArrayBuffer) resolve(Buffer.from(result))
        else reject(new Error('Expected binary GLB output'))
      },
      reject,
      { binary: true },
    )
  })
}

async function main() {
  await mkdir(dirname(outputPath), { recursive: true })
  const phone = createXiaomiPhone()
  const buffer = await exportGlb(phone)
  await writeFile(outputPath, buffer)
  console.log(`✓ Wrote ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
