import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { MenuItem } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface MenuItemDetailHeroProps {
  item: MenuItem;
}

const categoryKeyMap: Record<string, string> = {
  breakfast: "breakfast",
  "main-courses": "mainCourses",
  desserts: "desserts",
  coffee: "coffee",
  "signature-drinks": "signatureDrinks",
  "fine-dining": "fineDining",
};

export function MenuItemDetailHero({ item }: MenuItemDetailHeroProps) {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative min-h-[60vh] pt-28">
      <div className="absolute inset-0">
        <AssetImage src={item.image} alt={item.name} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>
      <div className="container-luxury relative z-10 px-4 pb-16 md:px-8">
        <ScrollReveal>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm uppercase tracking-widest text-gold">
              {t(`categories.${categoryKeyMap[item.category]}`)}
            </p>
            <h1 className="mt-2 font-serif text-4xl font-bold md:text-6xl">{item.name}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{item.tagline}</p>
            <p className="mt-6 font-serif text-3xl text-gold">{formatPrice(item.price, i18n.language)}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/contact">{t("menuDetail.askAbout")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">{t("menuDetail.contactUs")}</Link>
              </Button>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
