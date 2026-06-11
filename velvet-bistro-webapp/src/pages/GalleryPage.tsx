import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { galleryImages, galleryCategories } from "@/data/gallery";
import { GalleryMasonry } from "@/components/products/GalleryMasonry";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GalleryPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return galleryImages;
    return galleryImages.filter((img) => img.category === category);
  }, [category]);

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="container-luxury">
          <h1 className="font-serif text-4xl md:text-5xl">{t("gallery.title")}</h1>
          <p className="mt-3 text-muted-foreground">{t("gallery.subtitle")}</p>
          <Tabs value={category} onValueChange={setCategory} className="mt-10">
            <TabsList className="flex h-auto flex-wrap gap-1">
              {galleryCategories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {t(`gallery.categories.${cat}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-10">
            <GalleryMasonry images={filtered} />
          </div>
        </div>
      </section>
    </div>
  );
}
