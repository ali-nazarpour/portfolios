import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Bike, Zap, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const cards = [
  { id: '1', icon: Bike, titleKey: 'home.floating.performance', descKey: 'home.floating.performanceDesc', depth: 20 },
  { id: '2', icon: Zap, titleKey: 'home.floating.electric', descKey: 'home.floating.electricDesc', depth: 35 },
  { id: '3', icon: MapPin, titleKey: 'home.floating.local', descKey: 'home.floating.localDesc', depth: 15 },
]

export function FloatingCardsSection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    })
  }

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.floating.badge')} title={t('home.floating.title')} subtitle={t('home.floating.subtitle')} />
      </ScrollReveal>

      <div
        ref={containerRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[400px] perspective-1000"
      >
        {cards.map((card, i) => {
          const Icon = card.icon
          const offsetX = reduced ? 0 : mouse.x * card.depth
          const offsetY = reduced ? 0 : mouse.y * card.depth
          const rotateY = reduced ? 0 : mouse.x * 8
          const rotateX = reduced ? 0 : -mouse.y * 8

          return (
            <ScrollReveal key={card.id} delay={i * 0.12}>
              <motion.div
                animate={{ x: offsetX, y: offsetY, rotateY, rotateX }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                style={{ transformStyle: 'preserve-3d', animationDelay: `${i * 0.5}s` }}
                className={`w-full md:w-72 p-8 rounded-2xl glass-card hover:border-primary/30 transition-colors animate-float ${i === 1 ? 'md:-mt-8' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{t(card.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
              </motion.div>
            </ScrollReveal>
          )
        })}
      </div>
    </SectionShell>
  )
}
