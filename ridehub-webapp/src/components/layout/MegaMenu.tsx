import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { getProductsByType, getFeaturedProducts } from '@/data/products'
import { cn } from '@/lib/utils'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onScheduleClose: () => void
}

const typeConfig = [
  { key: 'bicycle', labelKey: 'megaMenu.bicycles', color: 'from-emerald-400 to-emerald-600' },
  { key: 'scooter', labelKey: 'megaMenu.scooters', color: 'from-blue-400 to-blue-600' },
  { key: 'motorcycle', labelKey: 'megaMenu.motorcycles', color: 'from-orange-400 to-orange-600' },
] as const

export function MegaMenu({ isOpen, onClose, onOpen, onScheduleClose }: MegaMenuProps) {
  const { t } = useTranslation()
  const featured = getFeaturedProducts()[0]

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
              {typeConfig.map((type) => {
                const products = getProductsByType(type.key).slice(0, 3)
                return (
                  <div
                    key={type.key}
                    className="p-5 lg:p-6 min-w-0 border-b sm:border-b-0 lg:border-r border-border last:border-r-0"
                  >
                    <Link
                      to={`/products?type=${type.key}`}
                      onClick={onClose}
                      className="group flex items-center gap-2 mb-4"
                    >
                      <div className={cn('w-2 h-2 rounded-full bg-gradient-to-r shrink-0', type.color)} />
                      <h3 className="font-semibold text-sm uppercase tracking-wider group-hover:text-primary transition-colors truncate">
                        {t(type.labelKey)}
                      </h3>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </Link>
                    <ul className="space-y-1">
                      {products.map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/products/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors group min-w-0"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">{product.tagline}</p>
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
                    {t('nav.featured')}
                  </p>
                  <Link
                    to={`/products/${featured.slug}`}
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="relative rounded-xl overflow-hidden mb-3 aspect-[16/10]">
                      <img
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
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('featured.viewDetails')} <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-border px-5 lg:px-6 py-4 flex justify-between items-center bg-muted/30">
              <p className="text-sm text-muted-foreground">{t('megaMenu.byBrand')}</p>
              <Link
                to="/products"
                onClick={onClose}
                className="text-sm font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
              >
                {t('nav.viewAll')} <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
