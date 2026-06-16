import { motion } from 'framer-motion'
import { Heart, Share2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { siteConfig } from '@/config/site'
import { socialPosts } from '@/data/socialFeed'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Button } from '@/components/ui/button'

export function SocialFeedSection() {
  const { t } = useTranslation()

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.social.badge')} title={t('home.social.title')} subtitle={t('home.social.subtitle')} />
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {socialPosts.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.06} className="min-w-0">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="group relative w-full rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-square w-full">
                <img src={post.image} alt={post.caption} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium line-clamp-2">{post.caption}</p>
                <span className="flex items-center gap-1 text-white/80 text-xs mt-1">
                  <Heart className="h-3 w-3 fill-current" /> {post.likes.toLocaleString()}
                </span>
              </div>
              {post.type === 'reel' && (
                <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-black/50 text-white">Reel</span>
              )}
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center mt-10">
        <Button asChild size="lg" className="rounded-full gap-2">
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
            <Share2 className="h-5 w-5" /> {t('home.social.follow')}
          </a>
        </Button>
      </div>
    </SectionShell>
  )
}
