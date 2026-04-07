// Font configuration for @chenglou/pretext
// These values MUST match the CSS exactly for accurate canvas measurement.

export const PRETEXT_FONTS = {
  bodyLarge: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: 0,
  },
  bodyBase: {
    fontFamily: 'Inter',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 0,
  },
  headingXl: {
    fontFamily: 'Space Grotesk',
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -1.5,
  },
  headingLg: {
    fontFamily: 'Space Grotesk',
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
  },
} as const

export type PretextFontKey = keyof typeof PRETEXT_FONTS
