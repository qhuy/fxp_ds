'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import './Badge.css'

const badgeVariants = cva('fxp-badge', {
  variants: {
    variant: {
      default: 'fxp-badge--default',
      secondary: 'fxp-badge--secondary',
      outline: 'fxp-badge--outline',
      destructive: 'fxp-badge--destructive',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  ref?: React.Ref<HTMLSpanElement>
}

export function Badge({ className, variant, ref, ...props }: BadgeProps) {
  return (
    <span
      ref={ref}
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}
