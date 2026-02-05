import { Suspense, lazy, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// Lazy load ParticleMesh for better initial load
const ParticleMesh = lazy(() => import('./ParticleMesh'))

/**
 * ParticleField - Full viewport WebGL canvas with quantum particle system
 * Fixed position behind all content, passes through pointer events
 */
export default function ParticleField() {
  const reducedMotion = useReducedMotion()
  const [webglSupported, setWebglSupported] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Check for client-side and WebGL support
  useEffect(() => {
    setIsClient(true)

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(!!gl)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  // Don't render during SSR
  if (!isClient) {
    return null
  }

  // Fallback for non-WebGL browsers
  if (!webglSupported) {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 'var(--z-base)' }}
        aria-hidden="true"
      >
        {/* Static gradient fallback */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 40%, rgba(64, 224, 208, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(45, 106, 79, 0.05) 0%, transparent 50%),
              linear-gradient(180deg, var(--void-deep) 0%, var(--void-surface) 100%)
            `,
          }}
        />
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 'var(--z-base)' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 500],
          fov: 75,
          near: 1,
          far: 2000,
        }}
        dpr={[1, 2]} // Limit DPR for performance
        gl={{
          antialias: false, // Better performance for particles
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          {/* Ambient atmosphere - very subtle void lighting */}
          <ambientLight intensity={0.1} />

          {/* Particle system */}
          <ParticleMesh
            baseCount={reducedMotion ? 5000 : 15000}
            mobileOptimized={true}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
