import { useTranslation } from 'react-i18next'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FAQAccordion } from '@/components/forms/FAQAccordion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function FAQPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative pt-32 pb-16 premium-gradient-bg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('faq.title')} subtitle={t('faq.subtitle')} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <FAQAccordion />

          <ScrollReveal className="mt-16 text-center">
            <h3 className="font-display text-2xl font-semibold">{t('faq.ctaTitle')}</h3>
            <p className="text-muted-foreground mt-2 mb-6">{t('faq.ctaDesc')}</p>
            <MagneticButton to="/contact" variant="premium" size="lg">
              {t('faq.ctaButton')}
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
