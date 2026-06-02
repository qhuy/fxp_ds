'use client'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../lib/cn'
import './Label.css'

export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof LabelPrimitive.Root>>
}

export function Label({ className, ref, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn('fxp-label', className)}
      {...props}
    />
  )
}
