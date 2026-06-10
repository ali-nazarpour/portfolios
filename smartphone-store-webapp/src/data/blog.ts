export type BlogCategory = 'flagships' | 'enterprise' | 'guides' | 'industry'

export interface BlogArticle {
  slug: string
  titleKey: string
  excerptKey: string
  category: BlogCategory
  categoryKey: string
  date: string
  readTime: number
  image: string
  featured?: boolean
  contentKeys: string[]
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'iphone-16-pro-enterprise-guide',
    titleKey: 'blog.a1Title',
    excerptKey: 'blog.a1Excerpt',
    category: 'enterprise',
    categoryKey: 'blog.catEnterprise',
    date: '2025-05-12',
    readTime: 8,
    image: '/assets/products/apple-iphone-16-pro.jpg',
    featured: true,
    contentKeys: ['blog.a1P1', 'blog.a1P2', 'blog.a1P3'],
  },
  {
    slug: 'galaxy-s25-ultra-camera-workflow',
    titleKey: 'blog.a2Title',
    excerptKey: 'blog.a2Excerpt',
    category: 'flagships',
    categoryKey: 'blog.catFlagships',
    date: '2025-04-28',
    readTime: 6,
    image: '/assets/products/samsung-galaxy-s25-ultra.jpg',
    contentKeys: ['blog.a2P1', 'blog.a2P2'],
  },
  {
    slug: 'xiaomi-15-ultra-value-proposition',
    titleKey: 'blog.a3Title',
    excerptKey: 'blog.a3Excerpt',
    category: 'flagships',
    categoryKey: 'blog.catFlagships',
    date: '2025-04-15',
    readTime: 5,
    image: '/assets/products/xiaomi-15-ultra.jpg',
    contentKeys: ['blog.a3P1', 'blog.a3P2'],
  },
  {
    slug: 'mdm-deployment-best-practices',
    titleKey: 'blog.a4Title',
    excerptKey: 'blog.a4Excerpt',
    category: 'guides',
    categoryKey: 'blog.catGuides',
    date: '2025-03-22',
    readTime: 10,
    image: '/assets/images/technology.jpg',
    contentKeys: ['blog.a4P1', 'blog.a4P2', 'blog.a4P3'],
  },
  {
    slug: 'mobile-trends-2025',
    titleKey: 'blog.a5Title',
    excerptKey: 'blog.a5Excerpt',
    category: 'industry',
    categoryKey: 'blog.catIndustry',
    date: '2025-03-01',
    readTime: 7,
    image: '/assets/images/retail.jpg',
    contentKeys: ['blog.a5P1', 'blog.a5P2'],
  },
]

export function getFeaturedArticle(): BlogArticle {
  return blogArticles.find((a) => a.featured) ?? blogArticles[0]
}

export function getRecentArticles(limit = 3): BlogArticle[] {
  return blogArticles.filter((a) => !a.featured).slice(0, limit)
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug)
}
