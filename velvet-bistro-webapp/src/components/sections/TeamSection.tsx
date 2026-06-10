import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TeamMember } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-luxury">
        <ScrollReveal>
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-sm uppercase tracking-widest text-gold">{t("premium.team.eyebrow")}</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{t("premium.team.title")}</h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/about">{t("home.learnMore")}</Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {members.map((member, i) => (
            <ScrollReveal key={member.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group glass overflow-hidden rounded-2xl border border-border/50 text-center glow-gold"
              >
                <div className="relative overflow-hidden">
                  <AssetImage
                    src={member.image}
                    alt={member.name}
                    className="h-72 w-full transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {member.social && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {member.social.map((s) => (
                        <a
                          key={s.platform}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition hover:bg-gold/30"
                          aria-label={s.platform}
                        >
                          {s.platform === "instagram" ? (
                            <Instagram className="h-4 w-4 text-white" />
                          ) : s.platform === "linkedin" ? (
                            <Linkedin className="h-4 w-4 text-white" />
                          ) : (
                            <Twitter className="h-4 w-4 text-white" />
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl">{member.name}</h3>
                  <p className="text-sm text-gold">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
