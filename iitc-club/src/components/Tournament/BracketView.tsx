import styles from './Tournament.module.scss'
import type { Round, Match } from './data'

function MatchCard({ match }: { match: Match }) {
  const isWinner1 = match.status === 'done' && match.score1! > match.score2!
  const isWinner2 = match.status === 'done' && match.score2! > match.score1!

  return (
    <div className={`${styles.matchCard} ${styles[`match_${match.status}`]}`}>
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
        <span className={styles.teamScore}>
          {match.score1 ?? '—'}
        </span>
      </div>

      <div className={styles.matchDivider}>
        <span>VS</span>
      </div>

      <div className={`${styles.teamRow} ${isWinner2 ? styles.teamWinner : ''} ${match.status === 'done' && !isWinner2 ? styles.teamLoser : ''}`}>
        <div className={styles.teamInfo}>
          <div className={styles.teamAvatar}>{match.team2[0]}</div>
          <span className={styles.teamName}>{match.team2}</span>
        </div>
        <span className={styles.teamScore}>
          {match.score2 ?? '—'}
        </span>
      </div>
    </div>
  )
}

export default function BracketView({ rounds }: { rounds: Round[] }) {
  return (
    <div className={styles.bracket}>
      {rounds.map((round, roundIdx) => (
        <div key={round.id} className={styles.bracketCol}>
          <div className={styles.roundHeader}>
            <span className={styles.roundLabel}>{round.label}</span>
            <span className={styles.roundCount}>{round.matches.length} matches</span>
          </div>
          <div className={styles.matchList}>
            {round.matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
