export const heroModels = {
  bicycle: {
    path: '/assets/models/bicycle.glb',
    scale: 0.012,
    rotation: [0, Math.PI / 4, 0] as [number, number, number],
    position: [0.2, -0.35, 0] as [number, number, number],
  },
  scooter: {
    path: '/assets/models/scooter.glb',
    scale: 0.9,
    rotation: [0, -Math.PI / 6, 0] as [number, number, number],
    position: [-0.6, -0.55, 0.4] as [number, number, number],
  },
  motorcycle: {
    path: '/assets/models/motorcycle.glb',
    scale: 0.08,
    rotation: [0, Math.PI / 3, 0] as [number, number, number],
    position: [1.1, -0.45, -0.2] as [number, number, number],
  },
} as const

export const modelAttribution =
  '3D vehicle models adapted from Poly by Google (CC Attribution) via GetGLB / Get3DModels.'
