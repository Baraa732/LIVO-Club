import styles from './ui.module.scss'

export function PageHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {desc && <p className={styles.pageDesc}>{desc}</p>}
    </div>
  )
}

export function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`${styles.card} ${className}`} style={style}>{children}</div>
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardTitle}>{children}</div>
}

export function Btn({
  children, onClick, variant = 'primary', type = 'button', className = ''
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'danger' | 'ghost' | 'cyan'
  type?: 'button' | 'submit'
  className?: string
}) {
  return (
    <button type={type} onClick={onClick}
      className={`${styles.btn} ${styles[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Badge({ label, color }: { label: string; color: string }) {
  return (
    <span className={styles.badge}
      style={{ color, background: `${color}14`, borderColor: `${color}35` }}>
      {label}
    </span>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
    </div>
  )
}

export function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className={styles.saveBar}>
      <Btn type="button" onClick={onSave}>Save Changes</Btn>
      {saved && <span className={styles.savedMsg}>Saved successfully</span>}
    </div>
  )
}

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className={styles.toolbar}>{children}</div>
}

export function Tabs({ tabs, active, onChange }: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
}) {
  return (
    <div className={styles.tabs}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function EditRow({ children }: { children: React.ReactNode }) {
  return <div className={styles.editRow}>{children}</div>
}

export function FormRow({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) {
  const colClass = { 2: styles.cols2, 3: styles.cols3, 4: styles.cols4 }[cols]
  return <div className={`${styles.formRow} ${colClass}`}>{children}</div>
}

export function ListCard({ children }: { children: React.ReactNode }) {
  return <div className={styles.listCard}>{children}</div>
}

export function ListCardLeft({ children }: { children: React.ReactNode }) {
  return <div className={styles.listCardLeft}>{children}</div>
}

export function ListCardIcon({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className={styles.listCardIcon}
      style={{ background: `${color}14`, borderColor: `${color}35`, color }}>
      {children}
    </div>
  )
}

export function ListCardInfo({ title, meta }: { title: string; meta?: React.ReactNode }) {
  return (
    <div className={styles.listCardInfo}>
      <div className={styles.listCardTitle}>{title}</div>
      {meta && <div className={styles.listCardMeta}>{meta}</div>}
    </div>
  )
}

export function ListCardActions({ children }: { children: React.ReactNode }) {
  return <div className={styles.listCardActions}>{children}</div>
}
