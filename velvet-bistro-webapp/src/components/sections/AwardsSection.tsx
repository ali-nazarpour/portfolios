import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AwardItem } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AwardsShowcaseProps {
  awards: AwardItem[];
}

export function AwardsSection({ awards }: AwardsShowcaseProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.awards.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.awards.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.awards.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, i) => (
            <ScrollReveal key={award.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group glass overflow-hidden rounded-2xl border border-border/50 glow-gold"
              >
                <div className="relative h-48 overflow-hidden">
                  <AssetImage
                    src={award.image}
                    alt={award.title}
                    className="h-full w-full transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-gold" />
                    <span className="text-xs font-medium text-white/90">{award.year}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-wider text-gold">{award.organization}</p>
                  <h3 className="mt-2 font-serif text-xl">{award.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{award.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
