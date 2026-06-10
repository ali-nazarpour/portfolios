import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems } from "@/data/menu";
import { AssetImage } from "@/components/products/AssetImage";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export function CinematicRevealSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dish = menuItems.find((m) => m.slug === "lobster-thermidor")!;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.4, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        content,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div ref={imageRef} className="absolute inset-0">
        <AssetImage src={dish.image} alt={dish.name} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center section-padding">
        <div ref={contentRef} className="container-luxury max-w-xl">
          <p className="text-sm uppercase tracking-widest text-gold">{t("premium.cinematic.eyebrow")}</p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-6xl">{dish.name}</h2>
          <p className="mt-2 text-xl text-gold">{dish.tagline}</p>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{dish.description}</p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link to={`/menu/${dish.slug}`}>{t("menu.viewDetails")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/menu">{t("nav.exploreMenu")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
