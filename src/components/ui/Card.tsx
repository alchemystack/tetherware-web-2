import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'onClick'> {
  variant?: 'solid' | 'glass' | 'outline'
  hoverable?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const variants = {
  solid: [
    'bg-void-elevated',
    'border border-void-surface',
  ].join(' '),
  glass: [
    'bg-void-elevated/60',
    'backdrop-blur-md',
    'border border-white/5',
    // Subtle noise texture via pseudo-element
    'relative overflow-hidden',
  ].join(' '),
  outline: [
    'bg-transparent',
    'border border-void-elevated',
  ].join(' '),
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'solid',
      hoverable = false,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const isInteractive = !!onClick

    const baseStyles = cn(
      'rounded-2xl p-6',
      'transition-all duration-300 ease-out-expo',
      variants[variant],
      // Hoverable styles
      (hoverable || isInteractive) && !prefersReducedMotion && [
        'cursor-pointer',
        'hover:-translate-y-1',
        'hover:shadow-lg hover:shadow-void-deep/50',
        'hover:border-cyan/20',
      ],
      // Interactive focus states
      isInteractive && [
        'focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-cyan',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep',
      ],
      // Reduced motion: only opacity changes
      (hoverable || isInteractive) && prefersReducedMotion && [
        'cursor-pointer',
        'hover:opacity-90',
      ],
      className
    )

    // Spring animation config for interactive cards
    const motionProps = !prefersReducedMotion && (hoverable || isInteractive)
      ? {
          whileHover: { y: -4 },
          whileTap: onClick ? { scale: 0.98 } : {},
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }
      : {}

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        tabIndex={isInteractive ? 0 : undefined}
        role={isInteractive ? 'button' : undefined}
        onKeyDown={isInteractive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick?.()
          }
        } : undefined}
        className={baseStyles}
        {...motionProps}
        {...props}
      >
        {/* Glass variant noise overlay */}
        {variant === 'glass' && (
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }
)

Card.displayName = 'Card'
