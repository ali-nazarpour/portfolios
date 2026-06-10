import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TimelineEvent } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

interface CompanyTimelineProps {
  events: TimelineEvent[];
}

export function CompanyTimelineSection({ events }: CompanyTimelineProps) {
  const { t } = useTranslation();
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-widest text-gold">{t("premium.timeline.eyebrow")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.timeline.title")}</h2>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-4xl">
          <div
            ref={lineRef}
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-gold via-gold/50 to-transparent md:left-1/2 md:block md:-translate-x-1/2"
          />

          {events.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.1}>
              <motion.div
                className={`relative mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold bg-background">
                    <div className="h-2 w-2 rounded-full bg-gold" />
                  </div>
                </div>

                <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <span className="font-serif text-3xl font-bold text-gradient-gold">{event.year}</span>
                  <h3 className="mt-2 font-serif text-xl">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                </div>

                {event.image && (
                  <div className={`md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:order-first" : ""}`}>
                    <AssetImage
                      src={event.image}
                      alt={event.title}
                      className="rounded-2xl border border-border/50 glow-gold"
                    />
                  </div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
