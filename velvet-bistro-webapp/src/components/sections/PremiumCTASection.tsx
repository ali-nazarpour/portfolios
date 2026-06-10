import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedGradientBackground } from "@/components/ui/AnimatedGradientBackground";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

export function PremiumCTASection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30">
            <AnimatedGradientBackground />
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-amber-900/20" />

            <div className="relative z-10 px-8 py-16 text-center md:px-16 md:py-24">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10"
              >
                <Sparkles className="h-8 w-8 text-gold" />
              </motion.div>

              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl">{t("premium.cta.title")}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t("premium.cta.subtitle")}</p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="glow-gold">
                  <Link to="/contact">{t("nav.bookTable")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/menu">{t("nav.exploreMenu")}</Link>
                </Button>
              </div>

              <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">
                {t("premium.cta.note")}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
