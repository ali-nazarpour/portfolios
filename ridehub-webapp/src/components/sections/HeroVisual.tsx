import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface HeroVisualProps {
  className?: string
}

export function HeroVisual({ className }: HeroVisualProps) {
  const { t } = useTranslation()

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        <img
          src="/assets/images/hero-bg.png"
          alt={t('hero.imageAlt')}
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </div>
  )
}
