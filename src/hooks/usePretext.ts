import { useMemo } from 'react'
import type { PreparedTextWithSegments, LayoutLinesResult } from '@chenglou/pretext'
import { PRETEXT_FONTS, type PretextFontKey } from '@/lib/fonts'

let pretextModule: typeof import('@chenglou/pretext') | null = null

async function loadPretext() {
  if (!pretextModule) {
    pretextModule = await import('@chenglou/pretext')
  }
  return pretextModule
}

export type { PreparedTextWithSegments, LayoutLinesResult }
export { loadPretext, PRETEXT_FONTS }
export type { PretextFontKey }

export function usePretext(
  prepared: PreparedTextWithSegments | null,
  containerWidth: number,
  fontKey: PretextFontKey = 'bodyLarge'
): LayoutLinesResult | null {
  const fontConfig = PRETEXT_FONTS[fontKey]
  return useMemo(() => {
    if (!prepared || containerWidth <= 0 || !pretextModule) return null
    try {
      return pretextModule.layoutWithLines(prepared, containerWidth, fontConfig.lineHeight)
    } catch {
      return null
    }
  }, [prepared, containerWidth, fontConfig.lineHeight])
}
