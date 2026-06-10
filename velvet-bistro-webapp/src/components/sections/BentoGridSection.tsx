import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { BentoItem } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

interface BentoGridShowcaseProps {
  items: BentoItem[];
}

const sizeClasses: Record<BentoItem["size"], string> = {
  sm: "col-span-1 row-span-1",
  md: "col-span-1 row-span-1 md:col-span-1 md:row-span-2",
  lg: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
};

export function BentoGridSection({ items }: BentoGridShowcaseProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.bento.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.bento.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.bento.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-4">
          {items.map((item, i) => {
            const content = (
              <motion.div
                whileHover={{ scale: 0.98 }}
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-border/50",
                  sizeClasses[item.size]
                )}
              >
                <AssetImage
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-serif text-lg text-white md:text-xl">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/70 md:text-sm">{item.description}</p>
                  {item.link && (
                    <ArrowUpRight className="mt-3 h-5 w-5 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </div>
              </motion.div>
            );

            return (
              <ScrollReveal key={item.id} delay={i * 0.06} className={sizeClasses[item.size]}>
                {item.link ? (
                  <Link to={item.link} className="block h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
