import { useState, useEffect, useRef, type RefObject } from 'react'

interface UseInViewOptions {
  /** Threshold for triggering visibility (0.0 to 1.0) */
  threshold?: number
  /** Root margin for intersection observer */
  rootMargin?: string
  /** Only trigger once (for reveal animations) */
  triggerOnce?: boolean
}

interface UseInViewReturn<T extends HTMLElement> {
  /** Ref to attach to the target element */
  ref: RefObject<T>
  /** Whether the element is in view */
  isInView: boolean
}

/**
 * Hook to detect when an element enters the viewport
 * Uses Intersection Observer for efficient visibility detection
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): UseInViewReturn<T> {
  const { threshold = 0.2, rootMargin = '0px', triggerOnce = false } = options

  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)
  // Track if we've already triggered once
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If triggerOnce and already triggered, do nothing
    if (triggerOnce && hasTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting

        if (inView) {
          setIsInView(true)
          if (triggerOnce) {
            hasTriggered.current = true
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isInView }
}
