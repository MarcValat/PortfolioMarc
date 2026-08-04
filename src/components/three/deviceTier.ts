// Coarse, one-shot heuristic for "this device probably has a weak GPU" — computed once at
// module load (this app is a client-only Vite SPA, so navigator/window are always available)
// and used to size the 3D background's particle/line budget before it's built.
const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 8 : 8
const isNarrowViewport = typeof window !== 'undefined' && window.innerWidth < 768

export const isLowPowerDevice = cores <= 4 || isNarrowViewport

export function scaleForDevice(highEnd: number, lowEnd: number): number {
  return isLowPowerDevice ? lowEnd : highEnd
}
