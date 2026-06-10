import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
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
  const [sending, setSending] = useState(false)

  const schema = z.object({
    name: z.string().min(1, t('contact.errors.nameRequired')),
    email: z.string().email(t('contact.errors.emailInvalid')),
    phone: z.string().min(1, t('contact.errors.phoneRequired')),
    interest: z.string().min(1, t('contact.errors.interestRequired')),
    message: z.string().min(10, t('contact.errors.messageMin')),
  })

  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { interest: '' },
  })

  const interest = watch('interest')

  const onSubmit = async (data: FormData) => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    console.log('Contact form submitted:', data)
    setSending(false)
    setSubmitted(true)
    reset()
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-12 px-6 rounded-2xl glass"
        >
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold mb-2">{t('contact.successTitle')}</h3>
          <p className="text-muted-foreground mb-6">{t('contact.successMessage')}</p>
          <Button onClick={() => setSubmitted(false)} variant="outline">
            {t('contact.sendAnother')}
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 md:p-8 rounded-2xl glass"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t('contact.name')}</Label>
              <Input id="name" placeholder={t('contact.namePlaceholder')} {...register('name')} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('contact.emailLabel')}</Label>
              <Input id="email" type="email" placeholder={t('contact.emailPlaceholder')} {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('contact.phoneLabel')}</Label>
              <Input id="phone" placeholder={t('contact.phonePlaceholder')} {...register('phone')} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>{t('contact.interest')}</Label>
              <Select value={interest} onValueChange={(v) => setValue('interest', v, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('contact.interestPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bicycle">{t('products.bicycle')}</SelectItem>
                  <SelectItem value="scooter">{t('products.scooter')}</SelectItem>
                  <SelectItem value="motorcycle">{t('products.motorcycle')}</SelectItem>
                  <SelectItem value="general">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
              {errors.interest && <p className="text-sm text-destructive">{errors.interest.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('contact.message')}</Label>
            <Textarea id="message" placeholder={t('contact.messagePlaceholder')} {...register('message')} />
            {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto rounded-full px-8" disabled={sending}>
            {sending ? t('contact.sending') : t('contact.submit')}
            {!sending && <Send className="h-4 w-4" />}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
