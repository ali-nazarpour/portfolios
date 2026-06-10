import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { navLinks, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { getProductsByType } from '@/data/products'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const vehicleTypes = [
  { key: 'bicycle', labelKey: 'megaMenu.bicycles' },
  { key: 'scooter', labelKey: 'megaMenu.scooters' },
  { key: 'motorcycle', labelKey: 'megaMenu.motorcycles' },
] as const

const mobileNavLinks = navLinks.filter((link) => link.href !== '/products')

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const [expandedType, setExpandedType] = useState<string | null>(null)

  const mobileNavItemClass = (isActive: boolean) =>
    cn(
      'block px-4 py-3 rounded-full text-base font-medium transition-colors',
      isActive
        ? 'text-primary bg-primary/10 font-semibold'
        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
    )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm glass z-50 overflow-y-auto"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="font-display text-xl font-semibold">{siteConfig.name}</span>
              <button onClick={onClose} aria-label={t('common.closeMenu')} className="p-2 rounded-lg hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={mobileNavItemClass(location.pathname === link.href)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-4">
                {t('nav.products')}
              </p>
              {vehicleTypes.map((type) => (
                <div key={type.key} className="mb-1">
                  <button
                    onClick={() => setExpandedType(expandedType === type.key ? null : type.key)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="font-medium">{t(type.labelKey)}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expandedType === type.key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedType === type.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 py-2 space-y-1">
                          {getProductsByType(type.key).map((product) => (
                            <Link
                              key={product.id}
                              to={`/products/${product.slug}`}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-border flex items-center justify-between">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
