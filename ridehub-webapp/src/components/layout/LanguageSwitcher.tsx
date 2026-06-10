import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { languages } from '@/config/site'
import type { Language } from '@/types/product'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (value: string) => {
    i18n.changeLanguage(value)
    localStorage.setItem('ridehub-lang', value)
    document.documentElement.lang = value
  }

  return (
    <Select value={i18n.language} onValueChange={handleChange}>
      <SelectTrigger className="w-[130px] h-9 border-none bg-transparent shadow-none gap-1" aria-label="Select language">
        <Globe className="h-4 w-4 shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type { Language }
