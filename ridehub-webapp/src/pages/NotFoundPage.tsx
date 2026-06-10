import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradientBackground } from '@/components/ui/AnimatedGradientBackground'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <AnimatedGradientBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center px-4"
      >
        <span className="font-display text-8xl md:text-9xl font-bold gradient-text">404</span>
        <h1 className="font-display text-2xl md:text-3xl font-bold mt-4 mb-2">{t('notFound.title')}</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t('notFound.subtitle')}</p>
        <Button asChild size="lg" className="rounded-full">
          <Link to="/">
            <Home className="h-4 w-4" /> {t('notFound.backHome')}
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
