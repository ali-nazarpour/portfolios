import { Sparkles, Heart, Award, Globe, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { WhyChooseItem } from "@/types/product";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const iconMap = {
  quality: Sparkles,
  ambiance: Heart,
  service: Award,
  innovation: Globe,
  locations: Users,
  events: Calendar,
} as const;

interface WhyChooseUsSectionProps {
  items: WhyChooseItem[];
}

export function WhyChooseUsSection({ items }: WhyChooseUsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.whyUs.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.whyUs.title")}</h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? Sparkles;
            return (
              <ScrollReveal key={item.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "glass group relative overflow-hidden rounded-2xl border border-border/50 p-8 transition-shadow duration-300 hover:glow-gold",
                    i === 0 && "md:col-span-2 lg:col-span-1"
                  )}
                >
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold/5 transition-transform duration-500 group-hover:scale-150" />
                  <Icon className="relative h-10 w-10 text-gold" />
                  <h3 className="relative mt-4 font-serif text-xl">{item.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
