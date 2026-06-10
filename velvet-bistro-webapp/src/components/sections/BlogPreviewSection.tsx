import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { BlogPost } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

interface BlogPreviewSectionProps {
  featured: BlogPost;
  recent: BlogPost[];
}

export function BlogPreviewSection({ featured, recent }: BlogPreviewSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold">{t("premium.blog.eyebrow")}</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.blog.title")}</h2>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/blog">{t("home.viewAll")} →</Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <motion.div whileHover={{ y: -4 }} className="group overflow-hidden rounded-2xl border border-border/50">
              <Link to={`/blog/${featured.slug}`} className="block">
                <div className="relative h-64 overflow-hidden md:h-80">
                  <AssetImage
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-medium text-charcoal">
                    {t("premium.blog.featured")}
                  </span>
                </div>
                <div className="glass p-6">
                  <span className="text-xs uppercase tracking-wider text-gold">{featured.category}</span>
                  <h3 className="mt-2 font-serif text-2xl group-hover:text-gold">{featured.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {recent.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.08}>
                <motion.div whileHover={{ x: 4 }} className="group">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="glass flex gap-4 rounded-xl border border-border/50 p-4 transition hover:border-gold/30"
                  >
                    <AssetImage
                      src={post.image}
                      alt={post.title}
                      className="h-24 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs uppercase tracking-wider text-gold">{post.category}</span>
                      <h4 className="mt-1 font-serif text-lg group-hover:text-gold">{post.title}</h4>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{post.excerpt}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-gold">
                        {t("common.readMore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
