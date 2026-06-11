import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryMasonryProps {
  images: GalleryImage[];
}

const aspectClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export function GalleryMasonry({ images }: GalleryMasonryProps) {
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setLightbox(img)}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/50",
              aspectClasses[img.aspect]
            )}
          >
            <AssetImage src={img.src} alt={img.alt} className="h-full w-full transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 opacity-0 transition group-hover:opacity-100">
              <ZoomIn className="h-8 w-8 text-gold" />
            </div>
          </button>
        ))}
      </div>
      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
          {lightbox && (
            <AssetImage src={lightbox.src} alt={lightbox.alt} className="max-h-[85vh] w-full rounded-2xl object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
