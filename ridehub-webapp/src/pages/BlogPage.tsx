import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { PageWrapper } from '@/components/layout/Layout'
import { blogPosts } from '@/data/blog'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Badge } from '@/components/ui/badge'

export default function BlogPage() {
  const { t } = useTranslation()

  return (
    <PageWrapper>
      <PageHero title={t('home.blog.pageTitle')} subtitle={t('home.blog.pageSubtitle')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <Link to={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden glass-card hover:border-primary/30 transition-colors h-full">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
