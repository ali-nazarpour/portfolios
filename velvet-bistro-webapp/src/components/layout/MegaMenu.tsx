import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getMenuItemsByCategory, getFeaturedMenuItems } from '@/data/menu'
import { AssetImage } from '@/components/products/AssetImage'
import { cn } from '@/lib/utils'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onScheduleClose: () => void
}

const categoryConfig = [
  { key: 'breakfast', labelKey: 'categories.breakfast', color: 'from-amber-400 to-amber-600' },
  { key: 'main-courses', labelKey: 'categories.mainCourses', color: 'from-rose-400 to-rose-600' },
  { key: 'desserts', labelKey: 'categories.desserts', color: 'from-purple-400 to-purple-600' },
] as const

export function MegaMenu({ isOpen, onClose, onOpen, onScheduleClose }: MegaMenuProps) {
  const { t } = useTranslation()
  const featured = getFeaturedMenuItems()[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed left-0 right-0 top-[72px] z-[100] px-4 md:px-8 pointer-events-auto"
          onMouseEnter={onOpen}
          onMouseLeave={onScheduleClose}
        >
          <div className="h-3" aria-hidden="true" />

          <div className="mx-auto w-full max-w-7xl rounded-2xl glass shadow-2xl border border-glass-border overflow-hidden bg-popover/95 backdrop-blur-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
              {categoryConfig.map((category) => {
                const items = getMenuItemsByCategory(category.key).slice(0, 3)
                return (
                  <div
                    key={category.key}
                    className="p-5 lg:p-6 min-w-0 border-b sm:border-b-0 lg:border-r border-border last:border-r-0"
                  >
                    <Link
                      to={`/menu?category=${category.key}`}
                      onClick={onClose}
                      className="group flex items-center gap-2 mb-4"
                    >
                      <div className={cn('w-2 h-2 rounded-full bg-gradient-to-r shrink-0', category.color)} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider group-hover:text-gold transition-colors truncate">
                        {t(category.labelKey)}
                      </h3>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={`/menu/${item.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group min-w-0"
                          >
                            <AssetImage
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium group-hover:text-gold transition-colors truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">{item.tagline}</p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}

              {featured && (
                <div className="p-5 lg:p-6 min-w-0 sm:col-span-2 lg:col-span-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    {t('menu.featured')}
                  </p>
                  <Link
                    to={`/menu/${featured.slug}`}
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-[16/10]">
                      <AssetImage
                        src={featured.image}
                        alt={featured.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-semibold truncate">{featured.name}</p>
                        <p className="text-white/70 text-xs truncate">{featured.tagline}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('nav.exploreMenu')} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-border px-5 lg:px-6 py-4 flex justify-between items-center bg-muted/30">
              <p className="text-sm text-muted-foreground">{t('footer.categories')}</p>
              <Link
                to="/menu"
                onClick={onClose}
                className="text-sm font-medium text-gold hover:underline flex items-center gap-1 shrink-0"
              >
                {t('home.viewAll')} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
