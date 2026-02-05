import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { sunlightVertexShader, sunlightFragmentShader } from './shaders'

/**
 * SunlightRays - Atmospheric golden rays effect
 * Renders behind particle lines for warm visual depth
 */
export default function SunlightRays() {
  const { size, viewport } = useThree()
  const reducedMotion = useReducedMotion()
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame((_state, delta) => {
    if (materialRef.current) {
      // Update time (freeze if reduced motion)
      if (!reducedMotion) {
        materialRef.current.uniforms.uTime.value += delta
      }

      // Update resolution
      materialRef.current.uniforms.uResolution.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr
      )
      materialRef.current.uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
    }
  })

  return (
    <mesh renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={sunlightVertexShader}
        fragmentShader={sunlightFragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
