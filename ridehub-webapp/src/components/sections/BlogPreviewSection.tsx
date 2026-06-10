import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getFeaturedPost, getRecentPosts } from '@/data/blog'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function BlogPreviewSection() {
  const { t } = useTranslation()
  const featured = getFeaturedPost()
  const recent = getRecentPosts(3)

  return (
    <SectionShell variant="muted">
      <ScrollReveal>
        <SectionHeading badge={t('home.blog.badge')} title={t('home.blog.title')} subtitle={t('home.blog.subtitle')} />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ScrollReveal>
          <motion.div whileHover={{ y: -4 }} className="group rounded-2xl overflow-hidden glass-card h-full">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-6 md:p-8">
              <Badge className="mb-3">{featured.category}</Badge>
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{featured.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{featured.author}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readTime}</span>
              </div>
              <Button asChild variant="ghost" className="group/btn p-0 h-auto font-semibold text-primary">
                <Link to={`/blog/${featured.slug}`}>
                  {t('home.blog.readMore')} <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {recent.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.1}>
              <motion.article whileHover={{ x: 4 }} className="group flex gap-4 p-4 rounded-2xl glass-card hover:border-primary/20 transition-colors">
                <img src={post.image} alt={post.title} className="w-24 h-24 rounded-xl object-cover shrink-0" loading="lazy" />
                <div className="min-w-0">
                  <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                  <h4 className="font-display font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{post.date} · {post.readTime}</p>
                  <Link to={`/blog/${post.slug}`} className="text-sm font-medium text-primary hover:underline">{t('home.blog.readMore')}</Link>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/blog">{t('home.blog.viewAll')}</Link>
        </Button>
      </div>
    </SectionShell>
  )
}
