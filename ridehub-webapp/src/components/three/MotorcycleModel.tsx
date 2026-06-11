import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import { heroModels } from '@/config/heroModels'
import { buildMotorcycleFromScene } from '@/components/three/motorcycleGeometry'
import { useEngineHum } from '@/components/three/useEngineHum'

interface MotorcycleModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  targetSize?: number
  isInteracting?: boolean
}

export function MotorcycleModel({
  position = [0, -0.05, 0],
  rotation = [0, Math.PI / 5, 0],
  targetSize = 1.55,
  isInteracting = false,
}: MotorcycleModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [, setEngineHovered] = useState(false)
  const { playHum } = useEngineHum()
  const { scene } = useGLTF(heroModels.motorcycle.path)

  const parts = useMemo(
    () => buildMotorcycleFromScene(scene, targetSize),
    [scene, targetSize],
  )

  useFrame((state) => {
    if (!groupRef.current || isInteracting) return

    groupRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.12) * 0.08
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
      <group ref={groupRef} position={position} rotation={rotation}>
        <primitive object={parts.root} />

        <pointLight
          position={[parts.headlightWorld.x, parts.headlightWorld.y, parts.headlightWorld.z]}
          color="#FFC107"
          intensity={1.2}
          distance={1.8}
          decay={2}
        />

        <mesh
          position={parts.engineCenter}
          onPointerOver={(event) => {
            event.stopPropagation()
            setEngineHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(event) => {
            event.stopPropagation()
            setEngineHovered(false)
            document.body.style.cursor = ''
          }}
          onClick={(event) => {
            event.stopPropagation()
            playHum()
          }}
        >
          <boxGeometry args={[parts.engineSize.x, parts.engineSize.y, parts.engineSize.z]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </group>
    </Float>
  )
}

useGLTF.preload(heroModels.motorcycle.path)
