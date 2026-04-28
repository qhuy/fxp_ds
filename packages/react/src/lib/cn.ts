import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine classes via clsx puis dédoublonne via tailwind-merge.
 * Permet aux apps de override les classes par défaut via la prop `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
