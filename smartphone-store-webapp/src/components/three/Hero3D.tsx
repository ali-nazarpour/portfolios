import {
  Component,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Float,
  Environment,
  Sparkles,
  useGLTF,
  useTexture,
  ContactShadows,
  Html,
  OrbitControls,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { heroPhoneModels, HERO_PHONE_TARGET_SIZE } from '@/config/heroModels'
import type { HeroPhoneConfig } from '@/config/heroModels'

const HeroInteractContext = createContext(false)

async function isGlbAvailable(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { headers: { Range: 'bytes=0-3' } })
    if (!response.ok && response.status !== 206) return false

    const buffer = await response.arrayBuffer()
    if (buffer.byteLength < 4) return false

    return new TextDecoder().decode(new Uint8Array(buffer, 0, 4)) === 'glTF'
  } catch {
    return false
  }
}

class PhoneModelErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

function getModelBounds(object: THREE.Object3D) {
  const box = new THREE.Box3()
  let hasMesh = false

  object.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh || !mesh.geometry) return

    mesh.geometry.computeBoundingBox()
    if (!mesh.geometry.boundingBox) return

    const meshBox = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld)
    box.union(meshBox)
    hasMesh = true
  })

  if (!hasMesh) {
    box.setFromObject(object)
  }

  return box
}

function trimDetachedAccessories(root: THREE.Object3D) {
  const meshes: { mesh: THREE.Mesh; center: THREE.Vector3; volume: number }[] = []

  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh || !mesh.geometry || !mesh.visible) return

    mesh.geometry.computeBoundingBox()
    if (!mesh.geometry.boundingBox) return

    const box = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld)
    const size = box.getSize(new THREE.Vector3())
    meshes.push({
      mesh,
      center: box.getCenter(new THREE.Vector3()),
      volume: size.x * size.y * size.z,
    })
  })

  if (meshes.length < 2) return

  const anchor = meshes.reduce((largest, entry) =>
    entry.volume > largest.volume ? entry : largest,
  )

  const anchorScale = Math.cbrt(anchor.volume)

  meshes.forEach(({ mesh, center, volume }) => {
    if (mesh === anchor.mesh) return

    const isDetached =
      center.distanceTo(anchor.center) > anchorScale * 0.55 && volume < anchor.volume * 0.45

    if (isDetached) mesh.visible = false
  })
}

function preparePhoneScene(scene: THREE.Object3D, config: HeroPhoneConfig) {
  if (config.trimAccessories) {
    trimDetachedAccessories(scene)
  }

  if (config.modelRotation) {
    scene.rotation.set(...config.modelRotation)
    scene.updateMatrixWorld(true)
  }
}

function normalizePhoneModel(object: THREE.Object3D, config: HeroPhoneConfig) {
  object.updateMatrixWorld(true)

  const box = getModelBounds(object)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z)
  const targetSize = (config.targetSize ?? HERO_PHONE_TARGET_SIZE) * (config.scale ?? 1)
  const scale = maxDim > 0 ? targetSize / maxDim : 1

  const wrapper = new THREE.Group()
  object.position.sub(center)
  wrapper.add(object)
  wrapper.scale.setScalar(scale)
  wrapper.updateMatrixWorld(true)

  const scaledBox = new THREE.Box3().setFromObject(wrapper)
  const scaledCenter = scaledBox.getCenter(new THREE.Vector3())
  wrapper.position.y -= scaledCenter.y

  return wrapper
}

const SCREEN_KEYWORDS = ['screen', 'display', 'wallpaper']
const SCREEN_EXCLUDE_KEYWORDS = ['screen_rim', 'screen rim', 'rim', 'bezel']
const CAMERA_KEYWORDS = ['camera', 'island', 'leica', 'module']
const LENS_GLASS_KEYWORDS = ['lensglass', 'lens_glass']
const METAL_RING_KEYWORDS = ['metalring', 'metal_ring', 'lensring']

function isScreenGlassMaterial(name: string): boolean {
  return name.toLowerCase().includes('glass')
}

function isScreenWallpaperMaterial(name: string): boolean {
  const lower = name.toLowerCase()
  if (
    isScreenGlassMaterial(lower) ||
    SCREEN_EXCLUDE_KEYWORDS.some((keyword) => lower.includes(keyword)) ||
    CAMERA_KEYWORDS.some((keyword) => lower.includes(keyword)) ||
    LENS_GLASS_KEYWORDS.some((keyword) => lower.includes(keyword)) ||
    METAL_RING_KEYWORDS.some((keyword) => lower.includes(keyword))
  ) {
    return false
  }
  return SCREEN_KEYWORDS.some((keyword) => lower.includes(keyword))
}

function isLensGlassMaterial(name: string): boolean {
  const lower = name.toLowerCase()
  return LENS_GLASS_KEYWORDS.some((keyword) => lower.includes(keyword)) ||
    (lower.includes('lens') && !METAL_RING_KEYWORDS.some((keyword) => lower.includes(keyword)))
}

function isMetalRingMaterial(name: string): boolean {
  const lower = name.toLowerCase()
  return METAL_RING_KEYWORDS.some((keyword) => lower.includes(keyword))
}

function isCameraHousingMaterial(name: string): boolean {
  const lower = name.toLowerCase()
  if (isLensGlassMaterial(name) || isMetalRingMaterial(name)) return false
  return CAMERA_KEYWORDS.some((keyword) => lower.includes(keyword))
}

function hasBaseColorMap(mat: THREE.Material): boolean {
  return 'map' in mat && Boolean((mat as THREE.MeshStandardMaterial).map)
}

/** Atlas UVs from baked GLBs must span 0–1 before applying a full-screen wallpaper. */
function normalizeScreenUVs(root: THREE.Object3D) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh || !mesh.geometry) return

    const matName = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material)?.name || mesh.name || ''
    if (!isScreenWallpaperMaterial(matName)) return

    const uv = mesh.geometry.attributes.uv as THREE.BufferAttribute | undefined
    if (!uv) return

    let minU = Infinity
    let maxU = -Infinity
    let minV = Infinity
    let maxV = -Infinity

    for (let i = 0; i < uv.count; i++) {
      const u = uv.getX(i)
      const v = uv.getY(i)
      minU = Math.min(minU, u)
      maxU = Math.max(maxU, u)
      minV = Math.min(minV, v)
      maxV = Math.max(maxV, v)
    }

    const rangeU = maxU - minU
    const rangeV = maxV - minV
    if (rangeU <= 0 || rangeV <= 0) return

    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, (uv.getX(i) - minU) / rangeU, (uv.getY(i) - minV) / rangeV)
    }

    uv.needsUpdate = true
  })
}

function clearEmbeddedScreenMaps(mat: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial) {
  mat.metalnessMap = null
  mat.roughnessMap = null
  mat.aoMap = null
  mat.normalMap = null
  mat.bumpMap = null
  mat.displacementMap = null
  mat.alphaMap = null
  mat.lightMap = null
  if (mat instanceof THREE.MeshPhysicalMaterial) {
    mat.specularColorMap = null
    mat.specularIntensityMap = null
  }
}

/** Light studio polish for real GLBs — no re-tinting. */
function polishPhoneMaterials(
  root: THREE.Object3D,
  config: HeroPhoneConfig,
  wallpaper?: THREE.Texture,
) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh || !mesh.material) return

    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]

    materials.forEach((mat) => {
      if (
        !(mat instanceof THREE.MeshStandardMaterial) &&
        !(mat instanceof THREE.MeshPhysicalMaterial)
      ) {
        return
      }

      const matName = mat.name || mesh.name || ''
      const isWallpaper = isScreenWallpaperMaterial(matName)
      const isGlass = isScreenGlassMaterial(matName)

      mat.envMapIntensity = isWallpaper || isGlass ? 1.1 : 0.85

      if (isWallpaper) {
        if (wallpaper) {
          clearEmbeddedScreenMaps(mat)
          mat.map = wallpaper
          mat.emissiveMap = wallpaper
          mat.emissive = new THREE.Color('#ffffff')
          mat.emissiveIntensity = 0.42
          mat.metalness = 0.02
          mat.roughness = 0.18
          mat.color = new THREE.Color('#ffffff')
        } else if (hasBaseColorMap(mat)) {
          mat.emissive = new THREE.Color('#ffffff')
          mat.emissiveIntensity = 0.35
          mat.metalness = 0.05
          mat.roughness = 0.18
        } else {
          mat.emissive = new THREE.Color('#111827')
          mat.emissiveIntensity = 0.12
        }
      } else if (isGlass) {
        mat.transparent = true
        mat.opacity = 0.18
        mat.metalness = 0
        mat.roughness = 0.05
        mat.color = new THREE.Color('#ffffff')
        mat.emissive = new THREE.Color('#000000')
        mat.emissiveIntensity = 0
      } else if (isLensGlassMaterial(matName)) {
        mat.color = new THREE.Color('#050507')
        mat.metalness = 0.08
        mat.roughness = 0.05
        mat.envMapIntensity = 1.4
        if (mat instanceof THREE.MeshPhysicalMaterial) {
          mat.clearcoat = 1
          mat.clearcoatRoughness = 0.04
          mat.reflectivity = 1
        }
      } else if (isMetalRingMaterial(matName)) {
        mat.color = new THREE.Color('#4a4540')
        mat.metalness = 0.95
        mat.roughness = 0.18
        mat.envMapIntensity = 1.2
      } else if (isCameraHousingMaterial(matName)) {
        if (/leica|accent/i.test(matName)) {
          mat.color = new THREE.Color('#dc2626')
          mat.emissive = new THREE.Color('#991b1b')
          mat.emissiveIntensity = 0.08
          mat.metalness = 0.35
          mat.roughness = 0.4
        } else {
          mat.color = new THREE.Color('#141210')
          mat.metalness = 0.9
          mat.roughness = 0.22
          mat.envMapIntensity = 1.1
        }
      } else if (config.brand === 'xiaomi' && !hasBaseColorMap(mat)) {
        if (/leica|accent/i.test(matName)) {
          mat.color = new THREE.Color('#ea580c')
          mat.emissive = new THREE.Color('#c2410c')
          mat.emissiveIntensity = 0.15
          mat.metalness = 0.4
          mat.roughness = 0.35
        } else if (/body|frame/i.test(matName)) {
          mat.color = new THREE.Color(matName.toLowerCase().includes('body') ? '#2a2622' : '#3d3834')
          mat.metalness = 0.82
          mat.roughness = 0.32
          mat.envMapIntensity = 1.05
        }
      } else if (!hasBaseColorMap(mat) && config.materialPreset === 'apple-titanium') {
        mat.color = new THREE.Color('#8b8b8e')
        mat.metalness = 0.92
        mat.roughness = 0.22
      }

      mat.needsUpdate = true
    })
  })
}

function SceneControls({ onInteractingChange }: { onInteractingChange: (v: boolean) => void }) {
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
      minDistance={3.6}
      maxDistance={8.5}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.6}
      autoRotate
      autoRotateSpeed={0.6}
      onStart={() => onInteractingChange(true)}
      onEnd={() => onInteractingChange(false)}
    />
  )
}

function GLTFPhone({ config }: { config: HeroPhoneConfig }) {
  const { scene } = useGLTF(config.path)
  const isInteracting = useContext(HeroInteractContext)
  const wallpaper = useTexture(config.screenWallpaper ?? '/assets/gallery/apple-hero-2.jpg')

  const model = useMemo(() => {
    wallpaper.colorSpace = THREE.SRGBColorSpace
    wallpaper.flipY = true
    wallpaper.wrapS = THREE.ClampToEdgeWrapping
    wallpaper.wrapT = THREE.ClampToEdgeWrapping

    const clone = scene.clone(true)
    preparePhoneScene(clone, config)
    normalizeScreenUVs(clone)
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
      }
    })
    polishPhoneMaterials(clone, config, wallpaper)
    return normalizePhoneModel(clone, config)
  }, [scene, config, wallpaper])

  const floatProps = isInteracting
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0, floatingRange: [0, 0] as [number, number] }
    : {
        speed: config.floatSpeed,
        rotationIntensity: 0,
        floatIntensity: 0.12,
        floatingRange: [-0.03, 0.03] as [number, number],
      }

  return (
    <Float {...floatProps}>
      <group position={config.position} rotation={config.rotation}>
        <primitive object={model} />
      </group>
    </Float>
  )
}

function PhoneCluster({ models }: { models: HeroPhoneConfig[] }) {
  return (
    <group position={[0, 0, 0]}>
      {models.map((config) => (
        <PhoneModelErrorBoundary key={config.id}>
          <GLTFPhone config={config} />
        </PhoneModelErrorBoundary>
      ))}
    </group>
  )
}

function useAvailableHeroModels() {
  const [models, setModels] = useState<HeroPhoneConfig[]>([])

  useEffect(() => {
    let cancelled = false

    Promise.all(
      heroPhoneModels.map(async (config) => {
        const available = await isGlbAvailable(config.path)
        return available ? config : null
      }),
    ).then((results) => {
      if (!cancelled) setModels(results.filter((m): m is HeroPhoneConfig => m !== null))
    })

    return () => {
      cancelled = true
    }
  }, [])

  return models
}

function Scene({
  onInteractingChange,
  models,
}: {
  onInteractingChange: (v: boolean) => void
  models: HeroPhoneConfig[]
}) {
  return (
    <>
      <ambientLight intensity={0.32} />
      <hemisphereLight args={['#ffffff', '#334155', 0.45]} position={[0, 2, 6]} />

      {/* Key light — from the viewer / front (+Z) */}
      <directionalLight
        position={[0, 1.2, 8]}
        intensity={2.1}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Soft front fill */}
      <directionalLight position={[0, 3.5, 6]} intensity={0.55} color="#f1f5f9" />
      {/* Gentle side accents — kept low so the front key dominates */}
      <directionalLight position={[-4, 2, 3]} intensity={0.18} color="#bfdbfe" />
      <directionalLight position={[4, 2, 3]} intensity={0.18} color="#bfdbfe" />
      {/* Subtle rim from behind for edge separation */}
      <directionalLight position={[0, 1.5, -5]} intensity={0.12} color="#818cf8" />

      <PhoneCluster models={models} />

      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.28}
        scale={5.5}
        blur={2.2}
        far={2.8}
      />

      <Sparkles count={30} scale={[5, 3, 3]} size={1} speed={0.2} opacity={0.25} color="#60a5fa" />

      <Environment preset="studio" background={false} environmentIntensity={0.55} />

      <SceneControls onInteractingChange={onInteractingChange} />
    </>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </Html>
  )
}

function Hero3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src="/assets/products/apple-iphone-16-pro.jpg"
        alt="iPhone"
        className="w-44 md:w-52 h-auto rounded-2xl shadow-2xl"
      />
    </div>
  )
}

function HeroCanvas() {
  const [isInteracting, setIsInteracting] = useState(false)
  const availableModels = useAvailableHeroModels()
  const { t } = useTranslation()

  return (
    <div
      className={`w-full h-[400px] md:h-[500px] lg:h-[600px] relative overflow-hidden rounded-2xl group ${
        isInteracting ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      data-lenis-prevent
    >
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {t('hero.dragHint')}
      </div>

      <Canvas
        camera={{ position: [0, 0.12, 5.8], fov: 36, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        shadows
        style={{ background: 'transparent', touchAction: 'none' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <HeroInteractContext.Provider value={isInteracting}>
          <Suspense fallback={<LoadingFallback />}>
            <PreloadHeroModels models={availableModels} />
            <Scene onInteractingChange={setIsInteracting} models={availableModels} />
          </Suspense>
        </HeroInteractContext.Provider>
      </Canvas>
    </div>
  )
}

function PreloadHeroModels({ models }: { models: HeroPhoneConfig[] }) {
  useEffect(() => {
    models.forEach((config) => {
      useGLTF.preload(config.path)
      if (config.screenWallpaper) {
        useTexture.preload(config.screenWallpaper)
      }
    })
  }, [models])

  return null
}

export function Hero3D() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return <Hero3DFallback />
  }

  return <HeroCanvas />
}
