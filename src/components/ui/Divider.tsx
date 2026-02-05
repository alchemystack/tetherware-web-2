import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'gradient' | 'accent'
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          // Base styles
          isHorizontal ? 'w-full h-px' : 'h-full w-px',
          // Variant styles
          variant === 'default' && 'bg-void-elevated',
          variant === 'gradient' && isHorizontal && [
            'bg-gradient-to-r',
            'from-transparent via-void-elevated to-transparent',
          ],
          variant === 'gradient' && !isHorizontal && [
            'bg-gradient-to-b',
            'from-transparent via-void-elevated to-transparent',
          ],
          variant === 'accent' && isHorizontal && [
            'bg-gradient-to-r',
            'from-transparent via-cyan/30 to-transparent',
          ],
          variant === 'accent' && !isHorizontal && [
            'bg-gradient-to-b',
            'from-transparent via-cyan/30 to-transparent',
          ],
          className
        )}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
