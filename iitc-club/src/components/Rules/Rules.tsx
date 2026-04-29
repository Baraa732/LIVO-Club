import { ShieldCheck, BookOpen } from 'lucide-react'
import styles from './Rules.module.scss'

const sections = [
  {
    category: 'General',
    rules: [
      { title: 'Membership', desc: 'All participants must be enrolled students at LIVO. Membership is free and open to all.' },
      { title: 'Code of Conduct',  desc: 'Respect all players, staff, and spectators. Harassment or toxic behavior results in immediate disqualification.' },
      { title: 'Fair Play',        desc: 'Any form of cheating, exploiting bugs, or unsportsmanlike conduct is strictly prohibited.' },
    ],
  },
  {
    category: 'Tournaments',
    rules: [
      { title: 'Registration',     desc: 'Teams must register at least 48 hours before the tournament start time.' },
      { title: 'Check-in',         desc: 'All players must check in 15 minutes before their scheduled match or forfeit.' },
      { title: 'Match Format',     desc: 'Best of 3 for all rounds. Grand Finals are Best of 5. Knife round determines side.' },
      { title: 'Substitutions',    desc: 'One substitute per team, declared before the tournament begins. No mid-tournament changes.' },
      { title: 'Disconnections',   desc: 'A 10-minute technical pause is allowed per match. Exceeding this results in a forfeit.' },
    ],
  },
  {
    category: 'Prizes & Awards',
    rules: [
      { title: 'Prize Distribution', desc: 'Prizes are distributed within 7 days of the tournament conclusion.' },
      { title: 'Certificates',       desc: 'All participants receive a digital certificate. Winners receive physical trophies.' },
    ],
  },
]

export default function Rules() {
  return (
    <section className={styles.section} id="rules">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">
            <BookOpen size={13} /> Club Rules
          </div>
          <h2 className={styles.title}>
            Rules &amp; <span className="gradient-text">Regulations</span>
          </h2>
          <p className={styles.sub}>Know the rules. Play fair. Win with honor.</p>
        </div>

        <div className={styles.body}>
          {sections.map(sec => (
            <div key={sec.category} className={styles.category}>
              <div className={styles.categoryLabel}>
                <ShieldCheck size={15} />
                {sec.category}
              </div>
              <div className={styles.ruleList}>
                {sec.rules.map((rule, i) => (
                  <div key={rule.title} className={styles.rule}>
                    <span className={styles.ruleNum}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className={styles.ruleContent}>
                      <h4 className={styles.ruleTitle}>{rule.title}</h4>
                      <p className={styles.ruleDesc}>{rule.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
