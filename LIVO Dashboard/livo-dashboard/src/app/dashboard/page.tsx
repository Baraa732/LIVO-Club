'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { PageHeader } from '@/components/ui'
import styles from './overview.module.scss'
import uiStyles from '@/components/ui.module.scss'
import { Calendar, Gamepad2, Users, Crown, Image, ChevronRight, Zap, Info, BookOpen, Trophy, Target } from 'lucide-react'
import Link from 'next/link'

export default function DashboardOverview() {
  const [counts, setCounts] = useState({ events: 0, games: 0, teams: 0, champions: 0, gallery: 0 })

  useEffect(() => {
    Promise.all([
      api.events.get().then((d: unknown) => (d as unknown[]).length),
      api.games.get().then((d: unknown) => (d as unknown[]).length),
      api.teams.get().then((d: unknown) => (d as unknown[]).length),
      api.champions.get().then((d: unknown) => (d as unknown[]).length),
      api.gallery.get().then((d: unknown) => (d as unknown[]).length),
    ]).then(([events, games, teams, champions, gallery]) => setCounts({ events, games, teams, champions, gallery }))
  }, [])

  const stats = [
    { label: 'Events', value: counts.events, icon: Calendar, href: '/dashboard/events', color: '#FF6B35' },
    { label: 'Games', value: counts.games, icon: Gamepad2, href: '/dashboard/games', color: '#00E6FF' },
    { label: 'Teams', value: counts.teams, icon: Users, href: '/dashboard/teams', color: '#19E28F' },
    { label: 'Champions', value: counts.champions, icon: Crown, href: '/dashboard/champions', color: '#FFB020' },
    { label: 'Gallery', value: counts.gallery, icon: Image, href: '/dashboard/gallery', color: '#7A3CFF' },
  ]

  const sections = [
    { href: '/dashboard/hero', label: 'Hero Section', desc: 'Edit headline, stats and CTA', icon: Zap, color: '#00E6FF' },
    { href: '/dashboard/about', label: 'About Section', desc: 'Edit pillars and description', icon: Info, color: '#7A3CFF' },
    { href: '/dashboard/events', label: 'Events', desc: 'Add, edit, delete events', icon: Calendar, color: '#FF6B35' },
    { href: '/dashboard/games', label: 'Games', desc: 'Manage all game disciplines', icon: Gamepad2, color: '#00E6FF' },
    { href: '/dashboard/teams', label: 'Teams & Rankings', desc: 'Update standings and scores', icon: Users, color: '#19E28F' },
    { href: '/dashboard/champions', label: 'Champions', desc: 'Hall of fame management', icon: Crown, color: '#FFB020' },
    { href: '/dashboard/gallery', label: 'Gallery', desc: 'Manage gallery items', icon: Image, color: '#7A3CFF' },
    { href: '/dashboard/rules', label: 'Rules', desc: 'Edit club rules and regulations', icon: BookOpen, color: '#FF4D6D' },
    { href: '/dashboard/tournament', label: 'Tournament', desc: 'Bracket, standings, rules', icon: Trophy, color: '#FFB020' },
    { href: '/dashboard/cta', label: 'CTA / Join', desc: 'Edit join section content', icon: Target, color: '#19E28F' },
  ]

  return (
    <div>
      <PageHeader title="Dashboard Overview" desc="Manage all sections of the LIVO Club website" />

      <div className={styles.statsGrid}>
        {stats.map(({ label, value, icon: Icon, href, color }, i) => (
          <Link key={label} href={href} style={{ textDecoration: 'none', animationDelay: `${i * 0.06}s` }}>
            <div className={uiStyles.statCard} style={{ '--accent': color } as React.CSSProperties}>
              <div className={uiStyles.statIcon} style={{ background: `${color}14`, borderColor: `${color}30`, color }}>
                <Icon size={20} />
              </div>
              <div className={uiStyles.statValue} style={{ color }}>{value}</div>
              <div className={uiStyles.statLabel}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.sectionTitle}>All Sections</div>
      <div className={styles.linksGrid}>
        {sections.map(({ href, label, desc, icon: Icon, color }, i) => (
          <Link key={href} href={href} className={uiStyles.quickLink} style={{ animationDelay: `${i * 0.04}s` }}>
            <div className={uiStyles.quickLinkLeft}>
              <div className={uiStyles.quickLinkIcon} style={{ background: `${color}14`, borderColor: `${color}30`, color }}>
                <Icon size={16} />
              </div>
              <div>
                <div className={uiStyles.quickLinkTitle}>{label}</div>
                <div className={uiStyles.quickLinkDesc}>{desc}</div>
              </div>
            </div>
            <ChevronRight size={16} style={{ color: '#4a5568', flexShrink: 0 }} />
          </Link>
        ))}
      </div>
    </div>
  )
}
