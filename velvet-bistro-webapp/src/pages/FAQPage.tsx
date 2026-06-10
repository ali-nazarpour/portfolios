import { useTranslation } from "react-i18next";
import { faqItems } from "@/data/faq";
import { FAQAccordion } from "@/components/forms/FAQAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FAQPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="container-luxury max-w-3xl">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t("faq.title")}</h1>
            <p className="mt-3 text-muted-foreground">{t("faq.subtitle")}</p>
          </ScrollReveal>
          <div className="mt-12">
            <FAQAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
