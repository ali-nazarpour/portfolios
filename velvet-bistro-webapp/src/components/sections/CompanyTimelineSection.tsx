import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TimelineEvent } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface CompanyTimelineProps {
  events: TimelineEvent[];
}

function TimelineDot({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-background",
        className,
      )}
      aria-hidden
    >
      <div className="h-2 w-2 rounded-full bg-gold" />
    </div>
  );
}

function TimelineContent({ event, align }: { event: TimelineEvent; align: "left" | "right" }) {
  return (
    <div className={cn("min-w-0", align === "right" ? "md:text-right" : "md:text-left")}>
      <span className="font-serif text-3xl font-bold text-gradient-gold">{event.year}</span>
      <h3 className="mt-2 font-serif text-xl">{event.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
    </div>
  );
}

function TimelineImage({ event }: { event: TimelineEvent }) {
  if (!event.image) return null;

  return (
    <AssetImage
      src={event.image}
      alt={event.title}
      className="rounded-2xl border border-border/50 glow-gold"
    />
  );
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
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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

        <div className="relative mx-auto max-w-5xl">
          <div
            ref={lineRef}
            className="absolute bottom-0 left-[1.125rem] top-0 w-px origin-top bg-gradient-to-b from-gold via-gold/50 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12 md:gap-20">
            {events.map((event, i) => {
              const isEven = i % 2 === 0;

              return (
                <ScrollReveal key={event.id} delay={i * 0.1} direction={isEven ? "left" : "right"}>
                  <article
                    className={cn(
                      "relative grid grid-cols-1 items-center gap-6 pl-10 md:grid-cols-2 md:gap-x-12 md:pl-0",
                      !isEven && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1",
                    )}
                  >
                    <div className={cn("min-w-0", isEven ? "md:pr-10 md:text-right" : "md:pl-10")}>
                      <TimelineContent event={event} align={isEven ? "right" : "left"} />
                    </div>

                    <div className={cn("min-w-0", isEven ? "md:pl-10" : "md:pr-10")}>
                      <TimelineImage event={event} />
                    </div>

                    <TimelineDot className="absolute left-[1.125rem] top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2" />
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
