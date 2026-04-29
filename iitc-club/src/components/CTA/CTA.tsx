'use client'
import Link from 'next/link'
import { CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import styles from './CTA.module.scss'

const perks = [
  'Access to all club tournaments and events',
  'Professional coaching and skill workshops',
  'Exclusive member merchandise and rewards',
  'Network with 150+ passionate players',
  'Priority registration for major championships',
  'Certificate of participation for all events',
]

export default function CTA() {
  return (
    <section className={styles.section} id="join">
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className="section-badge">
              <Zap size={13} /> Join the Club
            </div>
            <h2 className={styles.title}>
              Ready to <span className="gradient-text">Level Up?</span>
            </h2>
            <p className={styles.desc}>
              Become part of LIVO Club and compete at the highest level.
              Your journey to the top starts with a single click.
            </p>

            <ul className={styles.perks}>
              {perks.map((perk) => (
                <li key={perk} className={styles.perk}>
                  <CheckCircle2 size={16} className={styles.check} />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className={styles.actions}>
              <Link href="#" className={styles.btnPrimary}>
                Join Now — It's Free <ChevronRight size={18} />
              </Link>
              <Link href="#about" className={styles.btnSecondary}>
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.glowBg} />
            <div className={styles.card1}>
              <div className={styles.cardIcon}>🏆</div>
              <div>
                <div className={styles.cardTitle}>Season Champion</div>
                <div className={styles.cardSub}>Alpha Squad — CS2</div>
              </div>
            </div>
            <div className={styles.card2}>
              <div className={styles.cardIcon}>⚡</div>
              <div>
                <div className={styles.cardTitle}>Next Tournament</div>
                <div className={styles.cardSub}>Feb 15 — 32 Spots Left</div>
              </div>
            </div>
            <div className={styles.card3}>
              <div className={styles.cardIcon}>🎮</div>
              <div>
                <div className={styles.cardTitle}>Active Members</div>
                <div className={styles.cardSub}>150+ and growing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
