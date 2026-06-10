import { useTranslation } from 'react-i18next'
import { partners } from '@/data/partners'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function TrustedBySection() {
  const { t } = useTranslation()
  const logos = [...partners, ...partners]

  return (
    <SectionShell className="py-16 lg:py-20" variant="bordered">
      <ScrollReveal>
        <SectionHeading title={t('home.trustedBy.title')} subtitle={t('home.trustedBy.subtitle')} />
      </ScrollReveal>

      <div className="relative overflow-hidden mask-fade">
        <div className="flex animate-marquee w-max gap-12 md:gap-16 items-center">
          {logos.map((partner, i) => (
            <div
              key={`${partner.id}-${i}`}
              className="flex items-center justify-center shrink-0 px-6 py-4 rounded-xl glass opacity-70 hover:opacity-100 hover:scale-105 hover:border-primary/30 border border-transparent transition-all duration-300 cursor-default"
            >
              <img src={partner.logo} alt={partner.name} className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </SectionShell>
  )
}
