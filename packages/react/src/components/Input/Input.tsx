'use client'
import { cn } from '../../lib/cn'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
}

export function Input({ className, type = 'text', ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn('fxp-input', className)}
      {...props}
    />
  )
}
