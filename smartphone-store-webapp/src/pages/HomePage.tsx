import { useTranslation } from 'react-i18next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustedBySection } from '@/components/sections/TrustedBySection'
import { BrandShowcase } from '@/components/sections/BrandShowcase'
import { BentoGridSection } from '@/components/sections/BentoGridSection'
import { CinematicRevealSection } from '@/components/sections/CinematicRevealSection'
import { HorizontalScrollSection } from '@/components/sections/HorizontalScrollSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { ScrollStorySection } from '@/components/sections/ScrollStorySection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { InteractiveGallerySection } from '@/components/sections/InteractiveGallerySection'
import { CompanyTimelineSection } from '@/components/sections/CompanyTimelineSection'
import { AwardsSection } from '@/components/sections/AwardsSection'
import { BrandValuesSection } from '@/components/sections/BrandValuesSection'
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel'
import { TeamSection } from '@/components/sections/TeamSection'
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection'
import { SocialFeedSection } from '@/components/sections/SocialFeedSection'
import { FloatingCardsSection } from '@/components/sections/FloatingCardsSection'
import { FAQPreviewSection } from '@/components/sections/FAQPreviewSection'
import { PremiumCTASection } from '@/components/sections/PremiumCTASection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ProductGrid } from '@/components/products/ProductGrid'
import { getFeaturedProducts } from '@/data/products'

export function HomePage() {
  const { t } = useTranslation()
  const featured = getFeaturedProducts().slice(0, 4)

  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <BrandShowcase />
      <BentoGridSection />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading title={t('home.featuredTitle')} subtitle={t('home.featuredSubtitle')} />
          <ProductGrid products={featured} />
          <div className="text-center mt-10">
            <MagneticButton to="/products" variant="outline" size="lg">
              {t('nav.viewAll')}
            </MagneticButton>
          </div>
        </div>
      </section>

      <CinematicRevealSection />
      <HorizontalScrollSection />
      <StatsSection />
      <WhyChooseUsSection />
      <ScrollStorySection />
      <ProcessSection />
      <CaseStudiesSection />
      <InteractiveGallerySection />
      <CompanyTimelineSection />
      <AwardsSection />
      <BrandValuesSection />
      <TestimonialsCarousel />
      <TeamSection />
      <BlogPreviewSection />
      <SocialFeedSection />
      <FloatingCardsSection />
      <FAQPreviewSection />
      <PremiumCTASection />
    </>
  )
}
