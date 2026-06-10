import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

/** Standard horizontal page/section padding container */
export const pageContainerClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'
