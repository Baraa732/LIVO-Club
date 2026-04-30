import dynamic from 'next/dynamic'
import styles from './Games.module.scss'

const GamesInteractive = dynamic(() => import('./Games'))

// Server component — heading renders as static HTML, no JS needed
// The interactive panel loads after, without blocking the h2 paint
export default function GamesShell() {
  return (
    <section className={styles.section} id="games">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">Our Games</div>
          <h2 className={styles.title}>
            Compete Across <span className="gradient-text">6 Disciplines</span>
          </h2>
          <p className={styles.sub}>From digital arenas to physical courts — we cover it all.</p>
        </div>
        <GamesInteractive />
      </div>
    </section>
  )
}
