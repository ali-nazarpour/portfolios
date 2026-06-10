import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { ContactForm } from '@/components/forms/ContactForm'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const { t } = useTranslation()

  const infoCards = [
    { icon: Phone, label: t('contact.phone'), value: siteConfig.phone },
    { icon: Mail, label: t('contact.email'), value: siteConfig.email },
    {
      icon: MapPin,
      label: t('contact.address'),
      value: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`,
    },
    {
      icon: Clock,
      label: t('contact.hours'),
      value: `${t('contact.weekdays')}: ${siteConfig.workingHours.weekdays}\n${t('contact.saturday')}: ${siteConfig.workingHours.saturday}\n${t('contact.sunday')}: ${siteConfig.workingHours.sunday}`,
    },
  ]

  return (
    <PageWrapper>
      <PageHero title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infoCards.map(({ icon: Icon, label, value }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <div className="p-6 rounded-2xl glass h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <ScrollReveal className="lg:col-span-3">
            <h2 className="font-display text-2xl font-bold mb-2">{t('contact.formTitle')}</h2>
            <p className="text-muted-foreground mb-6">{t('contact.formSubtitle')}</p>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <div className="sticky top-28">
              <img
                src="/assets/images/contact-hero.jpg"
                alt="Contact RideHub"
                className="rounded-2xl w-full h-64 object-cover mb-6"
              />
              <Button asChild variant="outline" className="w-full rounded-full" size="lg">
                <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer">
                  {t('contact.whatsapp')}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </PageWrapper>
  )
}
