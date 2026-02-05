import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface BadgeProps extends Omit<HTMLMotionProps<'span'>, 'onClick'> {
  variant?: 'default' | 'cyan' | 'forest' | 'outline'
  interactive?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const variants = {
  default: [
    'bg-void-elevated',
    'text-text-secondary',
    'border border-void-surface',
  ].join(' '),
  cyan: [
    'bg-cyan/10',
    'text-cyan',
    'border border-cyan/30',
  ].join(' '),
  forest: [
    'bg-forest/30',
    'text-forest-bright',
    'border border-forest-bright/30',
  ].join(' '),
  outline: [
    'bg-transparent',
    'text-text-secondary',
    'border border-text-tertiary',
  ].join(' '),
}

const interactiveStyles = {
  default: 'hover:bg-void-surface hover:text-text-primary',
  cyan: 'hover:bg-cyan/20 hover:border-cyan/50',
  forest: 'hover:bg-forest/50 hover:border-forest-bright/50',
  outline: 'hover:border-text-secondary hover:text-text-primary',
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      interactive = false,
      onClick,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const isInteractive = interactive || !!onClick

    const motionProps = !prefersReducedMotion && isInteractive
      ? {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: 'spring', stiffness: 400, damping: 25 },
        }
      : {}

    return (
      <motion.span
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
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'px-3 py-1',
          'rounded-full',
          'text-xs font-medium tracking-wide uppercase',
          'transition-colors duration-200 ease-out',
          'select-none',
          // Variant
          variants[variant],
          // Interactive styles
          isInteractive && [
            'cursor-pointer',
            interactiveStyles[variant],
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-cyan',
            'focus-visible:ring-offset-1 focus-visible:ring-offset-void-deep',
          ],
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

Badge.displayName = 'Badge'
