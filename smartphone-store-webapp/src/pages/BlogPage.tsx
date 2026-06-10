import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'
import { blogArticles } from '@/data/blog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Badge } from '@/components/ui/badge'

export function BlogPage() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('blog.title')} subtitle={t('blog.pageSubtitle')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogArticles.map((article, index) => (
            <ScrollReveal key={article.slug} delay={index * 0.08}>
              <Link
                to={`/blog/${article.slug}`}
                className="group block glass rounded-2xl overflow-hidden hover:glow transition-shadow h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {t(article.categoryKey)}
                  </Badge>
                  <h2 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                    {t(article.titleKey)}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {t(article.excerptKey)}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min · {article.date}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
