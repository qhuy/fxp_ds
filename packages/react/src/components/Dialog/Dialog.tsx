'use client'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'
import './Dialog.css'

export interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root> {}

export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

export interface DialogTriggerProps
  extends React.ComponentProps<typeof DialogPrimitive.Trigger> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Trigger>>
}

export function DialogTrigger({ className, ref, ...props }: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      data-slot="dialog-trigger"
      className={cn('fxp-dialog__trigger', className)}
      {...props}
    />
  )
}

export interface DialogPortalProps
  extends React.ComponentProps<typeof DialogPrimitive.Portal> {}

export function DialogPortal(props: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

export interface DialogOverlayProps
  extends React.ComponentProps<typeof DialogPrimitive.Overlay> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Overlay>>
}

export function DialogOverlay({ className, ref, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn('fxp-dialog__overlay', className)}
      {...props}
    />
  )
}

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Content>>
}

export function DialogContent({ className, children, ref, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn('fxp-dialog__content', className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function DialogHeader({ className, ref, ...props }: DialogHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn('fxp-dialog__header', className)}
      {...props}
    />
  )
}

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

export function DialogFooter({ className, ref, ...props }: DialogFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn('fxp-dialog__footer', className)}
      {...props}
    />
  )
}

export interface DialogTitleProps
  extends React.ComponentProps<typeof DialogPrimitive.Title> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Title>>
}

export function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn('fxp-dialog__title', className)}
      {...props}
    />
  )
}

export interface DialogDescriptionProps
  extends React.ComponentProps<typeof DialogPrimitive.Description> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Description>>
}

export function DialogDescription({ className, ref, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn('fxp-dialog__description', className)}
      {...props}
    />
  )
}

export interface DialogCloseProps
  extends React.ComponentProps<typeof DialogPrimitive.Close> {
  ref?: React.Ref<React.ElementRef<typeof DialogPrimitive.Close>>
}

export function DialogClose({ className, ref, ...props }: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="dialog-close"
      className={cn('fxp-dialog__close', className)}
      {...props}
    />
  )
}
