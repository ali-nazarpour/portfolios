import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Clock } from 'lucide-react'
import { getPostBySlug } from '@/data/blog'
import { PageWrapper } from '@/components/layout/Layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/404" replace />

  return (
    <PageWrapper>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Button asChild variant="ghost" className="mb-8 -ml-2">
          <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> {t('home.blog.back')}</Link>
        </Button>

        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span>{post.author}</span>
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>

        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-10">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-foreground leading-relaxed">{post.content}</p>
        </div>
      </article>
    </PageWrapper>
  )
}
