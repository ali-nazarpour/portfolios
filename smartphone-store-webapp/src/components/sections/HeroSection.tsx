import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'
import { MagneticButton } from '@/components/ui/MagneticButton'

const Hero3D = lazy(() =>
  import('@/components/three/Hero3D').then((m) => ({ default: m.Hero3D })),
)

function Hero3DPlaceholder() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center rounded-2xl glass">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

const brandBadges = [
  { key: 'apple', labelKey: 'common.brandApple' },
  { key: 'samsung', labelKey: 'common.brandSamsung' },
  { key: 'xiaomi', labelKey: 'common.brandXiaomi' },
]

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <AnimatedGradientBackground />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {t('hero.title')}{' '}
              <span className="text-gradient">{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg text-muted-foreground mt-6 max-w-lg leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <MagneticButton to="/products" variant="premium" size="lg">
                {t('hero.exploreProducts')}
              </MagneticButton>
              <MagneticButton to="/gallery" variant="glass" size="lg">
                {t('hero.viewGallery')}
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {brandBadges.map((brand) => (
                <Link
                  key={brand.key}
                  to={`/products?brand=${brand.key}`}
                  className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-primary/10 transition-colors"
                >
                  {t(brand.labelKey)}
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <Suspense fallback={<Hero3DPlaceholder />}>
              <Hero3D />
            </Suspense>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
