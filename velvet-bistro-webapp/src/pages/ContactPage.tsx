import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { AssetImage } from "@/components/products/AssetImage";
import { ContactForm } from "@/components/forms/ContactForm";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

export function ContactPage() {
  const { t } = useTranslation();
  const whatsapp = socialLinks.find((s) => s.platform === "whatsapp");

  const cards = [
    { icon: Phone, label: t("contact.phone"), value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: Mail, label: t("contact.email"), value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: t("contact.address"), value: siteConfig.address },
    { icon: Clock, label: t("contact.hours"), value: siteConfig.hours },
  ];

  return (
    <div className="pt-28">
      <section className="relative min-h-[40vh]">
        <AssetImage src="/assets/images/contact-hero.jpg" alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="relative z-10 flex min-h-[40vh] items-end section-padding pb-12">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t("contact.title")}</h1>
            <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 0.08}>
              <div className="glass rounded-2xl border border-border/50 p-6">
                <card.icon className="h-6 w-6 text-gold" />
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="mt-2 block text-sm hover:text-gold">{card.value}</a>
                ) : (
                  <p className="mt-2 text-sm">{card.value}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-luxury grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="font-serif text-3xl">{t("contact.formTitle")}</h2>
            <p className="mt-3 text-muted-foreground">
              Fill out the form below and our concierge team will respond within 24 hours.
            </p>
            {whatsapp && (
              <Button asChild variant="outline" className="mt-6 gap-2">
                <a href={whatsapp.url} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  {t("contact.whatsapp")}
                </a>
              </Button>
            )}
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
