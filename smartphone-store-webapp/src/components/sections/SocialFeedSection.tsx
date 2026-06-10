import { useTranslation } from 'react-i18next'
import { Heart, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { socialPosts } from '@/data/socialFeed'
import { siteConfig } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function SocialFeedSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 premium-gradient-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('social.title')} subtitle={t('social.subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {socialPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`group relative rounded-2xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto md:min-h-[400px]' : 'aspect-square'
                }`}
              >
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100">
                  <div>
                    <p className="text-white text-sm line-clamp-2">{t(post.captionKey)}</p>
                    <span className="flex items-center gap-1 text-white/80 text-xs mt-2">
                      <Heart className="h-3 w-3 fill-white" /> {post.likes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
            <MagneticButton variant="premium" size="lg">
              <Instagram className="h-5 w-5" />
              {t('social.follow')}
            </MagneticButton>
          </a>
        </div>
      </div>
    </section>
  )
}
