import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";
import { AnimatedGradientBackground } from "@/components/ui/AnimatedGradientBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/button";
import { AssetImage } from "@/components/products/AssetImage";
import { heroModels } from "@/config/heroModels";

useGLTF.preload(heroModels.coffeeCup.path);

const CUP_BODY = {
  color: "#d4c4aa",
  metalness: 0.08,
  roughness: 0.42,
  envMapIntensity: 1.35,
};

const CUP_INTERIOR = {
  color: "#f0e6d6",
  metalness: 0.04,
  roughness: 0.52,
  envMapIntensity: 1.15,
};

const COFFEE = {
  color: "#2a1810",
  metalness: 0.15,
  roughness: 0.22,
  envMapIntensity: 1.4,
  transparent: true,
  opacity: 0.96,
};

const SAUCER = {
  color: "#c8b89a",
  metalness: 0.1,
  roughness: 0.46,
  envMapIntensity: 1.25,
};

const HANDLE = {
  color: "#b8954a",
  metalness: 0.55,
  roughness: 0.32,
  envMapIntensity: 1.5,
};

type MaterialPreset = THREE.MeshStandardMaterialParameters;

function getCupPreset(meshName: string): MaterialPreset {
  const name = meshName.toLowerCase();

  if (name.includes("liquid")) return COFFEE;
  if (name.includes("handle")) return HANDLE;
  if (name.includes("round") || name.includes("bottom")) return SAUCER;
  if (name.includes("design")) return CUP_INTERIOR;
  return CUP_BODY;
}

function applyCupMaterial(mesh: THREE.Mesh) {
  const params = getCupPreset(mesh.name);

  const toStandard = (mat: THREE.Material) => {
    if (mat instanceof THREE.MeshStandardMaterial) {
      mat.color.set(params.color as string);
      mat.metalness = params.metalness ?? 0.08;
      mat.roughness = params.roughness ?? 0.45;
      mat.envMapIntensity = params.envMapIntensity ?? 1.2;
      mat.transparent = params.transparent ?? false;
      mat.opacity = params.opacity ?? 1;
      mat.side = THREE.DoubleSide;
      mat.depthWrite = params.transparent ? false : true;
      mat.needsUpdate = true;
      return mat;
    }

    const next = new THREE.MeshStandardMaterial({
      color: params.color,
      metalness: params.metalness,
      roughness: params.roughness,
      envMapIntensity: params.envMapIntensity,
      transparent: params.transparent,
      opacity: params.opacity,
      side: THREE.DoubleSide,
      depthWrite: !params.transparent,
    });
    mat.dispose();
    return next;
  };

  if (Array.isArray(mesh.material)) {
    mesh.material = mesh.material.map(toStandard);
  } else if (mesh.material) {
    mesh.material = toStandard(mesh.material);
  } else {
    mesh.material = new THREE.MeshStandardMaterial({
      ...params,
      side: THREE.DoubleSide,
      depthWrite: !params.transparent,
    });
  }

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
}

function getMeshBounds(object: THREE.Object3D) {
  const box = new THREE.Box3();
  let hasMesh = false;

  object.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;

    mesh.geometry.computeBoundingBox();
    if (!mesh.geometry.boundingBox) return;

    const meshBox = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
    box.union(meshBox);
    hasMesh = true;
  });

  if (!hasMesh) box.setFromObject(object);
  return box;
}

function normalizeCupModel(scene: THREE.Group, targetSize: number) {
  const clone = scene.clone(true);
  clone.updateMatrixWorld(true);

  const box = getMeshBounds(clone);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxDim;

  // Must offset by -center * scale (not -center) because Three.js applies T then S as: pos + scale * v
  clone.scale.setScalar(scale);
  clone.position.copy(center).multiplyScalar(-scale);

  clone.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    applyCupMaterial(mesh);
  });

  return clone;
}

function CoffeeCupModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(heroModels.coffeeCup.path);
  const { targetSize, rotation, position } = heroModels.coffeeCup;

  const model = useMemo(() => normalizeCupModel(scene, targetSize), [scene, targetSize]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      rotation[1] + Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25} floatingRange={[-0.03, 0.03]}>
      <group ref={groupRef} position={position} rotation={rotation}>
        <primitive object={model} />
      </group>
    </Float>
  );
}

function CoffeeBean({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <Float speed={1.1} floatIntensity={0.35}>
      <mesh position={position} rotation={rotation} scale={scale} castShadow>
        <sphereGeometry args={[0.07, 12, 10]} />
        <meshStandardMaterial color="#4a3224" roughness={0.75} metalness={0.04} envMapIntensity={0.65} />
      </mesh>
    </Float>
  );
}

function FloatingBeans() {
  const beans: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }[] = [
    { position: [-0.75, 0.55, 0.1], rotation: [0.4, 0.8, 0.2], scale: [0.55, 0.85, 0.45] },
    { position: [0.78, 0.45, -0.05], rotation: [0.2, -0.5, 0.6], scale: [0.5, 0.8, 0.42] },
    { position: [-0.55, -0.05, 0.45], rotation: [-0.3, 1.1, 0.1], scale: [0.48, 0.78, 0.4] },
  ];

  return (
    <>
      {beans.map((bean, index) => (
        <CoffeeBean key={index} {...bean} />
      ))}
    </>
  );
}

function SceneLoader() {
  return (
    <Html center>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
    </Html>
  );
}

class CupModelErrorBoundary extends Component<
  { fallback?: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#fff8e7", "#3d2818", 0.55]} position={[0, 2, 4]} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.6}
        color="#fff4dc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, 3]} intensity={0.45} color="#c9a962" />
      <pointLight position={[0, 1.2, 2.5]} intensity={0.5} color="#dfc88a" />

      <CupModelErrorBoundary>
        <Suspense fallback={<SceneLoader />}>
          <CoffeeCupModel />
        </Suspense>
      </CupModelErrorBoundary>
      <FloatingBeans />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
        <circleGeometry args={[1.6, 48]} />
        <shadowMaterial transparent opacity={0.12} />
      </mesh>

      <ContactShadows position={[0, -0.62, 0]} opacity={0.45} scale={5} blur={2.8} far={2.4} />
      <Environment preset="apartment" background={false} environmentIntensity={1} />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.7}
        target={[0, 0.05, 0]}
        minDistance={3}
        maxDistance={6}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.8}
      />
    </>
  );
}

function HeroCanvas() {
  return (
    <div
      className="relative h-[400px] w-full overflow-hidden rounded-3xl lg:h-[500px]"
      data-lenis-prevent
    >
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0.3, 0.15, 3.6], fov: 34, near: 0.01, far: 50 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        shadows
        style={{ background: "transparent", touchAction: "none" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene3D />
      </Canvas>
    </div>
  );
}

export function Hero3D() {
  const { t } = useTranslation();
  const [webglOk] = useState(() => {
    try {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext("webgl") || canvas.getContext("webgl2"));
    } catch {
      return false;
    }
  });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" as const },
    }),
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <AnimatedGradientBackground />
      <div className="absolute inset-0 opacity-30">
        <AssetImage src="/assets/images/hero.jpg" alt="" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="container-luxury relative z-10 grid items-center gap-8 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="font-serif text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="text-gradient-gold">{t("hero.title")}</span>
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <Link to="/menu">{t("hero.exploreMenu")}</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="lg">
                <Link to="/gallery">{t("hero.viewGallery")}</Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          {webglOk ? (
            <HeroCanvas />
          ) : (
            <AssetImage
              src="/assets/menu/signature-velvet-espresso.jpg"
              alt="Velvet Bistro espresso"
              className="h-[400px] w-full rounded-3xl object-cover glow-gold lg:h-[500px]"
            />
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">{t("hero.scroll")}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
