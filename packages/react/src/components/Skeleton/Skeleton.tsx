'use client'
import { cn } from '../../lib/cn'
import './Skeleton.css'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function Skeleton({ className, ref, ...props }: SkeletonProps) {
  return <div ref={ref} data-slot="skeleton" className={cn('fxp-skeleton', className)} {...props} />
}
