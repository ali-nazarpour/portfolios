import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const brands = [
  {
    key: 'apple',
    labelKey: 'common.brandApple',
    image: '/assets/brands/apple.jpg',
    gradient: 'from-gray-600/80 to-gray-900/80',
  },
  {
    key: 'samsung',
    labelKey: 'common.brandSamsung',
    image: '/assets/brands/samsung.jpg',
    gradient: 'from-blue-600/80 to-blue-900/80',
  },
  {
    key: 'xiaomi',
    labelKey: 'common.brandXiaomi',
    image: '/assets/brands/xiaomi.jpg',
    gradient: 'from-orange-500/80 to-orange-900/80',
  },
]

export function BrandShowcase() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('home.brandsTitle')} subtitle={t('home.brandsSubtitle')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <ScrollReveal key={brand.key} delay={index * 0.15}>
              <Link to={`/products?brand=${brand.key}`} className="group block relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img
                  src={brand.image}
                  alt={t(brand.labelKey)}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${brand.gradient} opacity-60 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.h3
                    className="text-white text-2xl font-display font-semibold"
                    whileHover={{ x: 5 }}
                  >
                    {t(brand.labelKey)}
                  </motion.h3>
                  <span className="text-white/80 text-sm flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('nav.exploreBrand', { brand: t(brand.labelKey) })}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
