import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Linkedin } from 'lucide-react'
import { teamMembers } from '@/data/team'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function TeamSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 md:py-28 premium-gradient-bg">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading title={t('team.title')} subtitle={t('team.subtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={member.id} delay={index * 0.1}>
              <motion.div whileHover={{ y: -8 }} className="group glass rounded-2xl overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        aria-label={`${t(member.nameKey)} LinkedIn`}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{t(member.nameKey)}</h3>
                  <p className="text-sm text-primary mb-2">{t(member.roleKey)}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{t(member.bioKey)}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/about" className="text-sm text-primary hover:underline font-medium">
            {t('team.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  )
}
