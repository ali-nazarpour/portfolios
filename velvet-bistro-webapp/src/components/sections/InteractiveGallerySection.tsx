import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GalleryImage } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InteractiveGallerySectionProps {
  images: GalleryImage[];
}

const categories = ["all", "food", "drinks", "interior", "chef", "dining"] as const;

const aspectClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export function InteractiveGallerySection({ images }: InteractiveGallerySectionProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold">{t("premium.gallery.eyebrow")}</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.gallery.title")}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition",
                    filter === cat
                      ? "bg-gold text-charcoal"
                      : "border border-border/50 text-muted-foreground hover:border-gold/50"
                  )}
                >
                  {t(`gallery.categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div layout className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setLightbox(img)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border/50",
                  aspectClasses[img.aspect]
                )}
              >
                <AssetImage
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition group-hover:opacity-100">
                  <ZoomIn className="h-8 w-8 text-gold" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/gallery">{t("home.viewAll")}</Link>
          </Button>
        </div>
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          {lightbox && (
            <AssetImage src={lightbox.src} alt={lightbox.alt} className="max-h-[85vh] w-full rounded-2xl object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
