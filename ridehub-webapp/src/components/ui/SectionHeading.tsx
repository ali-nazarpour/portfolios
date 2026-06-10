import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ badge, title, subtitle, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 md:mb-16', align === 'center' && 'text-center mx-auto max-w-3xl', className)}>
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
