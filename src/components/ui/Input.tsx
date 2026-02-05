import { forwardRef, useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-13 px-5 text-lg',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      disabled = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId
    const errorId = `${id}-error`
    const hintId = `${id}-hint`
    const [isFocused, setIsFocused] = useState(false)
    const prefersReducedMotion = useReducedMotion()

    const hasError = !!error
    const showMessage = error || hint

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block mb-2 text-sm font-medium',
              'transition-colors duration-200',
              disabled ? 'text-text-tertiary' : 'text-text-secondary',
              isFocused && !disabled && 'text-text-primary'
            )}
          >
            {label}
          </label>
        )}

        {/* Input container */}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              showMessage
                ? hasError
                  ? errorId
                  : hintId
                : undefined
            }
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            className={cn(
              // Base styles
              'w-full rounded-lg',
              'bg-void-surface',
              'border',
              'text-text-primary',
              'placeholder:text-text-tertiary',
              'transition-all duration-200 ease-out',
              'outline-none',
              // Touch target
              'min-h-[44px]',
              // Size
              sizes[size],
              // States
              !hasError && !disabled && [
                'border-void-elevated',
                'hover:border-void-elevated/80',
                'focus:border-cyan',
                'focus:shadow-glow-cyan',
              ],
              // Error state
              hasError && !disabled && [
                'border-red-500/60',
                'focus:border-red-500',
                'focus:shadow-[0_0_24px_rgba(239,68,68,0.2)]',
              ],
              // Disabled state
              disabled && [
                'border-void-elevated/50',
                'bg-void-deep',
                'text-text-tertiary',
                'cursor-not-allowed',
                'opacity-60',
              ],
              className
            )}
            {...props}
          />

          {/* Glow effect on focus */}
          {!prefersReducedMotion && (
            <motion.div
              className={cn(
                'absolute inset-0 rounded-lg pointer-events-none',
                hasError ? 'bg-red-500/5' : 'bg-cyan/5'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: isFocused && !disabled ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {/* Error / Hint message */}
        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.p
              key={hasError ? 'error' : 'hint'}
              id={hasError ? errorId : hintId}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'mt-2 text-sm',
                hasError ? 'text-red-400' : 'text-text-tertiary'
              )}
              role={hasError ? 'alert' : undefined}
            >
              {hasError ? error : hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = 'Input'
