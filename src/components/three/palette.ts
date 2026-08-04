// Shared accent palette for the 3D background layers (NetworkField + AmbientDust).
// Normalized 0-1 RGB, matching the brand's gold with azure/violet/coral added for variety.

export const GOLD: [number, number, number] = [0.788, 0.659, 0.298]
export const GOLD_LIGHT: [number, number, number] = [0.941, 0.816, 0.502]
export const CORAL: [number, number, number] = [1.0, 0.42, 0.42]
export const AZURE: [number, number, number] = [0.4, 0.58, 0.98]
export const VIOLET: [number, number, number] = [0.62, 0.42, 0.95]

// Weighted roll shared by nodes, edges (inherited per-vertex) and packets —
// gold stays the anchor, azure/violet/coral break the monochrome wash.
export function rollColor(): [number, number, number] {
  const roll = Math.random()
  if (roll < 0.12) return CORAL
  if (roll < 0.32) return AZURE
  if (roll < 0.52) return VIOLET
  if (roll < 0.72) return GOLD_LIGHT
  return GOLD
}
