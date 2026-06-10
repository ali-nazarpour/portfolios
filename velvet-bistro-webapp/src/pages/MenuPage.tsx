import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menuItems } from "@/data/menu";
import { MenuFilters, type SortOption } from "@/components/products/MenuFilters";
import { MenuGrid } from "@/components/products/MenuGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function MenuPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [sort, setSort] = useState<SortOption>("name");

  const filtered = useMemo(() => {
    let items = [...menuItems];
    if (category !== "all") items = items.filter((i) => i.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.tagline.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }
    items.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return items;
  }, [category, search, sort]);

  return (
    <div className="pt-28">
      <section className="section-padding pb-12">
        <div className="container-luxury">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t("menu.title")}</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("menu.subtitle")}</p>
          </ScrollReveal>
          <div className="mt-10">
            <MenuFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              sort={sort}
              onSortChange={setSort}
            />
          </div>
          <div className="mt-10">
            {filtered.length === 0 ? (
              <p className="py-20 text-center text-muted-foreground">{t("menu.noResults")}</p>
            ) : (
              <MenuGrid items={filtered} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
