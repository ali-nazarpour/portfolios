import { useTranslation } from 'react-i18next'
import { Target, Eye, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { StatsSection } from '@/components/sections/StatsSection'
import { LeafletStoreMap } from '@/components/sections/LeafletStoreMap'

const whyItems = ['about.why1', 'about.why2', 'about.why3', 'about.why4', 'about.why5', 'about.why6']

const partners = [
  { name: 'Apple', logo: '/assets/brands/apple.jpg' },
  { name: 'Samsung', logo: '/assets/brands/samsung.jpg' },
  { name: 'Xiaomi', logo: '/assets/brands/xiaomi.jpg' },
]

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative pt-32 pb-16 premium-gradient-bg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('about.title')} subtitle={t('about.subtitle')} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="font-display text-3xl font-semibold mb-6">{t('about.storyTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('about.storyP1')}</p>
              <p className="text-muted-foreground leading-relaxed">{t('about.storyP2')}</p>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <img
                src="/assets/images/showroom.jpg"
                alt="Nexus Mobile Showroom"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal>
              <div className="glass rounded-2xl p-8 h-full">
                <Target className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-3">{t('about.missionTitle')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('about.missionDesc')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-8 h-full">
                <Eye className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-2xl font-semibold mb-3">{t('about.visionTitle')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('about.visionDesc')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <img
                src="/assets/images/retail.jpg"
                alt="Premium retail experience"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="font-display text-3xl font-semibold mb-4">{t('about.showroomTitle')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('about.showroomDesc')}</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('about.partnersTitle')} subtitle={t('about.partnersDesc')} />
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.1}>
                <div className="glass rounded-2xl p-6 w-48 text-center hover:shadow-lg transition-shadow">
                  <img src={partner.logo} alt={partner.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />
                  <p className="font-semibold">{partner.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('about.whyTitle')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyItems.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.05}>
                <div className="flex items-center gap-3 p-4">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{t(key)}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('about.mapTitle')} subtitle={t('about.mapDesc')} />
          <ScrollReveal>
            <LeafletStoreMap />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
