import { useTranslation } from "react-i18next";
import type { FAQItem } from "@/types/product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqCategories } from "@/data/faq";

interface FAQAccordionProps {
  items: FAQItem[];
  showCategories?: boolean;
  defaultCategory?: string;
}

export function FAQAccordion({
  items,
  showCategories = true,
  defaultCategory = "menu",
}: FAQAccordionProps) {
  const { t } = useTranslation();

  if (!showCategories) {
    return (
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Tabs defaultValue={defaultCategory}>
      <TabsList className="mb-6 flex h-auto flex-wrap gap-1">
        {faqCategories.map((cat) => (
          <TabsTrigger key={cat} value={cat}>
            {t(`faq.categories.${cat}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      {faqCategories.map((cat) => (
        <TabsContent key={cat} value={cat}>
          <Accordion type="single" collapsible>
            {items
              .filter((item) => item.category === cat)
              .map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
