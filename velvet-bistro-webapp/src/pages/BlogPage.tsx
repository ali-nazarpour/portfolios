import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl">{t("premium.blog.pageTitle")}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t("premium.blog.pageSubtitle")}</p>
          </ScrollReveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group glass block overflow-hidden rounded-2xl border border-border/50 transition hover:border-gold/30 hover:glow-gold"
                >
                  <div className="relative h-48 overflow-hidden">
                    <AssetImage
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full transition duration-700 group-hover:scale-105"
                    />
                    {post.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-gold px-2 py-0.5 text-xs text-charcoal">
                        {t("premium.blog.featured")}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-wider text-gold">{post.category}</span>
                    <h2 className="mt-2 font-serif text-xl group-hover:text-gold">{post.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
