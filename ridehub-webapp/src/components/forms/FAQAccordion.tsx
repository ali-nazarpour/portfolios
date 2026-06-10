import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { faqItems, faqCategories } from '@/data/faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function FAQAccordion() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    return faqItems.filter((item) => {
      const matchCategory = category === 'all' || item.category === category
      const q = t(item.questionKey).toLowerCase()
      const a = t(item.answerKey).toLowerCase()
      const matchSearch = !search || q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [category, search, t])

  const tabs = [
    { id: 'all', label: t('gallery.all') },
    ...faqCategories.map((cat) => ({ id: cat, label: t(`faq.categories.${cat}`) })),
  ]

  return (
    <div>
      <div className="space-y-4 mb-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder={t('faq.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
            aria-label={t('faq.search')}
          />
        </div>

        <div className="w-full overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
          <div className="flex flex-nowrap gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategory(tab.id)}
                className={cn(
                  'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  category === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">{t('faq.noResults')}</p>
      ) : (
        <Accordion type="single" collapsible className="space-y-2">
          {filtered.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="rounded-xl border px-4 bg-card/50">
              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent>{t(item.answerKey)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="text-center mt-12 p-8 rounded-2xl gradient-bg">
        <h3 className="font-display text-xl font-bold mb-2">{t('faq.contactCta')}</h3>
        <Button asChild className="rounded-full mt-4">
          <Link to="/contact">{t('faq.contactBtn')}</Link>
        </Button>
      </div>
    </div>
  )
}
