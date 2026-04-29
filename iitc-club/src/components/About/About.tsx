'use client'
import { Trophy, Users, TrendingUp, Heart } from 'lucide-react'
import styles from './About.module.scss'

const pillars = [
  { icon: Trophy, title: 'Competitions', desc: 'Regular tournaments across all disciplines with prizes and recognition.' },
  { icon: Users, title: 'Community', desc: 'A welcoming space for gamers and athletes to connect and grow together.' },
  { icon: TrendingUp, title: 'Development', desc: 'Workshops, coaching sessions, and skill-building programs.' },
  { icon: Heart, title: 'Fun & Respect', desc: 'We play hard but always with sportsmanship and mutual respect.' },
]

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className="section-badge">About Us</div>
            <h2 className={styles.title}>
              More Than a Club —<br />
              <span className="gradient-text">A Movement</span>
            </h2>
            <p className={styles.desc}>
              LIVO Club was founded to unite students passionate about esports and sports under one roof.
              We believe competition builds character, and community builds champions.
            </p>
            <p className={styles.desc}>
              Whether you're a seasoned pro or just starting out, there's a place for you here.
              Join us and be part of something bigger.
            </p>
            <div className={styles.divider} />
            <div className={styles.founded}>
              <span className={styles.foundedYear}>2022</span>
              <span className={styles.foundedLabel}>Year Founded</span>
            </div>
          </div>

          <div className={styles.right}>
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.pillar}>
                <div className={styles.pillarIcon}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className={styles.pillarTitle}>{title}</h4>
                  <p className={styles.pillarDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
