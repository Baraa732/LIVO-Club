import {
  Home, Trophy, Gamepad2, Users, BarChart2,
  Info, Mail, Swords, Calendar, Crown,
  Image as ImageIcon, UserPlus, BookOpen,
  Target, Zap, Shield, MessageSquare,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface DropdownItem {
  label: string
  /** Must match an existing section id on the page e.g. "#tournament" */
  href: string
  icon: LucideIcon
  desc: string
  badge?: string
}

export interface NavItem {
  label: string
  /** Top-level href used when no dropdown, or as the default scroll target */
  href: string
  icon: LucideIcon
  dropdown?: DropdownItem[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '#home',
    icon: Home,
  },
  {
    label: 'Compete',
    href: '#tournament',
    icon: Trophy,
    dropdown: [
      { label: 'Tournaments',     href: '#tournament', icon: Swords,   desc: 'Live brackets & ongoing championships', badge: 'Live' },
      { label: 'Upcoming Events', href: '#events',     icon: Calendar,  desc: 'Register for the next battle'          },
      { label: 'Standings',       href: '#teams',      icon: BarChart2, desc: 'Team rankings & points table'          },
      { label: 'Champions',       href: '#champions',  icon: Crown,     desc: 'Hall of fame — past season winners'    },
    ],
  },
  {
    label: 'Games',
    href: '#games',
    icon: Gamepad2,
    dropdown: [
      { label: 'CS2',       href: '#games?game=cs2',       icon: Target,   desc: '5v5 tactical shooter — flagship title', badge: 'Hot' },
      { label: 'CS Source', href: '#games?game=cs-source',  icon: Zap,      desc: 'Classic FPS with deep mechanics'       },
      { label: 'Chess',     href: '#games?game=chess',      icon: Shield,   desc: 'Strategic 1v1 mind battles'            },
      { label: 'Ping Pong', href: '#games?game=ping-pong',  icon: Gamepad2, desc: 'Fast reflexes, weekly matches'         },
      { label: 'Football',  href: '#games?game=football',   icon: Users,    desc: '11v11 inter-department league'         },
      { label: 'Running',   href: '#games?game=running',    icon: Trophy,   desc: 'Campus sprint & endurance events'      },
    ],
  },
  {
    label: 'Community',
    href: '#teams',
    icon: Users,
    dropdown: [
      { label: 'Teams',   href: '#teams',   icon: Users,     desc: 'Browse all registered club teams'  },
      { label: 'Gallery', href: '#gallery', icon: ImageIcon, desc: 'Photos from events & tournaments'  },
      { label: 'Join Us', href: '#join',    icon: UserPlus,  desc: "Become a member — it's free",      badge: 'Free' },
    ],
  },
  {
    label: 'About',
    href: '#about',
    icon: Info,
    dropdown: [
      { label: 'About Club', href: '#about',   icon: Info,           desc: 'Our story, mission & values'   },
      { label: 'Rules',      href: '#rules',   icon: BookOpen,       desc: 'Club & tournament regulations' },
      { label: 'Contact',    href: '#contact', icon: MessageSquare,  desc: 'Get in touch with the team'    },
    ],
  },
]
