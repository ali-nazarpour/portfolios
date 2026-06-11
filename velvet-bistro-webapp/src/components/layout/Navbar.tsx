import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, ChevronDown, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'
import { navLinks } from '@/config/site'
import { cn } from '@/lib/utils'
import { MegaMenu } from '@/components/layout/MegaMenu'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Button } from '@/components/ui/button'

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

  const secondaryLinks = navLinks.filter((link) => link.key !== 'home' && link.key !== 'menu')
  const isHomeHero = location.pathname === '/' && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5',
          isHomeHero && 'max-lg:dark:bg-transparent',
        )}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <UtensilsCrossed className="h-5 w-5 text-gold" />
              </div>
              <span className="font-serif text-xl font-semibold tracking-tight text-charcoal md:text-2xl dark:text-foreground">
                Velvet<span className="text-gradient-gold-hero"> Bistro</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-gold',
                  isHomeHero && 'text-charcoal/90 dark:text-foreground',
                  location.pathname === '/' && 'text-[#8b7035] bg-gold/15 dark:text-gold dark:bg-gold/10'
                )}
              >
                {t('nav.home')}
              </Link>

              <div
                className="relative"
                onMouseEnter={openMegaMenu}
                onMouseLeave={scheduleCloseMegaMenu}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-gold',
                    isHomeHero && 'text-charcoal/90 dark:text-foreground',
                    (location.pathname.startsWith('/menu') || megaOpen) && 'text-[#8b7035] bg-gold/15 dark:text-gold dark:bg-gold/10'
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
                  {t('nav.menu')}
                  <ChevronDown className={cn('h-3 w-3 transition-transform', megaOpen && 'rotate-180')} />
                </button>
              </div>

              {secondaryLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-gold',
                    isHomeHero && 'text-charcoal/90 dark:text-foreground',
                    location.pathname === link.path && 'text-[#8b7035] bg-gold/15 dark:text-gold dark:bg-gold/10'
                  )}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button asChild size="sm">
                <Link to="/contact">{t('nav.bookTable')}</Link>
              </Button>
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
          className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-gold via-amber-400 to-rose-400 z-[60] origin-left"
          style={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          id="scroll-progress"
        />
      )}
    </>
  )
}
