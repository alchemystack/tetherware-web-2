import { useState, useEffect, useRef, useCallback } from 'react'

interface MousePosition {
  x: number // Normalized -1 to 1
  y: number // Normalized -1 to 1
  clientX: number // Raw pixel position
  clientY: number // Raw pixel position
  isActive: boolean // Whether mouse is over the window
}

/**
 * Hook to track normalized mouse position with smooth interpolation
 * Returns coordinates normalized to -1 to 1 range for shader use
 * @param smoothing - Interpolation factor (0-1), lower = smoother but laggier
 */
export function useMousePosition(smoothing: number = 0.1): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    isActive: false,
  })

  const targetRef = useRef({ x: 0, y: 0, clientX: 0, clientY: 0 })
  const currentRef = useRef({ x: 0, y: 0, clientX: 0, clientY: 0 })
  const rafRef = useRef<number | null>(null)
  const isActiveRef = useRef(false)

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }, [])

  const updatePosition = useCallback(() => {
    const target = targetRef.current
    const current = currentRef.current

    // Smooth interpolation
    current.x = lerp(current.x, target.x, smoothing)
    current.y = lerp(current.y, target.y, smoothing)
    current.clientX = lerp(current.clientX, target.clientX, smoothing)
    current.clientY = lerp(current.clientY, target.clientY, smoothing)

    setPosition({
      x: current.x,
      y: current.y,
      clientX: current.clientX,
      clientY: current.clientY,
      isActive: isActiveRef.current,
    })

    rafRef.current = requestAnimationFrame(updatePosition)
  }, [lerp, smoothing])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window

      // Normalize to -1 to 1 range
      targetRef.current = {
        x: (clientX / innerWidth) * 2 - 1,
        y: -(clientY / innerHeight) * 2 + 1, // Invert Y for WebGL coordinates
        clientX,
        clientY,
      }
    }

    const handleMouseEnter = () => {
      isActiveRef.current = true
    }

    const handleMouseLeave = () => {
      isActiveRef.current = false
    }

    // Handle touch events for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        const { clientX, clientY } = touch
        const { innerWidth, innerHeight } = window

        targetRef.current = {
          x: (clientX / innerWidth) * 2 - 1,
          y: -(clientY / innerHeight) * 2 + 1,
          clientX,
          clientY,
        }
        isActiveRef.current = true
      }
    }

    const handleTouchEnd = () => {
      isActiveRef.current = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    // Start animation loop
    rafRef.current = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [updatePosition])

  return position
}
