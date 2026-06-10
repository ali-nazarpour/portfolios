import { useRef, useEffect } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const panels = pin.querySelectorAll<HTMLElement>("[data-story-panel]");
    const ctx = gsap.context(() => {
      panels.forEach((panel, i) => {
        if (i === 0) return;
        gsap.set(panel, { opacity: 0, y: 40 });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${storySteps.length * 100}%`,
        pin: pin,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const activeIndex = Math.min(
            Math.floor(progress * storySteps.length),
            storySteps.length - 1
          );

          panels.forEach((panel, i) => {
            gsap.to(panel, {
              opacity: i === activeIndex ? 1 : 0,
              y: i === activeIndex ? 0 : 40,
              duration: 0.3,
              overwrite: true,
            });
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative">
      <div ref={pinRef} className="relative flex min-h-screen items-center section-padding">
        <div className="container-luxury grid items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[400px]">
            {storySteps.map((step) => (
              <div
                key={step.id}
                data-story-panel
                className="absolute inset-0 overflow-hidden rounded-2xl border border-border/50"
              >
                <AssetImage src={step.image} alt={step.title} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              </div>
            ))}
          </div>

          <div className="relative min-h-[280px]">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.story.eyebrow")}</p>
            {storySteps.map((step) => (
              <div key={step.id} data-story-panel className="absolute inset-0">
                <h2 className="font-serif text-3xl md:text-4xl">{step.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
