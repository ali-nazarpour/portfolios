import * as THREE from 'three'

type MotorcyclePart =
  | 'tire'
  | 'rim'
  | 'engine'
  | 'headlight'
  | 'taillight'
  | 'seat'
  | 'chrome'
  | 'tank'
  | 'accent'
  | 'body'

/** Zero SR/F–inspired premium electric sport palette */
const PAINT: Record<MotorcyclePart, THREE.ColorRepresentation> = {
  body: '#6B7280',
  tank: '#C8102E',
  accent: '#1F2328',
  engine: '#3F454C',
  chrome: '#E2E4E8',
  seat: '#0C0B0A',
  headlight: '#FFF9EE',
  taillight: '#DC2626',
  tire: '#0A0A0A',
  rim: '#A8ADB5',
}

function getBounds(pos: THREE.BufferAttribute) {
  const min = new THREE.Vector3(Infinity, Infinity, Infinity)
  const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity)

  for (let i = 0; i < pos.count; i++) {
    min.x = Math.min(min.x, pos.getX(i))
    min.y = Math.min(min.y, pos.getY(i))
    min.z = Math.min(min.z, pos.getZ(i))
    max.x = Math.max(max.x, pos.getX(i))
    max.y = Math.max(max.y, pos.getY(i))
    max.z = Math.max(max.z, pos.getZ(i))
  }

  return { min, max }
}

function classifyMotorcycleVertex(
  x: number,
  y: number,
  z: number,
  bounds: { min: THREE.Vector3; max: THREE.Vector3 },
): MotorcyclePart {
  const size = bounds.max.clone().sub(bounds.min)
  const ny = (y - bounds.min.y) / (size.y || 1)
  const centerX = (bounds.min.x + bounds.max.x) / 2
  const nx = Math.abs(x - centerX) / ((size.x || 1) / 2)
  const nz = (z - bounds.min.z) / (size.z || 1)

  if (ny < 0.26 && nx > 0.3) {
    if (nx < 0.58 && ny > 0.06) return 'rim'
    return 'tire'
  }
  if (ny < 0.26 && (nz < 0.14 || nz > 0.82)) return 'tire'

  if (ny > 0.52 && nz < 0.18 && nx < 0.55) return 'headlight'
  if (ny > 0.58 && ny < 0.72 && nz > 0.94 && nx < 0.28) return 'taillight'

  if (ny > 0.54 && nz > 0.5 && nz < 0.86 && nx < 0.5) return 'seat'

  if (ny > 0.42 && ny < 0.66 && nz > 0.24 && nz < 0.56 && nx < 0.52) return 'tank'

  if (ny > 0.14 && ny < 0.42 && nz > 0.18 && nz < 0.48 && nx > 0.32) return 'accent'

  if (ny > 0.06 && ny < 0.36 && nx < 0.48 && nz > 0.2 && nz < 0.58) return 'engine'

  if (
    (ny > 0.1 && ny < 0.42 && nz > 0.48 && nz < 0.8) ||
    (ny > 0.28 && ny < 0.58 && nz < 0.2 && nx > 0.26) ||
    (ny > 0.08 && ny < 0.3 && nz > 0.62 && nz < 0.82 && nx > 0.2)
  ) {
    return 'chrome'
  }

  return 'body'
}

function buildPartMesh(
  source: THREE.BufferGeometry,
  center: THREE.Vector3,
  scale: number,
  bounds: { min: THREE.Vector3; max: THREE.Vector3 },
  include: (part: MotorcyclePart) => boolean,
) {
  const pos = source.getAttribute('position') as THREE.BufferAttribute
  const index = source.getIndex()
  const triangleCount = index ? index.count / 3 : pos.count / 3

  const positions: number[] = []
  const colors: number[] = []
  const normals: number[] = []
  const edge = new THREE.Vector3()
  const normal = new THREE.Vector3()

  for (let t = 0; t < triangleCount; t++) {
    const ia = index ? index.getX(t * 3) : t * 3
    const ib = index ? index.getX(t * 3 + 1) : t * 3 + 1
    const ic = index ? index.getX(t * 3 + 2) : t * 3 + 2

    const raw = [
      { x: pos.getX(ia), y: pos.getY(ia), z: pos.getZ(ia) },
      { x: pos.getX(ib), y: pos.getY(ib), z: pos.getZ(ib) },
      { x: pos.getX(ic), y: pos.getY(ic), z: pos.getZ(ic) },
    ]

    const cx = (raw[0].x + raw[1].x + raw[2].x) / 3
    const cy = (raw[0].y + raw[1].y + raw[2].y) / 3
    const cz = (raw[0].z + raw[1].z + raw[2].z) / 3
    const part = classifyMotorcycleVertex(cx, cy, cz, bounds)
    if (!include(part)) continue

    const color = new THREE.Color(PAINT[part])
    const verts = raw.map((v) => new THREE.Vector3(
      (v.x - center.x) * scale,
      (v.y - center.y) * scale,
      (v.z - center.z) * scale,
    ))

    edge.subVectors(verts[1], verts[0])
    normal.subVectors(verts[2], verts[0]).cross(edge).normalize()

    for (const v of verts) {
      positions.push(v.x, v.y, v.z)
      colors.push(color.r, color.g, color.b)
      normals.push(normal.x, normal.y, normal.z)
    }
  }

  if (positions.length === 0) return null

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))

  return geometry
}

export interface MotorcycleParts {
  root: THREE.Group
  engineCenter: THREE.Vector3
  engineSize: THREE.Vector3
  headlightWorld: THREE.Vector3
  taillightWorld: THREE.Vector3
}

export function buildMotorcycleFromScene(scene: THREE.Group, targetSize: number): MotorcycleParts {
  const sourceMesh = scene.getObjectByProperty('type', 'Mesh') as THREE.Mesh | undefined
  if (!sourceMesh?.geometry) {
    throw new Error('Motorcycle GLB is missing mesh geometry')
  }

  const geometry = sourceMesh.geometry.clone()
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute
  const bounds = getBounds(pos)
  const center = bounds.min.clone().add(bounds.max).multiplyScalar(0.5)
  const size = bounds.max.clone().sub(bounds.min)
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  const scale = targetSize / maxDim

  const root = new THREE.Group()

  const paintedGeometry = buildPartMesh(
    geometry,
    center,
    scale,
    bounds,
    (part) => part !== 'chrome',
  )

  if (paintedGeometry) {
    const bodyMesh = new THREE.Mesh(
      paintedGeometry,
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0.78,
        roughness: 0.24,
        envMapIntensity: 1.75,
        flatShading: false,
      }),
    )
    bodyMesh.castShadow = true
    bodyMesh.receiveShadow = true
    root.add(bodyMesh)
  }

  const chromeGeometry = buildPartMesh(
    geometry,
    center,
    scale,
    bounds,
    (part) => part === 'chrome',
  )

  if (chromeGeometry) {
    const chromeMesh = new THREE.Mesh(
      chromeGeometry,
      new THREE.MeshStandardMaterial({
        color: PAINT.chrome,
        metalness: 0.94,
        roughness: 0.08,
        envMapIntensity: 2.2,
      }),
    )
    chromeMesh.castShadow = true
    root.add(chromeMesh)
  }

  const scaledMin = bounds.min.clone().sub(center).multiplyScalar(scale)
  const scaledMax = bounds.max.clone().sub(center).multiplyScalar(scale)
  const scaledSize = scaledMax.clone().sub(scaledMin)

  const headlightWorld = new THREE.Vector3(
    0,
    scaledMin.y + scaledSize.y * 0.58,
    scaledMin.z + scaledSize.z * 0.05,
  )
  const taillightWorld = new THREE.Vector3(
    0,
    scaledMin.y + scaledSize.y * 0.62,
    scaledMax.z - scaledSize.z * 0.01,
  )

  const headlightGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 12, 12),
    new THREE.MeshStandardMaterial({
      color: '#FFF3D0',
      emissive: '#FFC107',
      emissiveIntensity: 2.5,
      toneMapped: false,
    }),
  )
  headlightGlow.position.copy(headlightWorld)
  root.add(headlightGlow)

  const taillightGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 8, 8),
    new THREE.MeshStandardMaterial({
      color: '#FF4444',
      emissive: '#FF2222',
      emissiveIntensity: 2,
      toneMapped: false,
    }),
  )
  taillightGlow.position.copy(taillightWorld)
  root.add(taillightGlow)

  const engineCenter = new THREE.Vector3(
    0,
    scaledMin.y + scaledSize.y * 0.16,
    scaledMin.z + scaledSize.z * 0.36,
  )
  const engineSize = new THREE.Vector3(
    scaledSize.x * 0.44,
    scaledSize.y * 0.24,
    scaledSize.z * 0.24,
  )

  return {
    root,
    engineCenter,
    engineSize,
    headlightWorld,
    taillightWorld,
  }
}
