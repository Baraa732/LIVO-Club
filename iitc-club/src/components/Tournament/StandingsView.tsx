import { Crown } from 'lucide-react'
import styles from './Tournament.module.scss'
import type { TeamEntry } from './data'

const STATUS_LABEL: Record<TeamEntry['status'], string> = {
  qualified:  'Qualified',
  eliminated: 'Eliminated',
  pending:    'Pending',
}

export default function StandingsView({ entries }: { entries: TeamEntry[] }) {
  return (
    <div  className={styles.standingsWrap}>
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.name} className={entry.rank === 1 ? styles.topRow : ''}>
              <td>
                <span className={entry.rank <= 2 ? styles.topRank : styles.rankNum}>
                  {entry.rank === 1 ? <Crown size={14} /> : entry.rank}
                </span>
              </td>
              <td>
                <div className={styles.standingTeam}>
                  <div className={styles.teamAvatar}>{entry.name[0]}</div>
                  <span>{entry.name}</span>
                </div>
              </td>
              <td className={styles.numCell}>{entry.played}</td>
              <td className={styles.winCell}>{entry.w}</td>
              <td className={styles.lossCell}>{entry.l}</td>
              <td>
                <span className={styles.ptsValue}>{entry.pts}</span>
              </td>
              <td>
                <span className={`${styles.statusBadge} ${styles[`status_${entry.status}`]}`}>
                  {STATUS_LABEL[entry.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
