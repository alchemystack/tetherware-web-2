import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface LinkProps extends Omit<RouterLinkProps, 'className'> {
  variant?: 'default' | 'accent' | 'subtle'
  external?: boolean
  className?: string
  children: React.ReactNode
}

const variants = {
  default: 'text-text-secondary hover:text-text-primary',
  accent: 'text-cyan hover:text-cyan-muted',
  subtle: 'text-text-tertiary hover:text-text-secondary',
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      external = false,
      to,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      // Base styles
      'relative inline-flex items-center gap-1',
      'transition-colors duration-200 ease-out',
      'outline-none',
      // Focus state
      'focus-visible:ring-2 focus-visible:ring-cyan',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-void-deep',
      'focus-visible:rounded',
      // Variant
      variants[variant],
      // Underline animation group
      'group',
      className
    )

    const underlineStyles = cn(
      'absolute -bottom-0.5 left-0',
      'h-px w-full',
      'origin-left scale-x-0',
      'transition-transform duration-300 ease-out-expo',
      'group-hover:scale-x-100',
      'group-focus-visible:scale-x-100',
      variant === 'accent' ? 'bg-cyan' : 'bg-current'
    )

    // External links
    if (external || (typeof to === 'string' && to.startsWith('http'))) {
      return (
        <a
          ref={ref}
          href={typeof to === 'string' ? to : ''}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span className="relative">
            {children}
            <span className={underlineStyles} aria-hidden="true" />
          </span>
          {/* External link indicator */}
          <svg
            className="w-3 h-3 flex-shrink-0 opacity-60"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3.5 1.5H10.5V8.5M10 2L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )
    }

    // Internal links with React Router
    return (
      <RouterLink
        ref={ref}
        to={to}
        className={baseStyles}
        {...props}
      >
        <span className="relative">
          {children}
          <span className={underlineStyles} aria-hidden="true" />
        </span>
      </RouterLink>
    )
  }
)

Link.displayName = 'Link'
