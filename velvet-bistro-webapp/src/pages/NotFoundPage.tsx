import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-28 text-center">
      <p className="font-serif text-8xl font-bold text-gold/30">404</p>
      <h1 className="mt-4 font-serif text-3xl">{t("notFound.title")}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t("notFound.desc")}</p>
      <Button asChild className="mt-8">
        <Link to="/">{t("notFound.back")}</Link>
      </Button>
    </div>
  );
}
