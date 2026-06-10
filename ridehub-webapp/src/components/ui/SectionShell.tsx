import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionShellProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'default' | 'muted' | 'bordered'
}

export function SectionShell({ children, className, id, variant = 'default' }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 lg:py-32 relative overflow-hidden',
        variant === 'muted' && 'bg-muted/30',
        variant === 'bordered' && 'border-y border-border',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">{children}</div>
    </section>
  )
}
