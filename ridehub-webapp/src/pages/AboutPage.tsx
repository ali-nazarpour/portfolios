import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { StatsSection } from '@/components/sections/StatsSection'
import { BrandShowcase } from '@/components/sections/BrandShowcase'
import { LeafletStoreMap } from '@/components/sections/LeafletStoreMap'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <PageHero title={t('about.title')} subtitle={t('about.subtitle')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <ScrollReveal>
            <img
              src="/assets/images/about-showroom.jpg"
              alt="RideHub premium showroom"
              className="rounded-2xl w-full h-[400px] object-cover shadow-xl"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-display text-3xl font-bold mb-6">{t('about.storyTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t('about.storyP1')}</p>
            <p className="text-muted-foreground leading-relaxed">{t('about.storyP2')}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="p-8 rounded-2xl glass">
              <h3 className="font-display text-xl font-bold mb-4">{t('about.missionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('about.mission')}</p>
            </div>
            <div className="p-8 rounded-2xl glass">
              <h3 className="font-display text-xl font-bold mb-4">{t('about.visionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('about.vision')}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <StatsSection />
      <BrandShowcase />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <SectionHeading
            title={t('about.locationTitle')}
            subtitle={t('about.locationSubtitle')}
          />
          <LeafletStoreMap />
          <p className="text-center text-muted-foreground mt-6">
            {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
          </p>
        </ScrollReveal>
      </div>
    </PageWrapper>
  )
}
