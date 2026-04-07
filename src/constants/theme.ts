// Miroir JS des design tokens — utilisé dans R3F (Three.js colors)
export const COLORS = {
  bgPrimary:   '#080808',
  bgSecondary: '#111111',
  gold:        '#C9A84C',
  goldLight:   '#F0D080',
  coral:       '#FF6B6B',
  textPrimary: '#F5F0E8',
  glassWhite:  'rgba(255,255,255,0.04)',
} as const

// Parsed as Three.js color values (0x hex)
export const THREE_COLORS = {
  gold:    0xC9A84C,
  goldLight: 0xF0D080,
  coral:   0xFF6B6B,
  bg:      0x080808,
} as const
