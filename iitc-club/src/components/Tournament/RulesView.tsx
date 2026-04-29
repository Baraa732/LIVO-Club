import { ShieldCheck } from 'lucide-react'
import styles from './Tournament.module.scss'
import type { Rule } from './data'

export default function RulesView({ rules }: { rules: Rule[] }) {
  return (
    <div className={styles.rulesGrid}>
      {rules.map((rule, i) => (
        <div key={rule.title} className={styles.ruleCard}>
          <div className={styles.ruleNum}>0{i + 1}</div>
          <div className={styles.ruleIcon}><ShieldCheck size={18} /></div>
          <h4 className={styles.ruleTitle}>{rule.title}</h4>
          <p className={styles.ruleDesc}>{rule.desc}</p>
        </div>
      ))}
    </div>
  )
}
