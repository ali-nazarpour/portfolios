import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { siteConfig, navLinks, megaMenuCategories } from "@/config/site";
import { socialLinks } from "@/config/social";

const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  whatsapp: MessageCircle,
  x: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
};

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="section-padding container-luxury">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl text-gradient-gold">Velvet Bistro</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.platform];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:border-gold hover:text-gold"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-gold">
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/branches" className="text-sm text-muted-foreground hover:text-gold">
                  {t("nav.branches")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("footer.categories")}
            </h4>
            <ul className="space-y-2">
              {megaMenuCategories.map((cat) => (
                <li key={cat.key}>
                  <Link to={cat.path} className="text-sm text-muted-foreground hover:text-gold">
                    {t(`categories.${cat.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.address}</li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">{siteConfig.phone}</a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a>
              </li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} Velvet Bistro. {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <span>{t("footer.privacy")}</span>
            <span>{t("footer.terms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
