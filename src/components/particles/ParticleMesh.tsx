import { useMemo, useRef, useEffect } from 'react'
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
 * Creates a grid of oriented lines that extend beyond the viewport
 * with quantum interference wave motion
 */
export default function ParticleMesh({
  baseCount = 15000,
  mobileOptimized = true,
}: ParticleMeshProps) {
  const { size, viewport, camera } = useThree()
  const meshRef = useRef<THREE.InstancedMesh>(null)
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

  // Generate particle attributes: scales, randomness, and angles
  const { scales, randomness, angles } = useMemo(() => {
    const scales = new Float32Array(particleCount)
    const randomness = new Float32Array(particleCount)
    const angles = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Random scale for visual variety (0.5 to 1.5)
      scales[i] = 0.5 + Math.random()

      // Random value for shader effects (0 to 1)
      randomness[i] = Math.random()

      // Base angle: roughly upward (PI/2) with random variation (+/- 15 degrees)
      const baseAngle = Math.PI / 2
      const variation = (Math.random() - 0.5) * (Math.PI / 6) // +/- 15 degrees
      angles[i] = baseAngle + variation
    }

    return { scales, randomness, angles }
  }, [particleCount])

  // Generate instance matrices for positions
  const instanceMatrices = useMemo(() => {
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

    // Use visible world units, not pixel dimensions
    const gridWidth = visibleWidth * coverageMultiplier
    const gridHeight = visibleHeight * coverageMultiplier

    // Calculate number of particles per dimension for roughly uniform density
    const particlesPerRow = Math.ceil(Math.sqrt(particleCount * aspectRatio))
    const particlesPerCol = Math.ceil(particleCount / particlesPerRow)

    const spacingX = gridWidth / particlesPerRow
    const spacingY = gridHeight / particlesPerCol

    const matrices = new Float32Array(particleCount * 16)
    const tempMatrix = new THREE.Matrix4()
    const tempPosition = new THREE.Vector3()
    const tempQuaternion = new THREE.Quaternion()
    const tempScale = new THREE.Vector3(1, 1, 1)

    let idx = 0
    for (let i = 0; i < particlesPerRow && idx < particleCount; i++) {
      for (let j = 0; j < particlesPerCol && idx < particleCount; j++) {
        // Position in grid with slight random offset for organic feel
        const x = (i - particlesPerRow / 2) * spacingX + (Math.random() - 0.5) * spacingX * 0.5
        const y = (j - particlesPerCol / 2) * spacingY + (Math.random() - 0.5) * spacingY * 0.5
        const z = 0 // Z will be animated in shader

        tempPosition.set(x, y, z)
        tempMatrix.compose(tempPosition, tempQuaternion, tempScale)
        tempMatrix.toArray(matrices, idx * 16)

        idx++
      }
    }

    return matrices
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

  // Create geometry for a single line (thin plane)
  const lineGeometry = useMemo(() => {
    // Thin rectangle: width is small (0.5), height is the line length (8)
    const geometry = new THREE.PlaneGeometry(0.5, 8, 1, 1)
    return geometry
  }, [])

  // Update instance matrices when they change
  useEffect(() => {
    if (meshRef.current) {
      const tempMatrix = new THREE.Matrix4()
      for (let i = 0; i < particleCount; i++) {
        tempMatrix.fromArray(instanceMatrices, i * 16)
        meshRef.current.setMatrixAt(i, tempMatrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  }, [instanceMatrices, particleCount])

  return (
    <instancedMesh
      ref={meshRef}
      args={[lineGeometry, shaderMaterial, particleCount]}
    >
      <instancedBufferAttribute
        attach="geometry-attributes-aScale"
        args={[scales, 1]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aRandomness"
        args={[randomness, 1]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aAngle"
        args={[angles, 1]}
      />
    </instancedMesh>
  )
}
