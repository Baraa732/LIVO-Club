'use client'
import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import styles from './Tournament.module.scss'
import type { Round, Match } from './data'

function MatchCard({ match, refProp }: { match: Match; refProp?: React.Ref<HTMLDivElement> }) {
  const isWinner1 = match.status === 'done' && match.score1! > match.score2!
  const isWinner2 = match.status === 'done' && match.score2! > match.score1!

  return (
    <div ref={refProp} className={`${styles.matchCard} ${styles[`match_${match.status}`]}`}>
      {match.status === 'live' && (
        <div className={styles.liveBar}>
          <span className={styles.liveDot} /> LIVE
        </div>
      )}
      {match.status === 'upcoming' && match.time && (
        <div className={styles.timeBar}>{match.time}</div>
      )}
      <div className={`${styles.teamRow} ${isWinner1 ? styles.teamWinner : ''} ${match.status === 'done' && !isWinner1 ? styles.teamLoser : ''}`}>
        <div className={styles.teamInfo}>
          <div className={styles.teamAvatar}>{match.team1[0]}</div>
          <span className={styles.teamName}>{match.team1}</span>
        </div>
        <span className={styles.teamScore}>{match.score1 ?? '—'}</span>
      </div>
      <div className={styles.matchDivider}><span>VS</span></div>
      <div className={`${styles.teamRow} ${isWinner2 ? styles.teamWinner : ''} ${match.status === 'done' && !isWinner2 ? styles.teamLoser : ''}`}>
        <div className={styles.teamInfo}>
          <div className={styles.teamAvatar}>{match.team2[0]}</div>
          <span className={styles.teamName}>{match.team2}</span>
        </div>
        <span className={styles.teamScore}>{match.score2 ?? '—'}</span>
      </div>
    </div>
  )
}

interface ConnectorPath { d: string; done: boolean }

export default function BracketView({ rounds }: { rounds: Round[] }) {
  const bracketRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[][]>(rounds.map(r => r.matches.map(() => null)))
  const [paths, setPaths] = useState<ConnectorPath[]>([])

  const computePaths = useCallback(() => {
    const container = bracketRef.current
    if (!container) return
    const base = container.getBoundingClientRect()
    const newPaths: ConnectorPath[] = []

    for (let r = 0; r < rounds.length - 1; r++) {
      const srcRound = rounds[r]
      const dstRound = rounds[r + 1]
      for (let d = 0; d < dstRound.matches.length; d++) {
        const src1El = cardRefs.current[r]?.[d * 2]
        const src2El = cardRefs.current[r]?.[d * 2 + 1]
        const dstEl  = cardRefs.current[r + 1]?.[d]
        if (!src1El || !src2El || !dstEl) continue

        const r1 = src1El.getBoundingClientRect()
        const r2 = src2El.getBoundingClientRect()
        const rd = dstEl.getBoundingClientRect()

        const x1 = r1.right - base.left,  y1 = r1.top + r1.height / 2 - base.top
        const x2 = r2.right - base.left,  y2 = r2.top + r2.height / 2 - base.top
        const xd = rd.left  - base.left,  yd = rd.top + rd.height / 2 - base.top
        const mx = x1 + (xd - x1) * 0.5
        const my = (y1 + y2) / 2
        const isDone = srcRound.matches[d * 2]?.status === 'done' || srcRound.matches[d * 2 + 1]?.status === 'done'

        newPaths.push({ d: `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${my}, ${mx} ${my}`, done: isDone })
        newPaths.push({ d: `M ${x2} ${y2} C ${mx} ${y2}, ${mx} ${my}, ${mx} ${my}`, done: isDone })
        newPaths.push({ d: `M ${mx} ${my} C ${mx} ${my}, ${mx} ${yd}, ${xd} ${yd}`, done: isDone })
      }
    }
    setPaths(newPaths)
  }, [rounds])

  useLayoutEffect(() => {
    computePaths()
    window.addEventListener('resize', computePaths)
    return () => window.removeEventListener('resize', computePaths)
  }, [computePaths])

  return (
    <div ref={bracketRef} className={styles.bracket}>
      <svg className={styles.connectorSvg} aria-hidden>
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#8689e6" />
            <stop offset="33%"  stopColor="#a2d1ff" />
            <stop offset="66%"  stopColor="#5efbcc" />
            <stop offset="100%" stopColor="#eb9779" />
          </linearGradient>
          <filter id="neon-glow-done">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p.d} fill="none" stroke="url(#neon-gradient)" strokeWidth={3} filter="url(#neon-glow-done)" strokeLinecap="round" />
            <path d={p.d} fill="none" stroke="url(#neon-gradient)" strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}
      </svg>
      {rounds.map((round, roundIdx) => (
        <div key={round.id} className={styles.bracketCol}>
          <div className={styles.roundHeader}>
            <span className={styles.roundLabel}>{round.label}</span>
            <span className={styles.roundCount}>{round.matches.length} matches</span>
          </div>
          <div className={styles.matchList}>
            {round.matches.map((match, matchIdx) => (
              <MatchCard key={match.id} match={match} refProp={el => { cardRefs.current[roundIdx][matchIdx] = el }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
