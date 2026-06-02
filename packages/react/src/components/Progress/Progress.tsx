'use client'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../lib/cn'
import './Progress.css'

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>>
}

export function Progress({ className, value, ref, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn('fxp-progress', className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="fxp-progress__indicator"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
