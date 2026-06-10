import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hero3D } from "@/components/three/Hero3D";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MenuGrid } from "@/components/products/MenuGrid";
import { AssetImage } from "@/components/products/AssetImage";
import { Button } from "@/components/ui/button";
import { BentoGridSection } from "@/components/sections/BentoGridSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { CompanyTimelineSection } from "@/components/sections/CompanyTimelineSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { FAQPreviewSection } from "@/components/sections/FAQPreviewSection";
import { SocialFeedSection } from "@/components/sections/SocialFeedSection";
import { ScrollStorySection } from "@/components/sections/ScrollStorySection";
import { HorizontalScrollSection } from "@/components/sections/HorizontalScrollSection";
import { InteractiveGallerySection } from "@/components/sections/InteractiveGallerySection";
import { CinematicRevealSection } from "@/components/sections/CinematicRevealSection";
import { FloatingCardsSection } from "@/components/sections/FloatingCardsSection";
import { BrandValuesSection } from "@/components/sections/BrandValuesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PremiumCTASection } from "@/components/sections/PremiumCTASection";
import { menuItems, getFeaturedMenuItems } from "@/data/menu";
import { galleryImages } from "@/data/gallery";
import { faqItems } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { partners } from "@/data/partners";
import { achievementStats } from "@/data/achievements";
import { awardItems } from "@/data/awards";
import { whyChooseItems } from "@/data/whyChooseUs";
import { companyTimeline } from "@/data/timeline";
import { teamMembers } from "@/data/about";
import { getFeaturedPost, getRecentPosts } from "@/data/blog";
import { caseStudies } from "@/data/caseStudies";
import { socialPosts } from "@/data/socialFeed";
import { bentoItems } from "@/data/bento";
import { brandValues } from "@/data/brandValues";
import { processSteps } from "@/data/process";
import { floatingCards } from "@/data/floatingCards";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  const { t } = useTranslation();
  const ambianceRef = useRef<HTMLDivElement>(null);

  const featuredDishes = getFeaturedMenuItems()
    .filter((m) => ["breakfast", "main-courses", "desserts", "fine-dining"].includes(m.category))
    .slice(0, 3);

  const signatureDrinks = menuItems
    .filter((m) => ["coffee", "signature-drinks"].includes(m.category) && m.featured)
    .slice(0, 3);

  const chefPick = menuItems.find((m) => m.slug === "chefs-tasting-omakase")!;

  useEffect(() => {
    const el = ambianceRef.current;
    if (!el) return;
    gsap.to(el.querySelector(".parallax-img"), {
      yPercent: 20,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <>
      <Hero3D />

      <BentoGridSection items={bentoItems} />

      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl">{t("home.featuredDishes")}</h2>
              <p className="mt-3 text-muted-foreground">{t("home.featuredDishesDesc")}</p>
            </div>
          </ScrollReveal>
          <MenuGrid items={featuredDishes} />
        </div>
      </section>

      <CinematicRevealSection />

      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl">{t("home.signatureDrinks")}</h2>
              <p className="mt-3 text-muted-foreground">{t("home.signatureDrinksDesc")}</p>
            </div>
          </ScrollReveal>
          <MenuGrid items={signatureDrinks} />
        </div>
      </section>

      <HorizontalScrollSection />

      <TrustedBySection logos={partners} />

      <section ref={ambianceRef} className="relative min-h-[70vh] overflow-hidden">
        <AssetImage
          src="/assets/images/ambiance.jpg"
          alt=""
          className="parallax-img absolute inset-0 h-[120%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 flex min-h-[70vh] items-center section-padding">
          <ScrollReveal className="container-luxury max-w-2xl">
            <h2 className="font-serif text-4xl text-white md:text-5xl">{t("home.ambiance")}</h2>
            <p className="mt-4 text-lg text-white/80">{t("home.ambianceDesc")}</p>
            <Button asChild variant="outline" className="mt-8 border-white/30 text-white hover:bg-white/10">
              <Link to="/gallery">{t("nav.viewGallery")}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <WhyChooseUsSection items={whyChooseItems} />

      <section className="section-padding">
        <div className="container-luxury grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <AssetImage src={chefPick.image} alt={chefPick.name} className="rounded-2xl glow-gold" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-sm uppercase tracking-widest text-gold">{t("home.chefRec")}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{chefPick.name}</h2>
            <p className="mt-2 text-gold">{chefPick.tagline}</p>
            <p className="mt-4 text-muted-foreground">{chefPick.description}</p>
            <Button asChild className="mt-6">
              <Link to={`/menu/${chefPick.slug}`}>{t("menu.viewDetails")}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <StatsSection stats={achievementStats} />

      <TestimonialsCarousel testimonials={testimonials} />

      <ScrollStorySection />

      <CompanyTimelineSection events={companyTimeline} />

      <BrandValuesSection values={brandValues} />

      <ProcessSection steps={processSteps} />

      <TeamSection members={teamMembers} />

      <AwardsSection awards={awardItems} />

      <CaseStudiesSection studies={caseStudies} />

      <FloatingCardsSection cards={floatingCards} />

      <InteractiveGallerySection images={galleryImages} />

      <SocialFeedSection posts={socialPosts} />

      <BlogPreviewSection featured={getFeaturedPost()} recent={getRecentPosts()} />

      <FAQPreviewSection items={faqItems.slice(0, 6)} />

      <PremiumCTASection />
    </>
  );
}
