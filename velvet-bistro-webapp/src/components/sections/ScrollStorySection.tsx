import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AssetImage } from "@/components/products/AssetImage";

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  {
    id: "morning",
    title: "Morning Awakening",
    description:
      "The day begins with the aroma of freshly ground beans. Our baristas craft the first Velvet Espresso as Geneva's golden light fills the terrace.",
    image: "/assets/menu/signature-velvet-espresso.jpg",
  },
  {
    id: "midday",
    title: "Midday Mastery",
    description:
      "Kitchens come alive. Chef Moreau orchestrates seasonal plates — wagyu seared to perfection, herbs picked at dawn from Alpine gardens.",
    image: "/assets/menu/wagyu-tenderloin.jpg",
  },
  {
    id: "afternoon",
    title: "Afternoon Reverie",
    description:
      "Patisserie atelier unveils delicate creations. Pistachio rose tarts and dark chocolate soufflés emerge from Sophie's hands like edible art.",
    image: "/assets/menu/pistachio-rose-tart.jpg",
  },
  {
    id: "evening",
    title: "Evening Enchantment",
    description:
      "Candlelight transforms the space. Seven-course omakase journeys unfold as Marco's cocktails complement each course with precision.",
    image: "/assets/menu/chefs-tasting-omakase.jpg",
  },
];

export function ScrollStorySection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const slides = container.querySelectorAll<HTMLElement>("[data-story-slide]");

    const ctx = gsap.context(() => {
      slides.forEach((slide) => {
        const text = slide.querySelector("[data-story-text]");
        const image = slide.querySelector("[data-story-image]");

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0.35, y: 32 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top 75%",
                end: "top 35%",
                scrub: 1,
              },
            },
          );
        }

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "top 35%",
                scrub: 1,
              },
            },
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate bg-background">
      <div className="section-padding pb-10 md:pb-12">
        <div className="container-luxury">
          <p className="text-sm uppercase tracking-widest text-gold">{t("premium.story.eyebrow")}</p>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        {storySteps.map((step, index) => (
          <article
            key={step.id}
            data-story-slide
            className="sticky top-0 flex min-h-screen items-center section-padding bg-background"
            style={{ zIndex: index + 1 }}
          >
            <div className="container-luxury grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div
                data-story-image
                className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/50 lg:max-h-[560px] lg:justify-self-end"
              >
                <AssetImage src={step.image} alt={step.title} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
              </div>

              <div data-story-text className="lg:justify-self-start">
                <span className="text-sm font-medium text-gold/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl">{step.title}</h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          </article>
        ))}

        <div className="h-[20vh]" aria-hidden />
      </div>
    </section>
  );
}
