'use client'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/cn'
import './Switch.css'

export interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof SwitchPrimitive.Root>>
}

export function Switch({ className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="switch"
      className={cn('fxp-switch', className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="fxp-switch__thumb" />
    </SwitchPrimitive.Root>
  )
}
