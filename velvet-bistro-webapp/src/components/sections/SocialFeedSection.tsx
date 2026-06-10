import { motion } from "framer-motion";
import { Heart, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SocialPost } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/config/social";

interface SocialFeedSectionProps {
  posts: SocialPost[];
}

export function SocialFeedSection({ posts }: SocialFeedSectionProps) {
  const { t } = useTranslation();
  const instagram = socialLinks.find((s) => s.platform === "instagram");

  return (
    <section className="section-padding">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold">{t("premium.social.eyebrow")}</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.social.title")}</h2>
            </div>
            {instagram && (
              <Button asChild variant="outline">
                <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-4 w-4" />
                  {t("premium.social.follow")}
                </a>
              </Button>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border/50"
              >
                <AssetImage
                  src={post.image}
                  alt={post.caption}
                  className="h-full w-full transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="line-clamp-2 text-xs text-white/90">{post.caption}</p>
                  <span className="mt-1 flex items-center gap-1 text-xs text-white/70">
                    <Heart className="h-3 w-3 fill-current" />
                    {post.likes.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
