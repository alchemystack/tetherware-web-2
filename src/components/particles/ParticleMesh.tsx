import { useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particleVertexShader, particleFragmentShader } from './shaders'
import { useParticleUniforms } from './useParticleUniforms'

interface ParticleMeshProps {
  /** Base particle count - scaled based on viewport */
  baseCount?: number
  /** Whether to reduce count for mobile devices */
  mobileOptimized?: boolean
}

/**
 * ParticleMesh - GPU-instanced particle field
 * Creates a grid of particles that extends beyond the viewport
 * with quantum interference wave motion
 */
export default function ParticleMesh({
  baseCount = 15000,
  mobileOptimized = true,
}: ParticleMeshProps) {
  const { size, viewport, camera } = useThree()
  const pointsRef = useRef<THREE.Points>(null)
  const uniforms = useParticleUniforms()

  // Calculate particle count based on viewport and device
  const particleCount = useMemo(() => {
    const isMobile = size.width < 768
    const isLowDPI = viewport.dpr < 1.5

    if (mobileOptimized && isMobile) {
      return Math.floor(baseCount * 0.5) // 50% on mobile
    }

    if (isLowDPI) {
      return Math.floor(baseCount * 0.7) // 70% on low DPI
    }

    return baseCount
  }, [baseCount, mobileOptimized, size.width, viewport.dpr])

  // Generate particle positions, scales, and randomness attributes
  const { positions, scales, randomness } = useMemo(() => {
    // Calculate visible area at z=0 with perspective camera
    // This is the actual world-space area the camera can see
    let visibleWidth = viewport.width
    let visibleHeight = viewport.height
    if ('fov' in camera) {
      const fov = (camera as THREE.PerspectiveCamera).fov
      const cameraZ = camera.position.z
      visibleHeight = 2 * Math.tan((fov * Math.PI / 180) / 2) * cameraZ
      visibleWidth = visibleHeight * (size.width / size.height)
    }

    // Calculate grid dimensions to cover 150% of visible area (extends beyond edges)
    const aspectRatio = size.width / size.height
    const coverageMultiplier = 1.5

    // FIX: Use visible world units, not pixel dimensions!
    const gridWidth = visibleWidth * coverageMultiplier
    const gridHeight = visibleHeight * coverageMultiplier

    // Calculate number of particles per dimension for roughly uniform density
    const particlesPerRow = Math.ceil(Math.sqrt(particleCount * aspectRatio))
    const particlesPerCol = Math.ceil(particleCount / particlesPerRow)

    const spacingX = gridWidth / particlesPerRow
    const spacingY = gridHeight / particlesPerCol

    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const randomness = new Float32Array(particleCount)

    let idx = 0
    for (let i = 0; i < particlesPerRow && idx < particleCount; i++) {
      for (let j = 0; j < particlesPerCol && idx < particleCount; j++) {
        // Position in grid with slight random offset for organic feel
        const x = (i - particlesPerRow / 2) * spacingX + (Math.random() - 0.5) * spacingX * 0.5
        const y = (j - particlesPerCol / 2) * spacingY + (Math.random() - 0.5) * spacingY * 0.5
        const z = 0 // Z will be animated in shader

        positions[idx * 3] = x
        positions[idx * 3 + 1] = y
        positions[idx * 3 + 2] = z

        // Random scale for visual variety (0.5 to 1.5)
        scales[idx] = 0.5 + Math.random()

        // Random value for shader effects (0 to 1)
        randomness[idx] = Math.random()

        idx++
      }
    }

    return { positions, scales, randomness }
  }, [particleCount, size.width, size.height, camera, viewport])

  // Create custom shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  }, [uniforms])

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={particleCount}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomness"
          count={particleCount}
          array={randomness}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  )
}
