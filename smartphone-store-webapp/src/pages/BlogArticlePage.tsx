import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Clock } from 'lucide-react'
import { getArticleBySlug } from '@/data/blog'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Badge } from '@/components/ui/badge'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) return <NotFoundPage />

  return (
    <article className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('blog.backToBlog')}
        </Link>

        <Badge className="mb-4">{t(article.categoryKey)}</Badge>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          {t(article.titleKey)}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 mb-8">
          <Clock className="h-4 w-4" />
          {article.readTime} min read · {article.date}
        </div>

        <div className="rounded-2xl overflow-hidden mb-10">
          <img src={article.image} alt="" className="w-full aspect-[16/9] object-cover" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.contentKeys.map((key) => (
            <p key={key} className="text-muted-foreground leading-relaxed mb-6">
              {t(key)}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <MagneticButton to="/contact" variant="premium" size="lg">
            {t('blog.contactCta')}
          </MagneticButton>
        </div>
      </div>
    </article>
  )
}
