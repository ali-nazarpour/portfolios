import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import { branches } from "@/data/branches";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(6, "Phone is required"),
  branch: z.string().min(1, "Select a branch"),
  occasion: z.string().min(1, "Select an occasion"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { branch: "", occasion: "" },
  });

  const branch = watch("branch");
  const occasion = watch("occasion");

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 p-12 text-center">
        <CheckCircle className="h-16 w-16 text-gold" />
        <h3 className="mt-4 font-serif text-2xl">{t("contact.successTitle")}</h3>
        <p className="mt-2 max-w-md text-muted-foreground">{t("contact.successDesc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">{t("contact.fullName")}</Label>
          <Input id="fullName" {...register("fullName")} className="mt-2" />
          {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">{t("contact.emailField")}</Label>
          <Input id="email" type="email" {...register("email")} className="mt-2" />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">{t("contact.phoneField")}</Label>
          <Input id="phone" {...register("phone")} className="mt-2" />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
        <div>
          <Label>{t("contact.branch")}</Label>
          <Select value={branch} onValueChange={(v) => setValue("branch", v, { shouldValidate: true })}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder={t("contact.selectBranch")} />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.branch && <p className="mt-1 text-xs text-red-400">{errors.branch.message}</p>}
        </div>
      </div>
      <div>
        <Label>{t("contact.occasion")}</Label>
        <Select value={occasion} onValueChange={(v) => setValue("occasion", v, { shouldValidate: true })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder={t("contact.selectOccasion")} />
          </SelectTrigger>
          <SelectContent>
            {(["dining", "celebration", "corporate", "inquiry", "feedback"] as const).map((o) => (
              <SelectItem key={o} value={o}>{t(`contact.occasions.${o}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.occasion && <p className="mt-1 text-xs text-red-400">{errors.occasion.message}</p>}
      </div>
      <div>
        <Label htmlFor="message">{t("contact.message")}</Label>
        <textarea
          id="message"
          {...register("message")}
          rows={5}
          className="mt-2 flex w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("common.loading") : t("contact.submit")}
      </Button>
    </form>
  );
}
