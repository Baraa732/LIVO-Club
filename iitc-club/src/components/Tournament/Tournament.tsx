'use client'
import { useState } from 'react'
import { Zap, Users, Swords, BarChart2, BookOpen, Calendar, Trophy, Shield } from 'lucide-react'
import styles from './Tournament.module.scss'
import { TOURNAMENT_META, BRACKET, STANDINGS, RULES } from './data'
import BracketView from './BracketView'
import StandingsView from './StandingsView'
import RulesView from './RulesView'

const TABS = [
  { id: 'overview',   label: 'Bracket',    icon: Swords    },
  { id: 'standings',  label: 'Standings',  icon: BarChart2 },
  { id: 'rules',      label: 'Rules',      icon: BookOpen  },
] as const

type TabId = typeof TABS[number]['id']

export default function Tournament() {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  return (
    <section className={styles.section} id="tournament">
      <div className="container">

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <div className={styles.titleBlock}>
              <div className="section-badge">
                <span className={styles.liveDot} /> Live Now
              </div>
              <h2 className={styles.title}>
                {TOURNAMENT_META.name.split(' ')[0]}{' '}
                <span className="gradient-text">
                  {TOURNAMENT_META.name.split(' ').slice(1).join(' ')}
                </span>
              </h2>
              <p className={styles.subtitle}>{TOURNAMENT_META.season}</p>
            </div>

            <div  className={styles.metaCards}>
              <div  className={styles.metaCard}>
                <Trophy size={16} className={styles.metaIcon} />
                <span className={styles.metaLabel}>Prize Pool</span>
                <span className={styles.metaValue}>{TOURNAMENT_META.prizePool}</span>
              </div>
              <div  className={styles.metaCard}>
                <Users size={16} className={styles.metaIcon} />
                <span className={styles.metaLabel}>Teams</span>
                <span className={styles.metaValue}>{TOURNAMENT_META.teams}</span>
              </div>
              <div  className={styles.metaCard}>
                <Shield size={16} className={styles.metaIcon} />
                <span className={styles.metaLabel}>Format</span>
                <span className={styles.metaValue}>{TOURNAMENT_META.format}</span>
              </div>
              <div  className={styles.metaCard}>
                <Calendar size={16} className={styles.metaIcon} />
                <span className={styles.metaLabel}>Starts</span>
                <span className={styles.metaValue}>{TOURNAMENT_META.startDate}</span>
              </div>
            </div>
          </div>

          <div  className={styles.tabBar}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`${styles.tab} ${activeTab === id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div  className={styles.content}>
          {activeTab === 'overview'  && <BracketView   rounds={BRACKET}    />}
          {activeTab === 'standings' && <StandingsView entries={STANDINGS}  />}
          {activeTab === 'rules'     && <RulesView     rules={RULES}        />}
        </div>

      </div>
    </section>
  )
}
