import { useTranslation } from 'react-i18next'
import { partners } from '@/data/partners'

export function TrustedBySection() {
  const { t } = useTranslation()
  const doubled = [...partners, ...partners]

  return (
    <section className="py-12 md:py-16 border-y border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground font-medium">
          {t('trustedBy.title')}
        </p>
      </div>

      <div className="relative overflow-hidden marquee-mask">
        <div className="flex animate-marquee gap-12 md:gap-16 w-max">
          {doubled.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex items-center justify-center shrink-0 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 w-auto opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 dark:invert dark:opacity-40 dark:group-hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
