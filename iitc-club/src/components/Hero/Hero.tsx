'use client'
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Play, ChevronRight, Users, Trophy, Gamepad2 } from 'lucide-react'
import styles from './Hero.module.scss'

const LivoModel = dynamic(() => import('./LivoModel'), { ssr: false })

const stats = [
  { value: 7, suffix: '+', label: 'Games', icon: Gamepad2 },
  { value: 25, suffix: '+', label: 'Tournaments', icon: Trophy },
  { value: 150, suffix: '+', label: 'Members', icon: Users },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = target / 60
        const timer = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
        observer.disconnect()
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgEffects}>
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={`${styles.inner} container`}>
        <div className={styles.content}>
          <div className="section-badge">
            <span className={styles.liveDot} />
            Season 2026 — Now Active
          </div>

          <h1 className={styles.title}>
            <span className={styles.line}>Compete.</span>
            <span className={styles.line}>Connect.</span>
            <span className={`${styles.line} ${styles.gradLine}`}>Conquer.</span>
          </h1>

          <p className={styles.desc}>
            The official esports & sports club of the College of Computer Engineering Informatics.
            Join elite competitions, build your team, and rise to the top.
          </p>

          <div className={styles.actions}>
            <Link href="#join" className={styles.btnPrimary}>
              Join Now <ChevronRight size={18} />
            </Link>
            <button className={styles.btnVideo}>
              <span className={styles.playIcon}><Play size={14} fill="currentColor" /></span>
              Watch Video
            </button>
          </div>

          <div className={styles.stats}>
            {stats.map(({ value, suffix, label, icon: Icon }) => (
              <div key={label} className={styles.statItem}>
                <div className={styles.statIcon}><Icon size={16} /></div>
                <div className={styles.statNum}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.orbitRing1} />
          <div className={styles.orbitRing2} />
          <div className={styles.orbitRing3} />
          <div className={styles.orbitDot1} />
          <div className={styles.orbitDot2} />
          <div className={styles.orbitDot3} />

          <div className={styles.modelWrap}>
            <LivoModel />
          </div>

          <div className={styles.floatCard1}>
            <Trophy size={14} />
            <span>Live Tournament</span>
            <span className={styles.liveTag}>LIVE</span>
          </div>
          <div className={styles.floatCard2}>
            <Users size={14} />
            <span>150+ Members</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
