import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ContactForm() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  const schema = z.object({
    fullName: z.string().min(2, t('contact.validation.nameMin')),
    email: z.string().email(t('contact.validation.emailInvalid')),
    phone: z.string().min(1, t('contact.validation.phoneRequired')),
    company: z.string().optional(),
    interest: z.string().optional(),
    message: z.string().min(10, t('contact.validation.messageMin')),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">{t('contact.successTitle')}</h3>
        <p className="text-muted-foreground mb-6">{t('contact.successDesc')}</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          {t('contact.sendAnother')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-2xl p-6 md:p-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="fullName">{t('contact.fullName')}</Label>
          <Input id="fullName" {...register('fullName')} className="mt-1.5" />
          {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">{t('contact.emailLabel')}</Label>
          <Input id="email" type="email" {...register('email')} className="mt-1.5" />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">{t('contact.phoneLabel')}</Label>
          <Input id="phone" type="tel" {...register('phone')} className="mt-1.5" />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="company">{t('contact.company')}</Label>
          <Input id="company" {...register('company')} className="mt-1.5" />
        </div>
      </div>

      <div>
        <Label>{t('contact.interest')}</Label>
        <Select onValueChange={(v) => setValue('interest', v)}>
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder={t('contact.interestPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">{t('contact.interestApple')}</SelectItem>
            <SelectItem value="samsung">{t('contact.interestSamsung')}</SelectItem>
            <SelectItem value="xiaomi">{t('contact.interestXiaomi')}</SelectItem>
            <SelectItem value="business">{t('contact.interestBusiness')}</SelectItem>
            <SelectItem value="general">{t('contact.interestGeneral')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">{t('contact.message')}</Label>
        <Textarea
          id="message"
          placeholder={t('contact.messagePlaceholder')}
          {...register('message')}
          className="mt-1.5"
        />
        {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('contact.submitting')}
          </>
        ) : (
          t('contact.submit')
        )}
      </Button>
    </form>
  )
}
