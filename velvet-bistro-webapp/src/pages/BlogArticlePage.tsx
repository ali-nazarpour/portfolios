import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug } from "@/data/blog";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;

  return (
    <article className="pt-28">
      <div className="relative h-[40vh] min-h-[300px]">
        <AssetImage src={post.image} alt={post.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="section-padding">
        <div className="container-luxury mx-auto max-w-3xl">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("premium.blog.back")}
            </Link>
          </Button>

          <ScrollReveal>
            <span className="text-xs uppercase tracking-wider text-gold">{post.category}</span>
            <h1 className="mt-2 font-serif text-3xl md:text-5xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="prose prose-lg mt-10 space-y-6 dark:prose-invert">
              {post.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </article>
  );
}
