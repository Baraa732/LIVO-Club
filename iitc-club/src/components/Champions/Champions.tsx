'use client'
import { Crown, Medal } from 'lucide-react'
import styles from './Champions.module.scss'

const champions = [
  { name: 'Khalid Al-Rashid', title: 'CS2 Champion', season: 'S1 2024', game: 'CS2', rank: 1 },
  { name: 'Omar Nasser', title: 'Chess Master', season: 'S1 2024', game: 'Chess', rank: 2 },
  { name: 'Lina Haddad', title: 'Ping Pong Queen', season: 'S1 2024', game: 'Ping Pong', rank: 3 },
  { name: 'Faris Yousef', title: 'Football MVP', season: 'S1 2024', game: 'Football', rank: 4 },
]

const rankColors = ['#FFB020', '#A8B6C9', '#CD7F32', '#00E6FF']

export default function Champions() {
  return (
    <section className={styles.section} id="champions">
      <div className="container">
        <div className={styles.header} >
          <div className="section-badge">
            <Crown size={13} /> Hall of Fame
          </div>
          <h2 className={styles.title}>
            Our <span className="gradient-text">Champions</span>
          </h2>
          <p className={styles.sub}>Celebrating the best of Season 1 2024</p>
        </div>

        <div className={styles.grid}>
          {champions.map((champ, i) => (
            <div key={champ.name} className={styles.card}>
              <div className={styles.rankBadge} style={{ color: rankColors[i], borderColor: `${rankColors[i]}40`, background: `${rankColors[i]}10` }}>
                {i === 0 ? <Crown size={14} /> : <Medal size={14} />}
                #{champ.rank}
              </div>

              <div className={styles.avatar} style={{ borderColor: `${rankColors[i]}40`, boxShadow: `0 0 20px ${rankColors[i]}20` }}>
                <span className={styles.avatarInitial}>{champ.name[0]}</span>
                {i === 0 && <div className={styles.crownIcon}>👑</div>}
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{champ.name}</h3>
                <p className={styles.champTitle}>{champ.title}</p>
                <div className={styles.meta}>
                  <span className={styles.game}>{champ.game}</span>
                  <span className={styles.season}>{champ.season}</span>
                </div>
              </div>

              <div className={styles.glowLine} style={{ background: `linear-gradient(90deg, transparent, ${rankColors[i]}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
