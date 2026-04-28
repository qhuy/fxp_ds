'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import './Spinner.css'

const spinnerVariants = cva('fxp-spinner', {
  variants: {
    size: {
      sm: 'fxp-spinner--sm',
      md: 'fxp-spinner--md',
      lg: 'fxp-spinner--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'role'>,
    VariantProps<typeof spinnerVariants> {
  /** ref React 19 — prop standard */
  ref?: React.Ref<HTMLSpanElement>
  /** Label accessible. Fallback `Loading` si non fourni (cf. tolérance no-strings sur aria-*). */
  label?: string
}

export function Spinner({ className, size, ref, label = 'Loading', ...props }: SpinnerProps) {
  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <title>{label}</title>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="42 100"
        />
      </svg>
    </span>
  )
}
