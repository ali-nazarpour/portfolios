import { useTranslation } from 'react-i18next'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <section className="min-h-screen flex items-center justify-center premium-gradient-bg pt-20">
      <div className="text-center px-4">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient">404</h1>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mt-4">{t('notFound.title')}</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">{t('notFound.subtitle')}</p>
        <div className="mt-8">
          <MagneticButton to="/" variant="premium" size="lg">
            {t('notFound.backHome')}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
