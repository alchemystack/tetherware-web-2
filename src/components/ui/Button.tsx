import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'onClick'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
}

const variants = {
  primary: [
    'bg-forest-bright text-text-primary',
    'hover:shadow-glow-forest',
    'focus-visible:ring-2 focus-visible:ring-forest-bright focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep',
    'disabled:bg-forest/50 disabled:text-text-tertiary disabled:cursor-not-allowed disabled:shadow-none',
  ].join(' '),
  secondary: [
    'bg-transparent border border-cyan text-cyan',
    'hover:bg-cyan/10 hover:shadow-glow-cyan',
    'focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep',
    'disabled:border-cyan/30 disabled:text-cyan/30 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-transparent',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary',
    'hover:text-text-primary hover:bg-void-elevated',
    'focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep',
    'disabled:text-text-tertiary disabled:cursor-not-allowed disabled:hover:bg-transparent',
  ].join(' '),
}

const sizes = {
  sm: 'h-9 px-4 text-sm min-w-[44px]',
  md: 'h-11 px-6 text-base min-w-[44px]',
  lg: 'h-13 px-8 text-lg min-w-[44px]',
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      onClick,
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const isDisabled = disabled || loading

    const motionProps = prefersReducedMotion
      ? {}
      : {
          whileHover: isDisabled ? {} : { scale: 1.02 },
          whileTap: isDisabled ? {} : { scale: 0.98 },
          transition: { type: 'spring', stiffness: 400, damping: 25 },
        }

    return (
      <motion.button
        ref={ref}
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'rounded-lg font-medium',
          'transition-colors duration-200 ease-out',
          'select-none outline-none',
          // Touch target
          'min-h-[44px]',
          // Variant & size
          variants[variant],
          sizes[size],
          // Loading state
          loading && 'pointer-events-none',
          className
        )}
        {...motionProps}
        {...props}
      >
        {loading ? (
          <Spinner className={iconSizes[size]} />
        ) : (
          icon && iconPosition === 'left' && (
            <span className={cn(iconSizes[size], 'flex-shrink-0')}>{icon}</span>
          )
        )}
        <span className="break-words min-w-0">{children}</span>
        {!loading && icon && iconPosition === 'right' && (
          <span className={cn(iconSizes[size], 'flex-shrink-0')}>{icon}</span>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
