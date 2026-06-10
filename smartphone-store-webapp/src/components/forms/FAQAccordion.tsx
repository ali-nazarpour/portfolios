import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqItems, type FAQCategory } from '@/data/faq'
import { cn } from '@/lib/utils'

const categories: FAQCategory[] = ['products', 'availability', 'warranty', 'business', 'support']

export function FAQAccordion() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<FAQCategory | 'all'>('all')

  const filtered = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const question = t(item.questionKey).toLowerCase()
    const answer = t(item.answerKey).toLowerCase()
    const matchesSearch = !search || question.includes(search.toLowerCase()) || answer.includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('faq.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
          )}
        >
          {t('gallery.filterAll')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'
            )}
          >
            {t(`faq.categories.${cat}`)}
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="max-w-3xl mx-auto">
        {filtered.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">{t(item.questionKey)}</AccordionTrigger>
            <AccordionContent>{t(item.answerKey)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">{t('products.noResults')}</p>
      )}
    </div>
  )
}
