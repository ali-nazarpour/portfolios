import { lazy, Suspense, Component, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const Hero3D = lazy(() => import('./Hero3D').then((module) => ({ default: module.Hero3D })))

interface Hero3DLazyProps {
  className?: string
}

function Hero3DFallback({ className }: Hero3DLazyProps) {
  return (
    <div
      className={cn(
        'w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 animate-pulse',
        className
      )}
    />
  )
}

class Hero3DErrorBoundary extends Component<{ children: ReactNode; className?: string }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return <Hero3DFallback className={this.props.className} />
    }
    return this.props.children
  }
}

export function Hero3DLazy({ className }: Hero3DLazyProps) {
  return (
    <Hero3DErrorBoundary className={className} key="hero-3d">
      <Suspense fallback={<Hero3DFallback className={className} />}>
        <Hero3D className={className} />
      </Suspense>
    </Hero3DErrorBoundary>
  )
}
