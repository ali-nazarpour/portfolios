import { useTranslation } from "react-i18next";
import type { AchievementStat } from "@/types/product";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AnimatedStatsSectionProps {
  stats: AchievementStat[];
}

function StatCard({ stat, delay }: { stat: AchievementStat; delay: number }) {
  const { count, ref } = useAnimatedCounter({ target: stat.value });

  return (
    <ScrollReveal delay={delay}>
      <div ref={ref} className="glass rounded-2xl border border-border/50 p-6 text-center glow-gold">
        <p className="font-serif text-4xl font-bold text-gradient-gold md:text-5xl">
          {stat.prefix}
          {count.toLocaleString()}
          {stat.suffix}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    </ScrollReveal>
  );
}

export function StatsSection({ stats }: AnimatedStatsSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.stats.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.stats.title")}</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
