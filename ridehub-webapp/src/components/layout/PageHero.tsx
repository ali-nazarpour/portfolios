import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden', className)}>
      <AnimatedGradientBackground />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
