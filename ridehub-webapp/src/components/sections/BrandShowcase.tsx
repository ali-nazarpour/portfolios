import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brands } from '@/data/products'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BrandShowcase() {
  const { t } = useTranslation()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 w-full">
        <ScrollReveal>
          <SectionHeading title={t('brands.title')} subtitle={t('brands.subtitle')} />
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Link
                to={`/products?brand=${brand.name}`}
                className="flex flex-col items-center p-6 rounded-2xl glass hover:border-primary/30 border border-transparent transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <img src={brand.logo} alt={brand.name} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-1">{brand.name}</h3>
                <p className="text-xs text-muted-foreground text-center line-clamp-2">{brand.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
