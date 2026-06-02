'use client'
import { cn } from '../../lib/cn'
import './Card.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function Card({ className, ref, ...props }: CardProps) {
  return <div ref={ref} data-slot="card" className={cn('fxp-card', className)} {...props} />
}

export function CardHeader({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn('fxp-card__header', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ref, ...props }: CardProps) {
  return (
    <div ref={ref} data-slot="card-title" className={cn('fxp-card__title', className)} {...props} />
  )
}

export function CardDescription({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn('fxp-card__description', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('fxp-card__content', className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ref, ...props }: CardProps) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('fxp-card__footer', className)}
      {...props}
    />
  )
}
