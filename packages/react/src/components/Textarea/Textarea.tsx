'use client'
import { cn } from '../../lib/cn'
import './Textarea.css'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>
}

export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <textarea ref={ref} data-slot="textarea" className={cn('fxp-textarea', className)} {...props} />
  )
}
