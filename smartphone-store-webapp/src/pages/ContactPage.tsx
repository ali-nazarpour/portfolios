import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'

const contactCards = [
  { icon: Phone, labelKey: 'contact.phone', value: siteConfig.phone },
  { icon: Mail, labelKey: 'contact.email', value: siteConfig.email },
  { icon: MapPin, labelKey: 'contact.address', value: siteConfig.address.full },
  { icon: Clock, labelKey: 'contact.hours', value: `${siteConfig.workingHours.weekdays} | ${siteConfig.workingHours.weekend}` },
]

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative pt-32 pb-16 premium-gradient-bg">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactCards.map((card, index) => (
              <ScrollReveal key={card.labelKey} delay={index * 0.1}>
                <div className="glass rounded-2xl p-6 h-full">
                  <card.icon className="h-6 w-6 text-primary mb-3" />
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{t(card.labelKey)}</p>
                  <p className="text-sm font-medium">{card.value}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <h2 className="font-display text-2xl font-semibold mb-2">{t('contact.formTitle')}</h2>
              <p className="text-muted-foreground mb-6">{t('contact.formSubtitle')}</p>
              <ContactForm />
            </ScrollReveal>

            <ScrollReveal direction="right">
              <img
                src="/assets/images/contact.jpg"
                alt="Contact Nexus Mobile"
                className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover mb-8"
              />
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold">{t('contact.whatsapp')}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t('contact.whatsappDesc')}</p>
                <Button variant="outline" asChild>
                  <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer">
                    {t('contact.whatsapp')}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
