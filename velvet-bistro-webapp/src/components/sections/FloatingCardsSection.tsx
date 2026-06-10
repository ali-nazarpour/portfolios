import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { FloatingCardItem } from "@/types/product";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface FloatingCardsSectionProps {
  cards: FloatingCardItem[];
}

export function FloatingCardsSection({ cards }: FloatingCardsSectionProps) {
  const { t } = useTranslation();
  const { containerRef, handleMouseMove, handleMouseLeave } = useMouseParallax(20);

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.floating.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.floating.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.floating.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {cards.map((card, i) => (
            <ScrollReveal key={card.id} delay={i * 0.1}>
              <motion.div
                data-parallax
                style={{ transition: "transform 0.15s ease-out" }}
                whileHover={{ scale: 1.05, rotateZ: i % 2 === 0 ? 2 : -2 }}
                className={`glass rounded-2xl border border-border/50 overflow-hidden glow-gold ${
                  i % 2 === 0 ? "md:translate-y-4" : "md:-translate-y-4"
                }`}
              >
                <AssetImage src={card.image} alt={card.title} className="h-32 w-full md:h-36" />
                <div className="p-4">
                  <h3 className="font-serif text-sm md:text-base">{card.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
