import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Branch } from "@/types/product";
import { AssetImage } from "@/components/products/AssetImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useTranslation } from "react-i18next";

interface BranchCardProps {
  branch: Branch;
  index?: number;
}

export function BranchCard({ branch, index = 0 }: BranchCardProps) {
  const { t } = useTranslation();

  return (
    <ScrollReveal delay={index * 0.1}>
      <article className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5">
        <div className="relative aspect-[16/10] overflow-hidden">
          <AssetImage
            src={branch.image}
            alt={branch.name}
            className="h-full w-full transition duration-700 group-hover:scale-105"
          />
          {branch.isMain && (
            <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-charcoal">
              Flagship
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl">{branch.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{branch.city}, {branch.country}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{branch.address}, {branch.city}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${branch.phone}`} className="hover:text-gold">{branch.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${branch.email}`} className="hover:text-gold">{branch.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{branch.hours}</span>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-medium text-gold hover:underline"
          >
            {t("branches.directions")} →
          </a>
        </div>
      </article>
    </ScrollReveal>
  );
}
