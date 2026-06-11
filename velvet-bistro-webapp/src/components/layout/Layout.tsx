import { useEffect, useLayoutEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import {
  gsap,
  killAllScrollTriggers,
  refreshScrollTriggers,
  resetScrollOnNavigation,
} from '@/hooks/useLenis'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  useLayoutEffect(() => {
    killAllScrollTriggers()
    resetScrollOnNavigation()
  }, [location.pathname])

  useEffect(() => {
    refreshScrollTriggers()

    const timeout = window.setTimeout(() => {
      refreshScrollTriggers()

      document.querySelectorAll<HTMLElement>('main [style*="opacity: 0"]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        const viewHeight = window.innerHeight || document.documentElement.clientHeight

        if (rect.top < viewHeight && rect.bottom > 0) {
          gsap.set(el, { opacity: 1, x: 0, y: 0, clearProps: 'transform' })
        }
      })
    }, 100)

    return () => window.clearTimeout(timeout)
  }, [location.pathname, children])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main key={location.pathname} className="flex-1">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  )
}
