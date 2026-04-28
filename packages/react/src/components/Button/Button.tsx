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
      ghost: 'fxp-button--ghost',
      link: 'fxp-button--link',
    },
    size: {
      sm: 'fxp-button--sm',
      md: 'fxp-button--md',
      lg: 'fxp-button--lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Si vrai, le composant rend l'enfant via Radix Slot (composition). Ignore iconLeft/iconRight. */
  asChild?: boolean
  /** ref React 19 — passée comme prop standard, plus de forwardRef */
  ref?: React.Ref<HTMLButtonElement>
  /** Icône avant le label. Ignoré si asChild=true (le Slot délègue le rendu). */
  iconLeft?: React.ReactNode
  /** Icône après le label. Ignoré si asChild=true (le Slot délègue le rendu). */
  iconRight?: React.ReactNode
}

export function Button({
  className,
  variant,
  size,
  asChild,
  ref,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  // asChild délègue au Slot Radix qui exige un seul enfant React.
  // Les slots iconLeft/iconRight sont volontairement ignorés dans ce mode.
  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {iconLeft != null && (
        <span className="fxp-button__icon" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight != null && (
        <span className="fxp-button__icon" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}
