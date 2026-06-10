export const heroModels = {
  coffeeCup: {
    path: "/assets/models/coffee-cup.glb",
    targetSize: 1.05,
    rotation: [0, Math.PI / 4, 0] as [number, number, number],
    position: [0, -0.05, 0] as [number, number, number],
  },
} as const;

export const modelAttribution =
  "Coffee cup 3D model adapted from Poly by Google (CC Attribution) via Get3DModels.";
