import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMenuItemBySlug, getRecommendedPairings } from "@/data/menu";
import { MenuItemDetailHero } from "@/components/products/MenuItemDetailHero";
import { MenuGrid } from "@/components/products/MenuGrid";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function MenuItemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const item = slug ? getMenuItemBySlug(slug) : undefined;

  if (!item) return <NotFoundPage />;

  const pairings = getRecommendedPairings(item);

  return (
    <>
      <MenuItemDetailHero item={item} />
      <section className="section-padding">
        <div className="container-luxury grid gap-12 lg:grid-cols-3">
          <ScrollReveal className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-muted-foreground">{item.description}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="glass rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t("menuDetail.ingredients")}</h3>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {item.ingredients.map((ing) => (
                    <li key={ing}>• {ing}</li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t("menuDetail.allergens")}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.allergens.length ? item.allergens.join(", ") : t("menuDetail.none")}
                </p>
              </div>
              <div className="glass rounded-xl border border-border/50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gold">{t("menuDetail.calories")}</h3>
                <p className="mt-3 font-serif text-2xl text-gold">{item.calories}</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {item.galleryImages.map((img, i) => (
                <AssetImage key={i} src={img} alt="" className="rounded-xl aspect-square" />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      {pairings.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-luxury">
            <ScrollReveal>
              <h2 className="mb-8 font-serif text-3xl">{t("menuDetail.pairings")}</h2>
            </ScrollReveal>
            <MenuGrid items={pairings} />
          </div>
        </section>
      )}
      <section className="section-padding">
        <div className="container-luxury text-center">
          <Link to="/menu" className="text-gold hover:underline">← {t("nav.menu")}</Link>
        </div>
      </section>
    </>
  );
}
