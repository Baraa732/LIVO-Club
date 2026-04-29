'use client'
import { Crown } from 'lucide-react'
import styles from './Teams.module.scss'

const teams = [
  { rank: 1, name: 'Alpha Squad', game: 'CS2', players: 5, w: 12, l: 2, pts: 38, status: 'Champion' },
  { rank: 2, name: 'Storm Riders', game: 'CS2', players: 5, w: 10, l: 4, pts: 32, status: 'Qualified' },
  { rank: 3, name: 'Neon Hawks', game: 'CS2', players: 5, w: 9, l: 5, pts: 29, status: 'Qualified' },
  { rank: 4, name: 'Cyber Wolves', game: 'CS2', players: 5, w: 8, l: 6, pts: 26, status: 'Qualified' },
  { rank: 5, name: 'Iron Fist', game: 'CS2', players: 5, w: 6, l: 8, pts: 20, status: 'Pending' },
  { rank: 6, name: 'Ghost Protocol', game: 'CS2', players: 5, w: 4, l: 10, pts: 14, status: 'Pending' },
  { rank: 7, name: 'Dark Matter', game: 'CS2', players: 5, w: 3, l: 11, pts: 10, status: 'Eliminated' },
  { rank: 8, name: 'Beta Force', game: 'CS2', players: 5, w: 2, l: 12, pts: 7, status: 'Eliminated' },
]

const statusColor: Record<string, string> = {
  Champion: '#FFB020',
  Qualified: '#19E28F',
  Pending: '#00E6FF',
  Eliminated: '#FF4D6D',
}

export default function Teams() {
  return (
    <section className={styles.section} id="teams">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">Standings</div>
          <h2 className={styles.title}>
            Team <span className="gradient-text">Rankings</span>
          </h2>
          <p className={styles.sub}>Current standings for CS2 Spring Championship</p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Game</th>
                <th>Players</th>
                <th>W</th>
                <th>L</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.rank} className={team.rank === 1 ? styles.topRow : ''}>
                  <td>
                    <div className={styles.rankCell}>
                      {team.rank === 1 ? <Crown size={16} className={styles.crown} /> : null}
                      <span className={team.rank <= 3 ? styles.topRank : ''}>{team.rank}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.teamCell}>
                      <div className={styles.teamAvatar}>{team.name[0]}</div>
                      <span className={styles.teamName}>{team.name}</span>
                    </div>
                  </td>
                  <td><span className={styles.gameTag}>{team.game}</span></td>
                  <td className={styles.numCell}>{team.players}</td>
                  <td className={styles.winCell}>{team.w}</td>
                  <td className={styles.lossCell}>{team.l}</td>
                  <td>
                    <span className={styles.points}>{team.pts}</span>
                  </td>
                  <td>
                    <span
                      className={styles.status}
                      style={{
                        color: statusColor[team.status],
                        background: `${statusColor[team.status]}15`,
                        borderColor: `${statusColor[team.status]}30`,
                      }}
                    >
                      {team.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
