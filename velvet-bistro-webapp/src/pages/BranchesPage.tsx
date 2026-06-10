import { useTranslation } from "react-i18next";
import { branches } from "@/data/branches";
import { BranchCard } from "@/components/products/BranchCard";
import { LeafletBranchMap } from "@/components/sections/LeafletBranchMap";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BranchesPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-28">
      <section className="section-padding pb-12">
        <div className="container-luxury">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t("branches.title")}</h1>
            <p className="mt-3 text-muted-foreground">{t("branches.subtitle")}</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {branches.map((branch, i) => (
              <BranchCard key={branch.id} branch={branch} index={i} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-3xl">{t("branches.mapTitle")}</h2>
          </ScrollReveal>
          <LeafletBranchMap branches={branches} height="500px" />
        </div>
      </section>
    </div>
  );
}
