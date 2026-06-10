import { useTranslation } from "react-i18next";
import { Award, Sparkles, Heart } from "lucide-react";
import { teamMembers, awards } from "@/data/about";
import { achievementStats } from "@/data/achievements";
import { getMainBranch } from "@/data/branches";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatsSection } from "@/components/sections/StatsSection";
import { LeafletBranchMap } from "@/components/sections/LeafletBranchMap";

export function AboutPage() {
  const { t } = useTranslation();
  const mainBranch = getMainBranch();

  const whyUs = [
    { icon: Sparkles, title: t("about.whyUsItems.quality"), desc: t("about.whyUsItems.qualityDesc") },
    { icon: Heart, title: t("about.whyUsItems.ambiance"), desc: t("about.whyUsItems.ambianceDesc") },
    { icon: Award, title: t("about.whyUsItems.service"), desc: t("about.whyUsItems.serviceDesc") },
  ];

  return (
    <div className="pt-28">
      <section className="relative min-h-[50vh]">
        <AssetImage src="/assets/images/about-hero.jpg" alt="" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 flex min-h-[50vh] items-end section-padding pb-16">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-6xl">{t("about.title")}</h1>
            <p className="mt-3 max-w-xl text-lg text-muted-foreground">{t("about.subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury grid gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-gold">{t("about.mission")}</h2>
            <p className="mt-4 text-muted-foreground">{t("about.missionText")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-serif text-3xl text-gold">{t("about.vision")}</h2>
            <p className="mt-4 text-muted-foreground">{t("about.visionText")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-serif text-3xl">{t("about.team")}</h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 0.1}>
                <div className="text-center">
                  <AssetImage src={member.image} alt={member.name} className="mx-auto h-64 w-64 rounded-full object-cover ring-2 ring-gold/30" />
                  <h3 className="mt-4 font-serif text-xl">{member.name}</h3>
                  <p className="text-sm text-gold">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <StatsSection stats={achievementStats} />

      <section className="section-padding">
        <div className="container-luxury grid gap-6 lg:grid-cols-2">
          <AssetImage src="/assets/images/interior.jpg" alt="Interior" className="rounded-2xl" />
          <AssetImage src="/assets/images/dining.jpg" alt="Dining" className="rounded-2xl" />
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="mb-8 text-center font-serif text-3xl">{t("about.awards")}</h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award, i) => (
              <ScrollReveal key={award} delay={i * 0.1}>
                <div className="glass flex items-center gap-3 rounded-xl border border-border/50 p-4">
                  <Award className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm">{award}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="mb-12 text-center font-serif text-3xl">{t("about.whyUs")}</h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            {whyUs.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="glass rounded-2xl border border-border/50 p-8 text-center">
                  <item.icon className="mx-auto h-10 w-10 text-gold" />
                  <h3 className="mt-4 font-serif text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="mb-8 font-serif text-3xl">{t("about.location")}</h2>
          </ScrollReveal>
          <LeafletBranchMap branches={[mainBranch]} zoom={14} center={[mainBranch.lat, mainBranch.lng]} height="450px" />
        </div>
      </section>
    </div>
  );
}
