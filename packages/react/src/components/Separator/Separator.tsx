'use client'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '../../lib/cn'
import './Separator.css'

export interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof SeparatorPrimitive.Root>>
}

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn('fxp-separator', `fxp-separator--${orientation}`, className)}
      {...props}
    />
  )
}
