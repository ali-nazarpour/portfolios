import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { getProductsByBrand } from '@/data/products'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { to: '/', labelKey: 'nav.home' },
  { to: '/products', labelKey: 'nav.products' },
  { to: '/gallery', labelKey: 'nav.gallery' },
  { to: '/blog', labelKey: 'nav.blog' },
  { to: '/about', labelKey: 'nav.about' },
  { to: '/contact', labelKey: 'nav.contact' },
  { to: '/faq', labelKey: 'nav.faq' },
]

const brands = [
  { key: 'apple', labelKey: 'common.brandApple' },
  { key: 'samsung', labelKey: 'common.brandSamsung' },
  { key: 'xiaomi', labelKey: 'common.brandXiaomi' },
] as const

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation()
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null)

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
              <span className="font-display text-xl font-semibold">Nexus Mobile</span>
              <button onClick={onClose} aria-label={t('common.closeMenu')} className="p-2 rounded-lg hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-4">
                {t('nav.brands')}
              </p>
              {brands.map((brand) => (
                <div key={brand.key} className="mb-1">
                  <button
                    onClick={() => setExpandedBrand(expandedBrand === brand.key ? null : brand.key)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="font-medium">{t(brand.labelKey)}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${expandedBrand === brand.key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedBrand === brand.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 py-2 space-y-1">
                          {getProductsByBrand(brand.key).map((product) => (
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
