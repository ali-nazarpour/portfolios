import { useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import { killAllScrollTriggers, resetScrollOnNavigation, ScrollTrigger } from '@/hooks/useLenis'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  useLayoutEffect(() => {
    killAllScrollTriggers()
    resetScrollOnNavigation()

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
    })

    return () => {
      cancelAnimationFrame(frame)
      killAllScrollTriggers()
    }
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}
