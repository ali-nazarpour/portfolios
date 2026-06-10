import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqItems } from '@/data/faq'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

const previewItems = faqItems.slice(0, 5)

export function FAQPreviewSection() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')

  const filtered = previewItems.filter((item) => {
    const q = t(item.questionKey).toLowerCase()
    const a = t(item.answerKey).toLowerCase()
    return !search || q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
  })

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('faqPreview.title')} subtitle={t('faqPreview.subtitle')} />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('faq.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 glass"
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {filtered.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="glass rounded-xl mb-3 px-4 border-none">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t(item.questionKey)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(item.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">{t('products.noResults')}</p>
          )}

          <div className="text-center mt-10">
            <MagneticButton to="/faq" variant="outline" size="lg">
              {t('faqPreview.viewAll')}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
