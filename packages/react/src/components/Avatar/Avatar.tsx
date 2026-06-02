'use client'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../lib/cn'
import './Avatar.css'

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Root>>
}

export function Avatar({ className, ref, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn('fxp-avatar', className)}
      {...props}
    />
  )
}

export interface AvatarImageProps extends React.ComponentProps<typeof AvatarPrimitive.Image> {
  ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Image>>
}

export function AvatarImage({ className, ref, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn('fxp-avatar__image', className)}
      {...props}
    />
  )
}

export interface AvatarFallbackProps extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {
  ref?: React.Ref<React.ElementRef<typeof AvatarPrimitive.Fallback>>
}

export function AvatarFallback({ className, ref, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn('fxp-avatar__fallback', className)}
      {...props}
    />
  )
}
