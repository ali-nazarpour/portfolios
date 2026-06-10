import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FAQItem } from "@/types/product";
import { FAQAccordion } from "@/components/forms/FAQAccordion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

interface FAQPreviewSectionProps {
  items: FAQItem[];
}

export function FAQPreviewSection({ items }: FAQPreviewSectionProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury max-w-3xl">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.faq.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl">{t("home.faqPreview")}</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("premium.faq.searchPlaceholder")}
              className="glass w-full rounded-xl border border-border/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-gold/50"
              aria-label={t("premium.faq.searchPlaceholder")}
            />
          </div>
        </ScrollReveal>

        {filtered.length > 0 ? (
          <FAQAccordion items={filtered} showCategories={false} />
        ) : (
          <p className="py-8 text-center text-muted-foreground">{t("premium.faq.noResults")}</p>
        )}

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/faq">{t("home.viewAll")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
