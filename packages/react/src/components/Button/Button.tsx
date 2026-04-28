'use client'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'
import './Button.css'

const buttonVariants = cva('fxp-button', {
  variants: {
    variant: {
      primary: 'fxp-button--primary',
      secondary: 'fxp-button--secondary',
      destructive: 'fxp-button--destructive',
    },
    size: {
      sm: 'fxp-button--sm',
      md: 'fxp-button--md',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Si vrai, le composant rend l'enfant via Radix Slot (composition) */
  asChild?: boolean
  /** ref React 19 — passée comme prop standard, plus de forwardRef */
  ref?: React.Ref<HTMLButtonElement>
}

export function Button({ className, variant, size, asChild, ref, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
