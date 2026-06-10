import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { ProcessStep } from "@/types/product";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.process.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.process.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.process.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-1/2 md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.id} delay={i * 0.08}>
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  viewport={{ once: true }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="glass inline-block rounded-2xl border border-border/50 p-6 glow-gold">
                      <span className="font-serif text-3xl font-bold text-gradient-gold">
                        {String(step.step).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 font-serif text-xl">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-8 hidden md:left-1/2 md:block md:-translate-x-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-background">
                      <span className="text-sm font-bold text-gold">{step.step}</span>
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
