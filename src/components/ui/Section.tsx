import { forwardRef, type HTMLAttributes, Children, isValidElement, cloneElement } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Heading } from './Heading'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section ID for navigation anchoring */
  id?: string
  /** Optional section title */
  title?: string
  /** Optional section subtitle */
  subtitle?: string
  /** Content alignment */
  align?: 'left' | 'center'
  /** Enable scroll-triggered reveal animation */
  reveal?: boolean
  /** Additional classes */
  className?: string
  children: React.ReactNode
}

// Container animation variants (for staggering children)
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // 80ms between children
      delayChildren: 0.1,
    },
  },
}

// Child item animation variants
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // ease-out-expo
    },
  },
}

// Header animation (title + subtitle group)
const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      align = 'left',
      reveal = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const { ref: inViewRef, isInView } = useInView<HTMLElement>({
      threshold: 0.2,
      triggerOnce: true,
    })

    // Combine refs
    const setRefs = (element: HTMLElement | null) => {
      if (inViewRef && 'current' in inViewRef) {
        (inViewRef as React.MutableRefObject<HTMLElement | null>).current = element
      }
      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    const shouldAnimate = reveal && !prefersReducedMotion

    const alignClasses = {
      left: 'text-left',
      center: 'text-center mx-auto',
    }

    const contentClasses = cn(
      // Max width for readability
      'max-w-4xl',
      // Responsive horizontal padding
      'px-4 sm:px-6 lg:px-8',
      // Alignment
      alignClasses[align]
    )

    // Wrap children with motion for stagger effect
    const renderChildren = () => {
      if (!shouldAnimate) {
        return children
      }

      // Wrap each direct child in motion.div for staggered reveal
      return Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          // Wrap text nodes in motion.div
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          )
        }

        // Check if child already is a motion component
        const isMotionComponent =
          typeof child.type === 'object' &&
          child.type !== null &&
          'displayName' in child.type &&
          (child.type as any).displayName?.startsWith('motion.')

        if (isMotionComponent) {
          // Clone with variants injected
          return cloneElement(child, {
            variants: itemVariants,
            key: child.key ?? index,
          } as any)
        }

        // Wrap regular elements in motion.div
        return (
          <motion.div key={child.key ?? index} variants={itemVariants}>
            {child}
          </motion.div>
        )
      })
    }

    // Static rendering (no animation)
    if (!shouldAnimate) {
      return (
        <section
          ref={setRefs}
          id={id}
          className={cn(
            // Section spacing
            'py-[var(--space-7)] sm:py-[var(--space-8)] lg:py-[var(--space-9)]',
            // Prevent overflow
            'overflow-hidden',
            className
          )}
          {...props}
        >
          <div className={contentClasses}>
            {(title || subtitle) && (
              <header className="mb-8 sm:mb-12">
                {title && (
                  <Heading level={2} className="mb-3">
                    {title}
                  </Heading>
                )}
                {subtitle && (
                  <p className="text-text-secondary text-lg max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </header>
            )}
            <div className="space-y-6">{children}</div>
          </div>
        </section>
      )
    }

    // Animated rendering with scroll reveal
    return (
      <motion.section
        ref={setRefs}
        id={id}
        className={cn(
          // Section spacing
          'py-[var(--space-7)] sm:py-[var(--space-8)] lg:py-[var(--space-9)]',
          // Prevent overflow
          'overflow-hidden',
          className
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        {...(props as any)}
      >
        <div className={contentClasses}>
          {(title || subtitle) && (
            <motion.header variants={headerVariants} className="mb-8 sm:mb-12">
              {title && (
                <Heading level={2} className="mb-3">
                  {title}
                </Heading>
              )}
              {subtitle && (
                <p className="text-text-secondary text-lg max-w-2xl">
                  {subtitle}
                </p>
              )}
            </motion.header>
          )}
          <div className="space-y-6">{renderChildren()}</div>
        </div>
      </motion.section>
    )
  }
)

Section.displayName = 'Section'

// Re-export item variants for custom use
export { itemVariants as sectionItemVariants }
