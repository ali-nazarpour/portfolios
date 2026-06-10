import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { bentoItems } from '@/data/premiumContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function BentoGridSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('bento.title')} subtitle={t('bento.subtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[160px] gap-4">
          {bentoItems.map((item, index) => {
            const content = (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={`group relative rounded-2xl overflow-hidden glass h-full p-6 flex flex-col justify-end ${item.className}`}
              >
                {item.image && (
                  <>
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                  </>
                )}
                <div className="relative z-10">
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t(item.descKey)}</p>
                  {item.link && (
                    <ArrowUpRight className="h-4 w-4 text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </motion.div>
            )

            return (
              <ScrollReveal key={item.id} delay={index * 0.05} className={item.className}>
                {item.link ? <Link to={item.link} className="block h-full">{content}</Link> : content}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
