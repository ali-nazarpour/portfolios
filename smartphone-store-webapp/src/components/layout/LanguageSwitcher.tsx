import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <div className="flex items-center gap-1">
      <Globe className="h-4 w-4 text-muted-foreground hidden sm:block" />
      <Select value={i18n.language.split('-')[0]} onValueChange={(val) => i18n.changeLanguage(val)}>
        <SelectTrigger
          className="w-[110px] h-9 border-none bg-transparent shadow-none focus:ring-0"
          aria-label={t('common.toggleLanguage')}
        >
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
    </div>
  )
}
