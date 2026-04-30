export type MatchStatus = 'done' | 'live' | 'upcoming'

export interface Match {
  id: string
  team1: string
  team2: string
  score1: number | null
  score2: number | null
  status: MatchStatus
  time?: string
}

export interface Round {
  id: string
  label: string
  matches: Match[]
}

export interface TeamEntry {
  rank: number
  name: string
  played: number
  w: number
  l: number
  pts: number
  status: 'qualified' | 'eliminated' | 'pending'
}

export interface Rule {
  title: string
  desc: string
}

export const TOURNAMENT_META = {
  name: 'CS2 Championship',
  season: 'Spring 2026',
  prizePool: '500 JD',
  game: 'CS2',
  format: 'Single Elimination',
  teams: 8,
  startDate: 'Feb 15, 2026',
}

export const BRACKET: Round[] = [
  {
    id: 'qf',
    label: 'Quarter Finals',
    matches: [
      { id: 'qf1', team1: 'Alpha Squad',  team2: 'Beta Force',     score1: 2, score2: 0, status: 'done' },
      { id: 'qf2', team1: 'Cyber Wolves', team2: 'Storm Riders',   score1: 1, score2: 2, status: 'done' },
      { id: 'qf3', team1: 'Neon Hawks',   team2: 'Dark Matter',    score1: null, score2: null, status: 'live', time: 'NOW' },
      { id: 'qf4', team1: 'Iron Fist',    team2: 'Ghost Protocol', score1: null, score2: null, status: 'upcoming', time: '18:00' },
    ],
  },
  {
    id: 'sf',
    label: 'Semi Finals',
    matches: [
      { id: 'sf1', team1: 'Alpha Squad', team2: 'Storm Riders', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
      { id: 'sf2', team1: '??',         team2: '??', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
    ],
  },
  {
    id: 'gf',
    label: 'Grand Final',
    matches: [
      { id: 'gf1', team1: '??', team2: '??', score1: null, score2: null, status: 'upcoming', time: 'Feb 25' },
    ],
  },
]

export const STANDINGS: TeamEntry[] = [
  { rank: 1, name: 'Alpha Squad',    played: 1, w: 1, l: 0, pts: 3,  status: 'qualified' },
  { rank: 2, name: 'Storm Riders',   played: 1, w: 1, l: 0, pts: 3,  status: 'qualified' },
  { rank: 3, name: 'Neon Hawks',     played: 1, w: 0, l: 0, pts: 0,  status: 'pending'   },
  { rank: 4, name: 'Dark Matter',    played: 1, w: 0, l: 0, pts: 0,  status: 'pending'   },
  { rank: 5, name: 'Iron Fist',      played: 1, w: 0, l: 0, pts: 0,  status: 'pending'   },
  { rank: 6, name: 'Ghost Protocol', played: 1, w: 0, l: 0, pts: 0,  status: 'pending'   },
  { rank: 7, name: 'Beta Force',     played: 1, w: 0, l: 1, pts: -1, status: 'eliminated'},
  { rank: 8, name: 'Cyber Wolves',   played: 1, w: 0, l: 1, pts: -1, status: 'eliminated'},
]

export const RULES: Rule[] = [
  { title: 'Match Format',    desc: 'Best of 3 maps for all rounds. Grand Final is Best of 5.' },
  { title: 'Check-in',        desc: 'Teams must check in 15 minutes before their scheduled match.' },
  { title: 'Server Settings', desc: '128-tick servers. Knife round determines side selection.' },
  { title: 'Substitutions',   desc: 'One substitute allowed per team, declared before the tournament.' },
  { title: 'Disconnections',  desc: 'A 10-minute pause is allowed for technical issues per match.' },
  { title: 'Fair Play',       desc: 'Any form of cheating or unsportsmanlike conduct results in disqualification.' },
]
