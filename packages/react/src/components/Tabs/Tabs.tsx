'use client'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/cn'
import './Tabs.css'

export interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Root>>
}

export function Tabs({ className, ref, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      className={cn('fxp-tabs', className)}
      {...props}
    />
  )
}

export interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.List>>
}

export function TabsList({ className, ref, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn('fxp-tabs__list', className)}
      {...props}
    />
  )
}

export interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Trigger>>
}

export function TabsTrigger({ className, ref, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn('fxp-tabs__trigger', className)}
      {...props}
    />
  )
}

export interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  ref?: React.Ref<React.ElementRef<typeof TabsPrimitive.Content>>
}

export function TabsContent({ className, ref, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn('fxp-tabs__content', className)}
      {...props}
    />
  )
}
