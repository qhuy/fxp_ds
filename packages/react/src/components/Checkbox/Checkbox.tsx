'use client'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '../../lib/cn'
import './Checkbox.css'

export interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof CheckboxPrimitive.Root>>
}

export function Checkbox({ className, ref, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn('fxp-checkbox', className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="fxp-checkbox__indicator"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="m20 6-11 11-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
