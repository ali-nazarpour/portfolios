import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CaseStudy } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface CaseStudiesSectionProps {
  studies: CaseStudy[];
}

export function CaseStudiesSection({ studies }: CaseStudiesSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.caseStudies.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.caseStudies.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.caseStudies.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="space-y-12">
          {studies.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 0.1}>
              <div
                className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <AssetImage src={study.image} alt={study.title} className="aspect-[4/3] w-full" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/40 to-transparent" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="text-xs uppercase tracking-wider text-gold">{study.client}</span>
                  <h3 className="mt-2 font-serif text-2xl md:text-3xl">{study.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gold">
                    <TrendingUp className="h-4 w-4" />
                    {study.outcome}
                  </p>
                  <p className="mt-4 text-muted-foreground">{study.description}</p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {study.metrics.map((m) => (
                      <div key={m.label} className="glass rounded-xl border border-border/50 px-4 py-3 text-center">
                        <p className="font-serif text-2xl font-bold text-gradient-gold">{m.value}</p>
                        <p className="text-xs text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
