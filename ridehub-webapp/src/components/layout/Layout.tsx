import { useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import { killAllScrollTriggers } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  useLayoutEffect(() => {
    return () => killAllScrollTriggers()
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}

export function PageWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('pb-16 lg:pb-24', className)}>
      {children}
    </div>
  )
}
