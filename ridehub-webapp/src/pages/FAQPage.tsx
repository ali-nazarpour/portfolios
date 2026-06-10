import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { FAQAccordion } from '@/components/forms/FAQAccordion'

export default function FAQPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <PageHero title={t('faq.title')} subtitle={t('faq.subtitle')} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-16">
        <FAQAccordion />
      </div>
    </PageWrapper>
  )
}
