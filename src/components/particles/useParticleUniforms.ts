import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '../../hooks/useMousePosition'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface ParticleUniforms {
  [uniform: string]: THREE.IUniform<number | THREE.Vector2>
  uTime: THREE.IUniform<number>
  uMouse: THREE.IUniform<THREE.Vector2>
  uMouseActive: THREE.IUniform<number>
  uScroll: THREE.IUniform<number>
  uScrollVelocity: THREE.IUniform<number>
  uResolution: THREE.IUniform<THREE.Vector2>
  uPixelRatio: THREE.IUniform<number>
  uReducedMotion: THREE.IUniform<number>
}

/**
 * Hook that provides shader uniforms for the particle system
 * Combines mouse position, scroll position, time, and viewport data
 */
export function useParticleUniforms(): ParticleUniforms {
  const { size, viewport } = useThree()
  const mouse = useMousePosition(0.08)
  const { scrollY } = useScrollPosition()
  const reducedMotion = useReducedMotion()

  const prevScrollRef = useRef(0)
  const scrollVelocityRef = useRef(0)

  const uniforms = useMemo<ParticleUniforms>(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseActive: { value: 0 },
      uScroll: { value: 0 },
      uScrollVelocity: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uReducedMotion: { value: reducedMotion ? 1 : 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame((_state, delta) => {
    // Update time (freeze if reduced motion)
    if (!reducedMotion) {
      uniforms.uTime.value += delta
    }

    // Update mouse position
    uniforms.uMouse.value.set(mouse.x, mouse.y)

    // Smooth mouse active transition
    const targetActive = mouse.isActive ? 1 : 0
    uniforms.uMouseActive.value += (targetActive - uniforms.uMouseActive.value) * 0.1

    // Calculate scroll velocity for wave amplitude modulation
    const scrollDelta = scrollY - prevScrollRef.current
    scrollVelocityRef.current += (Math.abs(scrollDelta) - scrollVelocityRef.current) * 0.1
    prevScrollRef.current = scrollY

    // Normalize scroll for shader (0 to ~1 based on page height)
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    uniforms.uScroll.value = maxScroll > 0 ? scrollY / maxScroll : 0
    uniforms.uScrollVelocity.value = scrollVelocityRef.current

    // Update resolution if viewport changes
    uniforms.uResolution.value.set(size.width * viewport.dpr, size.height * viewport.dpr)
    uniforms.uPixelRatio.value = Math.min(viewport.dpr, 2)
    uniforms.uReducedMotion.value = reducedMotion ? 1 : 0
  })

  return uniforms
}
