import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { floatingCards } from '@/data/premiumContent'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FloatingCardsSection() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('floating.title')} subtitle={t('floating.subtitle')} />

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px]"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-full max-w-3xl h-full"
          >
            {floatingCards.map((card, index) => {
              const positions = [
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30',
                'top-[15%] left-[10%] z-20',
                'top-[20%] right-[5%] z-10',
                'bottom-[10%] left-[20%] z-20',
              ]
              return (
                <motion.div
                  key={card.id}
                  className={`absolute w-56 md:w-64 glass rounded-2xl p-5 glow ${positions[index]}`}
                  animate={{ y: [0, -10 * card.depth, 0] }}
                  transition={{
                    duration: 3 + card.depth,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.5,
                  }}
                  style={{
                    transform: `translateZ(${card.depth * 20}px)`,
                  }}
                >
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{t(card.titleKey)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(card.descKey)}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
