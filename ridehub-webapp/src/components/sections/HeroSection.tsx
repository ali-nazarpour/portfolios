import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { HeroVisual } from '@/components/sections/HeroVisual'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { brands } from '@/data/products'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      <AnimatedGradientBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass text-primary"
            >
              {t('hero.badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              {t('hero.title')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <MagneticButton to="/products" size="lg" className="rounded-full px-8">
                {t('hero.exploreProducts')} <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                to="/gallery"
                variant="outline"
                size="lg"
                className="rounded-full px-8 bg-card/70 backdrop-blur-sm hover:bg-card"
              >
                {t('hero.viewGallery')}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {brands.slice(0, 6).map((brand) => (
                <div
                  key={brand.id}
                  className="px-4 py-2 rounded-lg glass text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {brand.name}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-first lg:order-none"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground z-10"
      >
        <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
