import { forwardRef, type HTMLAttributes, useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level: 1 (hero), 2 (display), 3 (title), 4 (subtitle) */
  level: 1 | 2 | 3 | 4
  /** Enable word-stagger reveal animation */
  animate?: boolean
  /** Additional classes */
  className?: string
  children: React.ReactNode
}

const levelStyles = {
  1: {
    tag: 'h1' as const,
    className: cn(
      'font-display',
      'text-hero',
      'font-normal',
      // Optical correction for large headings
      'translate-x-[-1%]'
    ),
  },
  2: {
    tag: 'h2' as const,
    className: cn(
      'font-display',
      'text-display',
      'font-normal',
      // Optical correction
      'translate-x-[-1%]'
    ),
  },
  3: {
    tag: 'h3' as const,
    className: cn(
      'font-body',
      'text-title',
      'font-medium'
    ),
  },
  4: {
    tag: 'h4' as const,
    className: cn(
      'font-body',
      'text-[clamp(1.125rem,2vw,1.5rem)]',
      'leading-[1.3]',
      'font-medium',
      'text-text-secondary'
    ),
  },
}

// Animation variants for word reveal
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06, // 60ms between words
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // ease-out-expo
    },
  },
}

// Split text into words while preserving structure
function splitIntoWords(children: React.ReactNode): string[] {
  if (typeof children === 'string') {
    return children.split(/\s+/).filter(Boolean)
  }
  if (Array.isArray(children)) {
    return children.flatMap((child) => splitIntoWords(child))
  }
  return []
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, animate = false, className, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const { ref: inViewRef, isInView } = useInView<HTMLHeadingElement>({
      threshold: 0.2,
      triggerOnce: true,
    })

    const { tag: Tag, className: levelClass } = levelStyles[level]

    // Split children into words for animation
    const words = useMemo(() => splitIntoWords(children), [children])

    // Combine refs
    const setRefs = (element: HTMLHeadingElement | null) => {
      // Handle inViewRef
      if (inViewRef && 'current' in inViewRef) {
        (inViewRef as React.MutableRefObject<HTMLHeadingElement | null>).current = element
      }
      // Handle forwarded ref
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    const baseClasses = cn(
      // Text safety
      'break-words min-w-0',
      // No orphans
      '[text-wrap:balance]',
      // Level styles
      levelClass,
      // Text color
      'text-text-primary',
      className
    )

    // No animation: render normally
    if (!animate || prefersReducedMotion) {
      return (
        <Tag ref={setRefs} className={baseClasses} {...props}>
          {children}
        </Tag>
      )
    }

    // With animation: word-by-word stagger reveal
    return (
      <motion.div
        ref={setRefs}
        className={baseClasses}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        role="heading"
        aria-level={level}
        {...(props as any)}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }
)

Heading.displayName = 'Heading'
