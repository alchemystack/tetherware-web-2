import { useState, useEffect } from 'react'

interface ScrollPosition {
  scrollY: number
  scrollX: number
  isScrolled: boolean
}

/**
 * Hook to track scroll position with threshold detection
 * @param threshold - Scroll Y position to trigger isScrolled (default: 60px)
 */
export function useScrollPosition(threshold: number = 60): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const x = window.scrollX
      setScrollPosition({
        scrollY: y,
        scrollX: x,
        isScrolled: y > threshold,
      })
    }

    // Get initial position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrollPosition
}
