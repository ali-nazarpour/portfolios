import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { BrandValue } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface BrandValuesSectionProps {
  values: BrandValue[];
}

export function BrandValuesSection({ values }: BrandValuesSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.values.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.values.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.values.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, i) => (
            <ScrollReveal key={value.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 sm:flex-row"
              >
                <div className="relative h-48 shrink-0 overflow-hidden sm:h-auto sm:w-48">
                  <AssetImage
                    src={value.image}
                    alt={value.title}
                    className="h-full w-full transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="glass flex flex-1 flex-col justify-center p-6">
                  <h3 className="font-serif text-xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
