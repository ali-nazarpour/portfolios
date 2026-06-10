import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { navLinks, megaMenuCategories } from '@/config/site'
import { getMenuItemsByCategory } from '@/data/menu'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const mobileNavLinks = navLinks.filter((link) => link.key !== 'menu')

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useTranslation()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

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
              <span className="font-serif text-xl font-semibold text-gradient-gold">Velvet Bistro</span>
              <button onClick={onClose} aria-label={t('common.closeMenu')} className="p-2 rounded-lg hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="p-6 space-y-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.path}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-lg text-base font-medium hover:bg-accent transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </nav>

            <div className="px-6 pb-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 px-4">
                {t('footer.categories')}
              </p>
              {megaMenuCategories.map((category) => {
                const categorySlug = category.path.split('category=')[1] ?? category.key
                return (
                  <div key={category.key} className="mb-1">
                    <button
                      onClick={() =>
                        setExpandedCategory(expandedCategory === category.key ? null : category.key)
                      }
                      className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="font-medium">{t(`categories.${category.key}`)}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedCategory === category.key ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedCategory === category.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 py-2 space-y-1">
                            {getMenuItemsByCategory(categorySlug).map((item) => (
                              <Link
                                key={item.id}
                                to={`/menu/${item.slug}`}
                                onClick={onClose}
                                className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="p-6 border-t border-border flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <Button asChild className="w-full">
                <Link to="/contact" onClick={onClose}>
                  {t('nav.bookTable')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
