import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { faqItems } from '@/data/faq'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const PREVIEW_COUNT = 5

export function FAQPreviewSection() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const items = faqItems.slice(0, PREVIEW_COUNT)
    if (!search) return items
    return faqItems.filter((item) => {
      const q = t(item.questionKey).toLowerCase()
      const a = t(item.answerKey).toLowerCase()
      return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
    }).slice(0, PREVIEW_COUNT)
  }, [search, t])

  return (
    <SectionShell variant="muted">
      <ScrollReveal>
        <SectionHeading badge={t('home.faq.badge')} title={t('home.faq.title')} subtitle={t('home.faq.subtitle')} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={t('faq.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
              aria-label={t('faq.search')}
            />
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {filtered.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="rounded-xl border px-4 glass-card">
                <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                  {t(item.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{t(item.answerKey)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="/faq">{t('home.faq.viewAll')}</Link>
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </SectionShell>
  )
}
