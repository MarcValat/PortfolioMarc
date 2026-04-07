import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.08}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.95}
        blendFunction={BlendFunction.SCREEN}
      />
    </EffectComposer>
  )
}
