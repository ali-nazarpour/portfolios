import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { MenuItem } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { formatPrice } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

export function MenuCard({ item, index = 0 }: MenuCardProps) {
  const { t, i18n } = useTranslation();

  return (
    <ScrollReveal delay={index * 0.05} duration={0.5}>
      <article className="group">
        <Link to={`/menu/${item.slug}`} className="block">
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card">
            <div className="relative aspect-[4/3] overflow-hidden">
              <AssetImage
                src={item.image}
                alt={item.name}
                priority={index < 3}
                className="h-full w-full transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
              {item.featured && (
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal">
                  {t("menu.featured")}
                </span>
              )}
              <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/90 text-charcoal opacity-0 transition group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-gold">
                {t(`categories.${item.category === "main-courses" ? "mainCourses" : item.category === "signature-drinks" ? "signatureDrinks" : item.category === "fine-dining" ? "fineDining" : item.category}`)}
              </p>
              <h3 className="mt-1 font-serif text-xl group-hover:text-gold">{item.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.tagline}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-gold">{formatPrice(item.price, i18n.language)}</span>
                <span className="text-xs text-muted-foreground">{item.calories} {t("menu.calories")}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}
