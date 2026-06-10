import { useTranslation } from "react-i18next";
import type { PartnerLogo } from "@/types/product";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TrustedByMarqueeProps {
  logos: PartnerLogo[];
}

export function TrustedBySection({ logos }: TrustedByMarqueeProps) {
  const { t } = useTranslation();
  const doubled = [...logos, ...logos];

  return (
    <section className="section-padding overflow-hidden border-y border-border/50">
      <div className="container-luxury">
        <ScrollReveal>
          <p className="mb-8 text-center text-sm uppercase tracking-widest text-muted-foreground">
            {t("premium.trustedBy.title")}
          </p>
        </ScrollReveal>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-16 py-4">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="group flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-transparent px-6 transition-all duration-300 hover:border-gold/30 hover:bg-muted/50"
            >
              <img
                src={logo.logo}
                alt={logo.name}
                className="max-h-10 max-w-full opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
