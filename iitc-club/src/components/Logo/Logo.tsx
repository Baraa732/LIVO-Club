import styles from './Logo.module.scss'

interface LogoMarkProps {
  size?: number
}

export function LogoMark({ size = 40 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.mark}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lg-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00FFD5" />
          <stop offset="55%"  stopColor="#00B8FF" />
          <stop offset="100%" stopColor="#246BFF" />
        </linearGradient>
        <linearGradient id="lg-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#00FFD5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#246BFF" stopOpacity="0.9" />
        </linearGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* outer hex fill */}
      <polygon
        points="40,4 72,22 72,58 40,76 8,58 8,22"
        fill="url(#lg-primary)"
        fillOpacity="0.07"
      />

      {/* outer hex border */}
      <polygon
        points="40,4 72,22 72,58 40,76 8,58 8,22"
        fill="none"
        stroke="url(#lg-stroke)"
        strokeWidth="1.5"
        filter="url(#glow)"
      />

      {/* inner hex ring */}
      <polygon
        points="40,13 64,27 64,53 40,67 16,53 16,27"
        fill="none"
        stroke="url(#lg-stroke)"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />

      {/* corner accent dots */}
      {([[40,4],[72,22],[72,58],[40,76],[8,58],[8,22]] as [number,number][]).map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill="url(#lg-primary)" filter="url(#glow)" />
      ))}

      {/* diagonal scan line */}
      <line x1="14" y1="26" x2="66" y2="54" stroke="url(#lg-stroke)" strokeWidth="0.6" strokeOpacity="0.18" />

      {/* LIVO text */}
      <text
        x="40" y="44"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Space Grotesk', 'Inter', sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="1"
        fill="url(#lg-primary)"
        filter="url(#glow-strong)"
      >
        LIVO
      </text>

      {/* CLUB micro label */}
      <text
        x="40" y="58"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Inter', sans-serif"
        fontWeight="500"
        fontSize="5.5"
        letterSpacing="2.5"
        fill="#00E6FF"
        fillOpacity="0.5"
      >
        CLUB
      </text>
    </svg>
  )
}

// ── Full wordmark ─────────────────────────────────────────────
interface LogoProps {
  size?: number
  showSub?: boolean
  className?: string
}

export default function Logo({ size = 40, showSub = true, className = '' }: LogoProps) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <span className={styles.markWrap} style={{ width: size, height: size }}>
        <LogoMark size={size} />
      </span>
      <span className={styles.wordmark}>
        <span className={styles.name}>
          LIVO <span className={styles.nameAccent}>Club</span>
        </span>
        {showSub && <span className={styles.sub}>Esports &amp; Sports</span>}
      </span>
    </span>
  )
}
