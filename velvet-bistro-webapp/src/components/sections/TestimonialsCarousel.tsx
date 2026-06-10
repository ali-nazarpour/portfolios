import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Testimonial } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const item = testimonials[current];

  return (
    <section className="section-padding overflow-hidden bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.testimonials.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.testimonials.title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("premium.testimonials.subtitle")}</p>
          </div>
        </ScrollReveal>

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative rounded-3xl border border-gold/20 p-8 glow-gold md:p-12"
            >
              <Quote className="absolute right-8 top-8 h-12 w-12 text-gold/20" />
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
                <AssetImage
                  src={item.avatar}
                  alt={item.name}
                  className="h-20 w-20 shrink-0 rounded-full ring-2 ring-gold/40 md:h-24 md:w-24"
                />
                <div className="mt-6 md:mt-0">
                  <div className="flex justify-center gap-1 md:justify-start">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-4 font-serif text-lg leading-relaxed md:text-xl">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gold">{item.role}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prev} aria-label="Previous testimonial">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current ? "w-8 bg-gold" : "w-2 bg-border hover:bg-gold/50"
                  )}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} aria-label="Next testimonial">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
