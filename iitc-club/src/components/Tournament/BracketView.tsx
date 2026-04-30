'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import styles from './Tournament.module.scss'
import type { Round, Match } from './data'

function MatchCard({ match, ri, mi }: { match: Match; ri: number; mi: number }) {
  const isWinner1 = match.status === 'done' && match.score1! > match.score2!
  const isWinner2 = match.status === 'done' && match.score2! > match.score1!

  return (
    <div
      data-card={`${ri}-${mi}`}
      className={`${styles.matchCard} ${styles[`match_${match.status}`]}`}
    >
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
  const [paths, setPaths] = useState<ConnectorPath[]>([])
  const rafRef = useRef<number>(0)

  const computePaths = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const container = bracketRef.current
      if (!container) return

      const base = container.getBoundingClientRect()

      // Query all cards and columns directly from the DOM
      const getCard = (ri: number, mi: number) =>
        container.querySelector<HTMLElement>(`[data-card="${ri}-${mi}"]`)
      const getCol = (ri: number) =>
        container.querySelector<HTMLElement>(`[data-col="${ri}"]`)

      const newPaths: ConnectorPath[] = []

      for (let r = 0; r < rounds.length - 1; r++) {
        const srcRound = rounds[r]
        const dstRound = rounds[r + 1]

        const srcCol = getCol(r)
        const dstCol = getCol(r + 1)
        if (!srcCol || !dstCol) continue

        // xMid = true center of the gap between the two columns
        const xMid =
          (srcCol.getBoundingClientRect().right +
            dstCol.getBoundingClientRect().left) /
            2 -
          base.left

        for (let d = 0; d < dstRound.matches.length; d++) {
          const topEl = getCard(r, d * 2)
          const botEl = getCard(r, d * 2 + 1)
          const dstEl = getCard(r + 1, d)
          if (!topEl || !botEl || !dstEl) continue

          const rTop = topEl.getBoundingClientRect()
          const rBot = botEl.getBoundingClientRect()
          const rDst = dstEl.getBoundingClientRect()

          const x1   = rTop.right - base.left
          const y1   = rTop.top   + rTop.height / 2 - base.top
          const x2   = rBot.right - base.left
          const y2   = rBot.top   + rBot.height / 2 - base.top
          const xDst = rDst.left  - base.left
          const yDst = rDst.top   + rDst.height / 2 - base.top
          const yMid = (y1 + y2) / 2

          const isDone =
            srcRound.matches[d * 2]?.status === 'done' &&
            srcRound.matches[d * 2 + 1]?.status === 'done'

          newPaths.push({ d: `M ${x1} ${y1} H ${xMid} V ${yMid}`, done: isDone })
          newPaths.push({ d: `M ${x2} ${y2} H ${xMid} V ${yMid}`, done: isDone })
          newPaths.push({ d: `M ${xMid} ${yMid} H ${xDst}`,       done: isDone })
        }
      }

      setPaths(newPaths)
    })
  }, [rounds])

  useEffect(() => {
    computePaths()
    window.addEventListener('resize', computePaths)
    return () => {
      window.removeEventListener('resize', computePaths)
      cancelAnimationFrame(rafRef.current)
    }
  }, [computePaths])

  return (
    <div ref={bracketRef} className={styles.bracket}>
      <svg className={styles.connectorSvg} aria-hidden>
        <defs>
          <linearGradient id="neon-gradient" x1="0%" y1="30%" x2="60%" y2="90%">
            <stop offset="0%"   stopColor="#8689e6" />
            <stop offset="40%"  stopColor="#a2d1ff" />
            <stop offset="90%"  stopColor="#5efbcc" />
            <stop offset="99%" stopColor="#eb9779" />
          </linearGradient>
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="url(#neon-gradient)"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={p.done ? 'url(#neon-glow)' : undefined}
          />
        ))}
      </svg>

      {rounds.map((round, roundIdx) => (
        <div key={round.id} data-col={roundIdx} className={styles.bracketCol}>
          <div className={styles.roundHeader}>
            <span className={styles.roundLabel}>{round.label}</span>
            <span className={styles.roundCount}>{round.matches.length} matches</span>
          </div>
          <div className={styles.matchList}>
            {round.matches.map((match, matchIdx) => (
              <MatchCard key={match.id} match={match} ri={roundIdx} mi={matchIdx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
