import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { getFeaturedArticle, getRecentArticles } from '@/data/blog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function BlogPreviewSection() {
  const { t } = useTranslation()
  const featured = getFeaturedArticle()
  const recent = getRecentArticles(3)

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('blog.title')} subtitle={t('blog.subtitle')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <ScrollReveal>
            <Link to={`/blog/${featured.slug}`} className="group block relative rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px]">
              <img
                src={featured.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <Badge className="mb-3">{t(featured.categoryKey)}</Badge>
                <h3 className="text-white text-2xl md:text-3xl font-display font-semibold mb-3 group-hover:text-primary-foreground transition-colors">
                  {t(featured.titleKey)}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">{t(featured.excerptKey)}</p>
                <span className="inline-flex items-center gap-1 text-white text-sm font-medium">
                  {t('common.readMore')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {recent.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 0.1}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="group flex gap-4 glass rounded-2xl p-4 hover:glow transition-shadow"
                >
                  <img
                    src={article.image}
                    alt=""
                    className="w-24 h-24 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <Badge variant="secondary" className="w-fit mb-2 text-xs">
                      {t(article.categoryKey)}
                    </Badge>
                    <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {t(article.titleKey)}
                    </h4>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      {article.readTime} min · {article.date}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div className="text-center">
          <MagneticButton to="/blog" variant="outline" size="lg">
            {t('blog.viewAll')}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
