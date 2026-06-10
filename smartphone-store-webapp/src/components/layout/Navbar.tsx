import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, ChevronDown, Smartphone } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/blog', labelKey: 'nav.blog' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
  { to: '/faq', labelKey: 'nav.faq' },
]

export function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMegaMenu = useCallback(() => {
    if (megaCloseTimer.current) {
      clearTimeout(megaCloseTimer.current)
      megaCloseTimer.current = null
    }
    setMegaOpen(true)
  }, [])

  const scheduleCloseMegaMenu = useCallback(() => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current)
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 180)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMegaOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Smartphone className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold tracking-tight">
                Nexus<span className="text-primary">Mobile</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === link.to && 'text-primary bg-accent/50'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={openMegaMenu}
                onMouseLeave={scheduleCloseMegaMenu}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary',
                    (location.pathname.startsWith('/products') || megaOpen) && 'text-primary bg-accent/50'
                  )}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onClick={() => setMegaOpen((prev) => !prev)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setMegaOpen((prev) => !prev)
                    }
                    if (e.key === 'Escape') setMegaOpen(false)
                  }}
                >
                  {t('nav.products')}
                  <ChevronDown className={cn('h-3 w-3 transition-transform', megaOpen && 'rotate-180')} />
                </button>
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-primary',
                    location.pathname === link.to && 'text-primary bg-accent/50'
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent"
              onClick={() => setMobileOpen(true)}
              aria-label={t('common.openMenu')}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MegaMenu
        isOpen={megaOpen}
        onClose={() => setMegaOpen(false)}
        onOpen={openMegaMenu}
        onScheduleClose={scheduleCloseMegaMenu}
      />

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {scrolled && (
        <motion.div
          className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-indigo-500 to-purple-500 z-[60] origin-left"
          style={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          id="scroll-progress"
        />
      )}
    </>
  )
}
