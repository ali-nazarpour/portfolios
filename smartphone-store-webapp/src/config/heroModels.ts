export interface HeroPhoneConfig {
  id: string
  brand: 'apple' | 'samsung' | 'xiaomi'
  path: string
  position: [number, number, number]
  rotation: [number, number, number]
  floatSpeed: number
  /** Uniform max-dimension size after normalization (world units). */
  targetSize?: number
  /** Fine-tune multiplier applied on top of targetSize. */
  scale?: number
  /** Correct GLB import orientation before normalization (radians). */
  modelRotation?: [number, number, number]
  /** Drop detached accessory meshes (e.g. S Pen) before centering. */
  trimAccessories?: boolean
  /** Optional env-map polish for textureless GLBs (Apple fallback mesh). */
  materialPreset?: 'apple-titanium' | 'default'
  /** Image applied to the display mesh (portrait-friendly wallpaper). */
  screenWallpaper?: string
}

/** Hero iPhone size — slightly larger for a single-phone showcase. */
export const HERO_PHONE_TARGET_SIZE = 2.75

export const HERO_IPHONE_SCREEN_WALLPAPER = '/assets/gallery/apple-hero-2.jpg'

export const heroPhoneModels: HeroPhoneConfig[] = [
  {
    id: 'apple-iphone-17-pro-max',
    brand: 'apple',
    path: '/assets/models/apple/iphone-17-pro-max.glb',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    floatSpeed: 1.5,
    targetSize: HERO_PHONE_TARGET_SIZE,
    materialPreset: 'default',
    screenWallpaper: HERO_IPHONE_SCREEN_WALLPAPER,
  },
]

export const heroModelPaths = heroPhoneModels.map((m) => m.path)
