'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Zap, Info, Calendar, Gamepad2,
  Users, Crown, Image, BookOpen, Trophy, Target, ChevronRight, Gauge, LogOut
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { clearToken } from '@/lib/api'
import styles from './Sidebar.module.scss'

const nav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/hero', label: 'Hero', icon: Zap },
  { href: '/dashboard/about', label: 'About', icon: Info },
  { href: '/dashboard/events', label: 'Events', icon: Calendar },
  { href: '/dashboard/games', label: 'Games', icon: Gamepad2 },
  { href: '/dashboard/teams', label: 'Teams', icon: Users },
  { href: '/dashboard/champions', label: 'Champions', icon: Crown },
  { href: '/dashboard/gallery', label: 'Gallery', icon: Image },
  { href: '/dashboard/rules', label: 'Rules', icon: BookOpen },
  { href: '/dashboard/tournament', label: 'Tournament', icon: Trophy },
  { href: '/dashboard/cta', label: 'CTA / Join', icon: Target },
]

export default function Sidebar() {
  const path = usePathname()
  const router = useRouter()

  function logout() {
    clearToken()
    router.push('/login')
  }
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandLogo}>
          <div className={styles.brandIcon}><Gauge size={18} /></div>
          <span className={styles.brandName}>LIVO</span>
        </div>
        <div className={styles.brandSub}>Dashboard</div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Navigation</div>
        {nav.map(({ href, label, icon: Icon }) => {
          const active = path === href
          return (
            <Link key={href} href={href} className={`${styles.navItem} ${active ? styles.active : ''}`}>
              <span className={styles.navIcon}><Icon size={15} /></span>
              <span className={styles.navText}>{label}</span>
              <ChevronRight size={13} className={styles.navArrow} />
            </Link>
          )
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.statusDot}>System Online</div>
        <button onClick={logout} className={styles.logoutBtn}>
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  )
}
