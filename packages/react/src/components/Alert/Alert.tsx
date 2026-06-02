'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import './Alert.css'

const alertVariants = cva('fxp-alert', {
  variants: {
    variant: {
      default: 'fxp-alert--default',
      destructive: 'fxp-alert--destructive',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  ref?: React.Ref<HTMLDivElement>
}

export function Alert({ className, variant, ref, ...props }: AlertProps) {
  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

export function AlertTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn('fxp-alert__title', className)}
      {...props}
    />
  )
}

export function AlertDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn('fxp-alert__description', className)}
      {...props}
    />
  )
}
