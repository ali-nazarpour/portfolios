import { motion } from 'framer-motion'
import { Link2, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { teamMembers } from '@/data/team'
import { SectionShell } from '@/components/ui/SectionShell'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function TeamSection() {
  const { t } = useTranslation()
  const leadership = teamMembers.filter((m) => m.leadership)
  const team = teamMembers.filter((m) => !m.leadership)

  return (
    <SectionShell>
      <ScrollReveal>
        <SectionHeading badge={t('home.team.badge')} title={t('home.team.title')} subtitle={t('home.team.subtitle')} />
      </ScrollReveal>

      <div className="mb-12">
        <h3 className="font-display text-xl font-semibold mb-6 text-center">{t('home.team.leadership')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.1} large />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-semibold mb-6 text-center">{t('home.team.members')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function TeamCard({ member, delay, large }: { member: typeof teamMembers[0]; delay: number; large?: boolean }) {
  return (
    <ScrollReveal delay={delay}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group rounded-2xl overflow-hidden glass-card hover:border-primary/30 transition-colors"
      >
        <div className={large ? 'aspect-[4/5] overflow-hidden' : 'aspect-square overflow-hidden'}>
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h4 className="font-display font-semibold text-lg">{member.name}</h4>
          <p className="text-sm text-primary mb-2">{member.role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
          <div className="flex gap-3">
            {member.linkedin && (
              <a href={member.linkedin} className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors" aria-label={`${member.name} LinkedIn`}>
                <Link2 className="h-4 w-4" />
              </a>
            )}
            {member.x && (
              <a href={member.x} className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors" aria-label={`${member.name} social profile`}>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}
