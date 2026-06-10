import { cn } from '@/lib/utils'

interface AnimatedGradientBackgroundProps {
  className?: string
}

export function AnimatedGradientBackground({ className }: AnimatedGradientBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden="true">
      <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-[100px] animate-pulse [animation-delay:1s]" />
      <div className="absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-[80px] animate-pulse [animation-delay:2s]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
    </div>
  )
}
