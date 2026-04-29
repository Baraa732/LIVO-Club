'use client'
import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import styles from './Gallery.module.scss'

const items = [
  { id: 1, label: 'CS2 Finals', size: 'large' },
  { id: 2, label: 'Chess Tournament', size: 'small' },
  { id: 3, label: 'Award Ceremony', size: 'small' },
  { id: 4, label: 'Team Practice', size: 'medium' },
  { id: 5, label: 'Opening Night', size: 'medium' },
  { id: 6, label: 'Ping Pong Open', size: 'small' },
  { id: 7, label: 'Football Match', size: 'large' },
  { id: 8, label: 'Club Meeting', size: 'small' },
]

const colors = ['#00E6FF', '#7A3CFF', '#00FFD5', '#FFB020', '#FF4D6D', '#19E28F', '#2F7BFF', '#00C2FF']

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className={styles.section} id="gallery">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">Gallery</div>
          <h2 className={styles.title}>
            Moments That <span className="gradient-text">Define Us</span>
          </h2>
          <p className={styles.sub}>Highlights from our events and tournaments</p>
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.item} ${styles[item.size]}`}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={styles.imgPlaceholder}
                style={{ background: `radial-gradient(circle at 30% 30%, ${colors[i]}18, #0A1626)` }}
              >
                <span className={styles.initial}>{item.label[0]}</span>
              </div>
              <div className={`${styles.overlay} ${hovered === item.id ? styles.overlayVisible : ''}`}>
                <ZoomIn size={24} />
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
