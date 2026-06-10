import {
  Component,
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  Sparkles,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@/lib/utils'
import { heroModels } from '@/config/heroModels'

interface HeroVehicleConfig {
  id: string
  path: string
  position: [number, number, number]
  rotation: [number, number, number]
  targetSize: number
  spin?: number
  accentColors?: string[]
  /** Keep embedded GLB textures/colors instead of applying accent palette */
  useOriginalMaterials?: boolean
}

const HERO_VEHICLES: HeroVehicleConfig[] = [
  {
    id: 'bicycle',
    path: heroModels.bicycle.path,
    position: [-0.45, -0.05, 0],
    rotation: [0, Math.PI / 5, 0],
    targetSize: 1.5,
    spin: 0.12,
    useOriginalMaterials: true,
  },
  {
    id: 'scooter',
    path: heroModels.scooter.path,
    position: [0.55, -0.15, 0.15],
    rotation: [0, -Math.PI / 5, 0],
    targetSize: 1.2,
    spin: 0.18,
    accentColors: ['#0ea5e9', '#1e293b', '#64748b', '#f8fafc', '#334155'],
  },
]

const DEFAULT_ACCENT = ['#dc2626', '#2563eb', '#94a3b8', '#1e293b', '#f8fafc']
const HeroInteractContext = createContext(false)

for (const config of HERO_VEHICLES) {
  useGLTF.preload(config.path)
}

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

class VehicleModelErrorBoundary extends Component<
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

function fixMaterial(
  mat: THREE.Material,
  fallbackColor: string,
  preserveOriginal = false,
): THREE.MeshStandardMaterial {
  if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
    const hasTexture = !!(mat.map || mat.metalnessMap || mat.roughnessMap)

    if (preserveOriginal && hasTexture) {
      mat.metalness = Math.min(mat.metalness ?? 0.2, 0.45)
      mat.roughness = Math.max(mat.roughness ?? 0.55, 0.35)
      mat.envMapIntensity = 1.2
      return mat
    }

    mat.metalness = hasTexture ? Math.min(mat.metalness ?? 0.35, 0.55) : 0.42
    mat.roughness = hasTexture ? Math.max(mat.roughness ?? 0.45, 0.28) : 0.38
    mat.envMapIntensity = 1.35
    if (!preserveOriginal && !mat.map && mat.color.getHex() >= 0xdddddd) {
      mat.color.set(fallbackColor)
    }
    return mat
  }

  const source = mat as THREE.MeshStandardMaterial & THREE.MeshPhongMaterial & THREE.MeshLambertMaterial
  const hasTexture = !!(source.map || source.normalMap)
  const color =
    preserveOriginal && source.color
      ? source.color.clone()
      : source.color && source.color.getHex() > 0x222222 && source.color.getHex() < 0xdddddd
        ? source.color.clone()
        : new THREE.Color(fallbackColor)

  const standard = new THREE.MeshStandardMaterial({
    color,
    map: source.map ?? null,
    normalMap: source.normalMap ?? null,
    metalnessMap: (source as THREE.MeshStandardMaterial).metalnessMap ?? null,
    roughnessMap: (source as THREE.MeshStandardMaterial).roughnessMap ?? null,
    metalness: hasTexture ? 0.25 : 0.42,
    roughness: hasTexture ? 0.45 : 0.38,
    envMapIntensity: 1.35,
  })
  mat.dispose()
  return standard
}

function normalizeModel(
  scene: THREE.Group,
  targetSize: number,
  accentColors: string[],
  preserveOriginalMaterials = false,
) {
  const clone = scene.clone(true)
  trimDetachedAccessories(clone)
  clone.updateMatrixWorld(true)

  const box = getModelBounds(clone)
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z) || 1

  clone.position.sub(center)
  clone.scale.setScalar(targetSize / maxDim)

  let meshIndex = 0
  clone.traverse((child) => {
    const mesh = child as THREE.Mesh
    if (!mesh.isMesh) return

    mesh.castShadow = true
    mesh.receiveShadow = true

    const fallbackColor = accentColors[meshIndex % accentColors.length]
    meshIndex++

    if (Array.isArray(mesh.material)) {
      mesh.material = mesh.material.map((mat, index) =>
        fixMaterial(mat, accentColors[index % accentColors.length], preserveOriginalMaterials),
      )
    } else if (mesh.material) {
      mesh.material = fixMaterial(mesh.material, fallbackColor, preserveOriginalMaterials)
    } else if (!preserveOriginalMaterials) {
      mesh.material = new THREE.MeshStandardMaterial({
        color: fallbackColor,
        metalness: 0.42,
        roughness: 0.38,
        envMapIntensity: 1.35,
      })
    }
  })

  return clone
}

function VehicleModel({
  config,
}: {
  config: HeroVehicleConfig
}) {
  const groupRef = useRef<THREE.Group>(null)
  const isInteracting = useContext(HeroInteractContext)
  const { scene } = useGLTF(config.path)
  const accentColors = config.accentColors ?? DEFAULT_ACCENT

  const model = useMemo(
    () =>
      normalizeModel(
        scene,
        config.targetSize,
        accentColors,
        config.useOriginalMaterials ?? false,
      ),
    [scene, config.targetSize, accentColors, config.useOriginalMaterials],
  )

  useFrame((state) => {
    if (!groupRef.current || isInteracting) return
    const spin = config.spin ?? 0.15
    groupRef.current.rotation.y =
      config.rotation[1] + Math.sin(state.clock.elapsedTime * spin) * 0.08
  })

  const floatProps = isInteracting
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0, floatingRange: [0, 0] as [number, number] }
    : {
        speed: 1.2,
        rotationIntensity: 0.1,
        floatIntensity: 0.2,
        floatingRange: [-0.03, 0.03] as [number, number],
      }

  return (
    <Float {...floatProps}>
      <group ref={groupRef} position={config.position} rotation={config.rotation}>
        <primitive object={model} />
      </group>
    </Float>
  )
}

function VehicleCluster({ models }: { models: HeroVehicleConfig[] }) {
  return (
    <>
      {models.map((config) => (
        <VehicleModelErrorBoundary key={config.id}>
          <Suspense fallback={<LoadingFallback />}>
            <VehicleModel config={config} />
          </Suspense>
        </VehicleModelErrorBoundary>
      ))}
    </>
  )
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
      minDistance={3.5}
      maxDistance={10}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.8}
      target={[0.1, 0, 0]}
      autoRotate
      autoRotateSpeed={0.5}
      onStart={() => onInteractingChange(true)}
      onEnd={() => onInteractingChange(false)}
    />
  )
}

function Scene({
  models,
  onInteractingChange,
}: {
  models: HeroVehicleConfig[]
  onInteractingChange: (v: boolean) => void
}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#ffffff', '#334155', 0.45]} position={[0, 2, 6]} />
      <directionalLight
        position={[0, 1.2, 8]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[0, 3.5, 6]} intensity={0.55} color="#f1f5f9" />
      <directionalLight position={[-4, 2, 3]} intensity={0.2} color="#bfdbfe" />
      <directionalLight position={[4, 2, 3]} intensity={0.2} color="#818cf8" />

      <group position={[0, -0.05, 0]}>
        <VehicleCluster models={models} />
      </group>

      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.28}
        scale={5.5}
        blur={2.2}
        far={2.8}
      />

      {!isMobile && (
        <Sparkles count={30} scale={[5, 3, 3]} size={1} speed={0.2} opacity={0.25} color="#818cf8" />
      )}

      <Suspense fallback={null}>
        <Environment preset="studio" background={false} environmentIntensity={0.65} />
      </Suspense>

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

function useAvailableHeroModels() {
  const [models, setModels] = useState<HeroVehicleConfig[]>(HERO_VEHICLES)

  useEffect(() => {
    let cancelled = false

    Promise.all(
      HERO_VEHICLES.map(async (config) => {
        const available = await isGlbAvailable(config.path)
        return available ? config : null
      }),
    ).then((results) => {
      if (!cancelled) {
        setModels(results.filter((m): m is HeroVehicleConfig => m !== null))
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return models
}

function PreloadHeroModels({ models }: { models: HeroVehicleConfig[] }) {
  useEffect(() => {
    models.forEach((config) => {
      useGLTF.preload(config.path)
    })
  }, [models])

  return null
}

function HeroCanvas({ className }: { className?: string }) {
  const [isInteracting, setIsInteracting] = useState(false)
  const availableModels = useAvailableHeroModels()

  return (
    <div
      className={cn(
        'relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl group',
        isInteracting ? 'cursor-grabbing' : 'cursor-grab',
        className,
      )}
      data-lenis-prevent
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.12, 5.8], fov: 36, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        frameloop="always"
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
          <PreloadHeroModels models={availableModels} />
          <Scene models={availableModels} onInteractingChange={setIsInteracting} />
        </HeroInteractContext.Provider>
      </Canvas>
    </div>
  )
}

function Hero3DFallback({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-[400px] w-full items-center justify-center md:h-[500px] lg:h-[600px]', className)}>
      <img
        src="/assets/products/trek-fuel-exe.jpg"
        alt="RideHub vehicle"
        className="h-auto w-44 rounded-2xl shadow-2xl md:w-56"
      />
    </div>
  )
}

interface Hero3DProps {
  className?: string
}

export function Hero3D({ className }: Hero3DProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  if (isMobile) {
    return <Hero3DFallback className={className} />
  }

  return <HeroCanvas className={className} />
}
