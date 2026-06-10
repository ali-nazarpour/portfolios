export type FAQCategory = 'products' | 'availability' | 'warranty' | 'business' | 'support'

export interface FAQItem {
  id: string
  category: FAQCategory
  questionKey: string
  answerKey: string
}

export const faqItems: FAQItem[] = [
  { id: '1', category: 'products', questionKey: 'faq.q1', answerKey: 'faq.a1' },
  { id: '2', category: 'products', questionKey: 'faq.q2', answerKey: 'faq.a2' },
  { id: '3', category: 'products', questionKey: 'faq.q3', answerKey: 'faq.a3' },
  { id: '4', category: 'availability', questionKey: 'faq.q4', answerKey: 'faq.a4' },
  { id: '5', category: 'availability', questionKey: 'faq.q5', answerKey: 'faq.a5' },
  { id: '6', category: 'availability', questionKey: 'faq.q6', answerKey: 'faq.a6' },
  { id: '7', category: 'warranty', questionKey: 'faq.q7', answerKey: 'faq.a7' },
  { id: '8', category: 'warranty', questionKey: 'faq.q8', answerKey: 'faq.a8' },
  { id: '9', category: 'business', questionKey: 'faq.q9', answerKey: 'faq.a9' },
  { id: '10', category: 'business', questionKey: 'faq.q10', answerKey: 'faq.a10' },
  { id: '11', category: 'support', questionKey: 'faq.q11', answerKey: 'faq.a11' },
  { id: '12', category: 'support', questionKey: 'faq.q12', answerKey: 'faq.a12' },
]
