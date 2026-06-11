import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems } from "@/data/menu";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const highlights = menuItems.filter((m) => m.featured).slice(0, 8);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-muted/30">
      <div className="section-padding pb-8">
        <ScrollReveal>
          <div className="container-luxury mb-8">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.horizontal.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.horizontal.title")}</h2>
          </div>
        </ScrollReveal>
      </div>

      <div ref={trackRef} className="flex gap-6 px-4 pb-20 md:px-8 lg:px-16">
        {highlights.map((item) => (
          <Link
            key={item.id}
            to={`/menu/${item.slug}`}
            className="group relative w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border/50 md:w-[380px]"
          >
            <div className="relative h-[420px]">
              <AssetImage
                src={item.image}
                alt={item.name}
                priority
                className="h-full w-full transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="text-xs uppercase tracking-wider text-gold">{item.category.replace("-", " ")}</span>
                <h3 className="mt-1 font-serif text-xl text-white">{item.name}</h3>
                <p className="mt-1 text-sm text-white/70">{item.tagline}</p>
                <p className="mt-2 font-medium text-gold">CHF {item.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
