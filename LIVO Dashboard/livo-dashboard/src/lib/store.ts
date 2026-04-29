// Central in-memory store — replace with DB/API calls in production

export type MatchStatus = 'done' | 'live' | 'upcoming'
export type TeamStatus = 'Champion' | 'Qualified' | 'Pending' | 'Eliminated'
export type TournamentStatus = 'qualified' | 'eliminated' | 'pending'
export type GallerySize = 'large' | 'medium' | 'small'

export interface HeroStat { value: number; suffix: string; label: string }
export interface HeroData {
  badge: string
  line1: string
  line2: string
  line3: string
  description: string
  ctaLabel: string
  videoLabel: string
  stats: HeroStat[]
}

export interface AboutPillar { icon: string; title: string; desc: string }
export interface AboutData {
  badge: string
  title: string
  titleGradient: string
  desc1: string
  desc2: string
  foundedYear: string
  pillars: AboutPillar[]
}

export interface Event {
  id: string
  day: string
  month: string
  title: string
  mode: string
  type: string
  spots: string
  color: string
}

export interface Game {
  id: string
  name: string
  category: string
  players: string
  color: string
  emoji: string
  image: string
  desc: string
  tags: string[]
  activePlayers: number
  tournaments: number
}

export interface Team {
  rank: number
  name: string
  game: string
  players: number
  w: number
  l: number
  pts: number
  status: TeamStatus
}

export interface Champion {
  id: string
  name: string
  title: string
  season: string
  game: string
  rank: number
}

export interface GalleryItem {
  id: number
  label: string
  size: GallerySize
  color: string
}

export interface RuleItem { title: string; desc: string }
export interface RuleSection { category: string; rules: RuleItem[] }

export interface CtaPerk { text: string }
export interface CtaData {
  badge: string
  title: string
  titleGradient: string
  description: string
  perks: string[]
  btnLabel: string
  card1Icon: string; card1Title: string; card1Sub: string
  card2Icon: string; card2Title: string; card2Sub: string
  card3Icon: string; card3Title: string; card3Sub: string
}

export interface TournamentMatch {
  id: string; team1: string; team2: string
  score1: number | null; score2: number | null
  status: MatchStatus; time?: string
}
export interface TournamentRound { id: string; label: string; matches: TournamentMatch[] }
export interface TournamentStanding {
  rank: number; name: string; played: number
  w: number; l: number; pts: number; status: TournamentStatus
}
export interface TournamentRule { title: string; desc: string }
export interface TournamentMeta {
  name: string; season: string; prizePool: string
  game: string; format: string; teams: number; startDate: string
}

// ─── Initial Data ────────────────────────────────────────────────────────────

let heroData: HeroData = {
  badge: 'Season 2026 — Now Active',
  line1: 'Compete.',
  line2: 'Connect.',
  line3: 'Conquer.',
  description: 'The official esports & sports club of the College of Computer Engineering Informatics. Join elite competitions, build your team, and rise to the top.',
  ctaLabel: 'Join Now',
  videoLabel: 'Watch Video',
  stats: [
    { value: 7, suffix: '+', label: 'Games' },
    { value: 25, suffix: '+', label: 'Tournaments' },
    { value: 150, suffix: '+', label: 'Members' },
  ],
}

let aboutData: AboutData = {
  badge: 'About Us',
  title: 'More Than a Club —',
  titleGradient: 'A Movement',
  desc1: 'LIVO Club was founded to unite students passionate about esports and sports under one roof. We believe competition builds character, and community builds champions.',
  desc2: "Whether you're a seasoned pro or just starting out, there's a place for you here. Join us and be part of something bigger.",
  foundedYear: '2022',
  pillars: [
    { icon: 'Trophy', title: 'Competitions', desc: 'Regular tournaments across all disciplines with prizes and recognition.' },
    { icon: 'Users', title: 'Community', desc: 'A welcoming space for gamers and athletes to connect and grow together.' },
    { icon: 'TrendingUp', title: 'Development', desc: 'Workshops, coaching sessions, and skill-building programs.' },
    { icon: 'Heart', title: 'Fun & Respect', desc: 'We play hard but always with sportsmanship and mutual respect.' },
  ],
}

let events: Event[] = [
  { id: '1', day: '15', month: 'Feb', title: 'CS2 Spring Championship', mode: 'Online', type: 'FPS', spots: '32 Teams', color: '#FF6B35' },
  { id: '2', day: '22', month: 'Feb', title: 'Chess Grand Prix', mode: 'On-Campus', type: 'Strategy', spots: '64 Players', color: '#7A3CFF' },
  { id: '3', day: '01', month: 'Mar', title: 'Ping Pong Open', mode: 'On-Campus', type: 'Sports', spots: '48 Players', color: '#00FFD5' },
  { id: '4', day: '10', month: 'Mar', title: 'Football League S2', mode: 'On-Campus', type: 'Sports', spots: '8 Teams', color: '#19E28F' },
]

let games: Game[] = [
  { id: 'cs2', name: 'CS2', category: 'FPS', players: '5v5', color: '#FF6B35', emoji: '/images/games/cs2-logo.jpg', image: '/images/games/Counter-Strike 2.jpg', desc: 'The most competitive tactical shooter. Precision, strategy, and teamwork define every round.', tags: ['Tactical', 'Team-based', 'Competitive'], activePlayers: 24, tournaments: 8 },
  { id: 'cs-source', name: 'CS Source', category: 'FPS', players: '5v5', color: '#00E6FF', emoji: '/images/games/cs-source-logo.jpg', image: '/images/games/cs-source.jpg', desc: 'The classic that started it all. Fast-paced gunplay with deep mechanical skill expression.', tags: ['Classic', 'Team-based', 'Skill'], activePlayers: 18, tournaments: 5 },
  { id: 'ping-pong', name: 'Ping Pong', category: 'Sports', players: '1v1', color: '#00FFD5', emoji: '/images/games/ping-pong-logo2.jpg', image: '/images/games/ping-pong.jpg', desc: 'Lightning reflexes meet tactical spin. Our most active physical sport with weekly matches.', tags: ['Physical', 'Reflexes', 'Weekly'], activePlayers: 32, tournaments: 12 },
  { id: 'chess', name: 'Chess', category: 'Strategy', players: '1v1', color: '#7A3CFF', emoji: '/images/games/chess-logo.jpg', image: '/images/games/chess.jpg', desc: 'Pure mental warfare. Outsmart your opponent across 64 squares in timed tournament play.', tags: ['Mental', 'Strategy', 'Timed'], activePlayers: 20, tournaments: 6 },
  { id: 'football', name: 'Football', category: 'Sports', players: '11v11', color: '#19E28F', emoji: '/images/games/football-logo.jpg', image: '/images/games/football.jpg', desc: 'The beautiful game. Inter-department leagues with full match days every semester.', tags: ['Team Sport', 'League', 'Seasonal'], activePlayers: 44, tournaments: 3 },
  { id: 'running', name: 'Marathon', category: 'Athletics', players: 'Solo', color: '#FFB020', emoji: '/images/games/marathon-logo.jpg', image: '/images/games/marathon.jpg', desc: 'Push your limits. Campus sprint events and endurance challenges open to all fitness levels.', tags: ['Solo', 'Endurance', 'Open'], activePlayers: 28, tournaments: 4 },
]

let teams: Team[] = [
  { rank: 1, name: 'Alpha Squad', game: 'CS2', players: 5, w: 12, l: 2, pts: 38, status: 'Champion' },
  { rank: 2, name: 'Storm Riders', game: 'CS2', players: 5, w: 10, l: 4, pts: 32, status: 'Qualified' },
  { rank: 3, name: 'Neon Hawks', game: 'CS2', players: 5, w: 9, l: 5, pts: 29, status: 'Qualified' },
  { rank: 4, name: 'Cyber Wolves', game: 'CS2', players: 5, w: 8, l: 6, pts: 26, status: 'Qualified' },
  { rank: 5, name: 'Iron Fist', game: 'CS2', players: 5, w: 6, l: 8, pts: 20, status: 'Pending' },
  { rank: 6, name: 'Ghost Protocol', game: 'CS2', players: 5, w: 4, l: 10, pts: 14, status: 'Pending' },
  { rank: 7, name: 'Dark Matter', game: 'CS2', players: 5, w: 3, l: 11, pts: 10, status: 'Eliminated' },
  { rank: 8, name: 'Beta Force', game: 'CS2', players: 5, w: 2, l: 12, pts: 7, status: 'Eliminated' },
]

let champions: Champion[] = [
  { id: '1', name: 'Khalid Al-Rashid', title: 'CS2 Champion', season: 'S1 2024', game: 'CS2', rank: 1 },
  { id: '2', name: 'Omar Nasser', title: 'Chess Master', season: 'S1 2024', game: 'Chess', rank: 2 },
  { id: '3', name: 'Lina Haddad', title: 'Ping Pong Queen', season: 'S1 2024', game: 'Ping Pong', rank: 3 },
  { id: '4', name: 'Faris Yousef', title: 'Football MVP', season: 'S1 2024', game: 'Football', rank: 4 },
]

let galleryItems: GalleryItem[] = [
  { id: 1, label: 'CS2 Finals', size: 'large', color: '#00E6FF' },
  { id: 2, label: 'Chess Tournament', size: 'small', color: '#7A3CFF' },
  { id: 3, label: 'Award Ceremony', size: 'small', color: '#00FFD5' },
  { id: 4, label: 'Team Practice', size: 'medium', color: '#FFB020' },
  { id: 5, label: 'Opening Night', size: 'medium', color: '#FF4D6D' },
  { id: 6, label: 'Ping Pong Open', size: 'small', color: '#19E28F' },
  { id: 7, label: 'Football Match', size: 'large', color: '#2F7BFF' },
  { id: 8, label: 'Club Meeting', size: 'small', color: '#00C2FF' },
]

let ruleSections: RuleSection[] = [
  {
    category: 'General',
    rules: [
      { title: 'Membership', desc: 'All participants must be enrolled students at LIVO. Membership is free and open to all.' },
      { title: 'Code of Conduct', desc: 'Respect all players, staff, and spectators. Harassment or toxic behavior results in immediate disqualification.' },
      { title: 'Fair Play', desc: 'Any form of cheating, exploiting bugs, or unsportsmanlike conduct is strictly prohibited.' },
    ],
  },
  {
    category: 'Tournaments',
    rules: [
      { title: 'Registration', desc: 'Teams must register at least 48 hours before the tournament start time.' },
      { title: 'Check-in', desc: 'All players must check in 15 minutes before their scheduled match or forfeit.' },
      { title: 'Match Format', desc: 'Best of 3 for all rounds. Grand Finals are Best of 5. Knife round determines side.' },
      { title: 'Substitutions', desc: 'One substitute per team, declared before the tournament begins. No mid-tournament changes.' },
      { title: 'Disconnections', desc: 'A 10-minute technical pause is allowed per match. Exceeding this results in a forfeit.' },
    ],
  },
  {
    category: 'Prizes & Awards',
    rules: [
      { title: 'Prize Distribution', desc: 'Prizes are distributed within 7 days of the tournament conclusion.' },
      { title: 'Certificates', desc: 'All participants receive a digital certificate. Winners receive physical trophies.' },
    ],
  },
]

let ctaData: CtaData = {
  badge: 'Join the Club',
  title: 'Ready to',
  titleGradient: 'Level Up?',
  description: 'Become part of LIVO Club and compete at the highest level. Your journey to the top starts with a single click.',
  perks: [
    'Access to all club tournaments and events',
    'Professional coaching and skill workshops',
    'Exclusive member merchandise and rewards',
    'Network with 150+ passionate players',
    'Priority registration for major championships',
    'Certificate of participation for all events',
  ],
  btnLabel: "Join Now — It's Free",
  card1Icon: '🏆', card1Title: 'Season Champion', card1Sub: 'Alpha Squad — CS2',
  card2Icon: '⚡', card2Title: 'Next Tournament', card2Sub: 'Feb 15 — 32 Spots Left',
  card3Icon: '🎮', card3Title: 'Active Members', card3Sub: '150+ and growing',
}

let tournamentMeta: TournamentMeta = {
  name: 'CS2 Championship', season: 'Spring 2026', prizePool: '500 JD',
  game: 'CS2', format: 'Single Elimination', teams: 8, startDate: 'Feb 15, 2026',
}

let tournamentBracket: TournamentRound[] = [
  {
    id: 'qf', label: 'Quarter Finals',
    matches: [
      { id: 'qf1', team1: 'Alpha Squad', team2: 'Beta Force', score1: 2, score2: 0, status: 'done' },
      { id: 'qf2', team1: 'Cyber Wolves', team2: 'Storm Riders', score1: 1, score2: 2, status: 'done' },
      { id: 'qf3', team1: 'Neon Hawks', team2: 'Dark Matter', score1: null, score2: null, status: 'live', time: 'NOW' },
      { id: 'qf4', team1: 'Iron Fist', team2: 'Ghost Protocol', score1: null, score2: null, status: 'upcoming', time: '18:00' },
    ],
  },
  {
    id: 'sf', label: 'Semi Finals',
    matches: [
      { id: 'sf1', team1: 'Alpha Squad', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
      { id: 'sf2', team1: 'TBD', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
    ],
  },
  {
    id: 'gf', label: 'Grand Final',
    matches: [
      { id: 'gf1', team1: 'TBD', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 25' },
    ],
  },
]

let tournamentStandings: TournamentStanding[] = [
  { rank: 1, name: 'Alpha Squad', played: 1, w: 1, l: 0, pts: 3, status: 'qualified' },
  { rank: 2, name: 'Storm Riders', played: 1, w: 1, l: 0, pts: 3, status: 'qualified' },
  { rank: 3, name: 'Neon Hawks', played: 1, w: 0, l: 0, pts: 0, status: 'pending' },
  { rank: 4, name: 'Dark Matter', played: 1, w: 0, l: 0, pts: 0, status: 'pending' },
  { rank: 5, name: 'Iron Fist', played: 1, w: 0, l: 0, pts: 0, status: 'pending' },
  { rank: 6, name: 'Ghost Protocol', played: 1, w: 0, l: 0, pts: 0, status: 'pending' },
  { rank: 7, name: 'Beta Force', played: 1, w: 0, l: 1, pts: -1, status: 'eliminated' },
  { rank: 8, name: 'Cyber Wolves', played: 1, w: 0, l: 1, pts: -1, status: 'eliminated' },
]

let tournamentRules: TournamentRule[] = [
  { title: 'Match Format', desc: 'Best of 3 maps for all rounds. Grand Final is Best of 5.' },
  { title: 'Check-in', desc: 'Teams must check in 15 minutes before their scheduled match.' },
  { title: 'Server Settings', desc: '128-tick servers. Knife round determines side selection.' },
  { title: 'Substitutions', desc: 'One substitute allowed per team, declared before the tournament.' },
  { title: 'Disconnections', desc: 'A 10-minute pause is allowed for technical issues per match.' },
  { title: 'Fair Play', desc: 'Any form of cheating or unsportsmanlike conduct results in disqualification.' },
]

// ─── Getters & Setters ───────────────────────────────────────────────────────

export const getHero = () => heroData
export const setHero = (d: HeroData) => { heroData = d }

export const getAbout = () => aboutData
export const setAbout = (d: AboutData) => { aboutData = d }

export const getEvents = () => events
export const setEvents = (d: Event[]) => { events = d }
export const addEvent = (e: Event) => { events = [...events, e] }
export const updateEvent = (id: string, e: Partial<Event>) => { events = events.map(ev => ev.id === id ? { ...ev, ...e } : ev) }
export const deleteEvent = (id: string) => { events = events.filter(ev => ev.id !== id) }

export const getGames = () => games
export const setGames = (d: Game[]) => { games = d }
export const addGame = (g: Game) => { games = [...games, g] }
export const updateGame = (id: string, g: Partial<Game>) => { games = games.map(gm => gm.id === id ? { ...gm, ...g } : gm) }
export const deleteGame = (id: string) => { games = games.filter(g => g.id !== id) }

export const getTeams = () => teams
export const setTeams = (d: Team[]) => { teams = d }
export const addTeam = (t: Team) => { teams = [...teams, t] }
export const updateTeam = (rank: number, t: Partial<Team>) => { teams = teams.map(tm => tm.rank === rank ? { ...tm, ...t } : tm) }
export const deleteTeam = (rank: number) => { teams = teams.filter(t => t.rank !== rank) }

export const getChampions = () => champions
export const setChampions = (d: Champion[]) => { champions = d }
export const addChampion = (c: Champion) => { champions = [...champions, c] }
export const updateChampion = (id: string, c: Partial<Champion>) => { champions = champions.map(ch => ch.id === id ? { ...ch, ...c } : ch) }
export const deleteChampion = (id: string) => { champions = champions.filter(c => c.id !== id) }

export const getGallery = () => galleryItems
export const setGallery = (d: GalleryItem[]) => { galleryItems = d }
export const addGalleryItem = (g: GalleryItem) => { galleryItems = [...galleryItems, g] }
export const updateGalleryItem = (id: number, g: Partial<GalleryItem>) => { galleryItems = galleryItems.map(gi => gi.id === id ? { ...gi, ...g } : gi) }
export const deleteGalleryItem = (id: number) => { galleryItems = galleryItems.filter(g => g.id !== id) }

export const getRules = () => ruleSections
export const setRules = (d: RuleSection[]) => { ruleSections = d }

export const getCta = () => ctaData
export const setCta = (d: CtaData) => { ctaData = d }

export const getTournamentMeta = () => tournamentMeta
export const setTournamentMeta = (d: TournamentMeta) => { tournamentMeta = d }
export const getTournamentBracket = () => tournamentBracket
export const setTournamentBracket = (d: TournamentRound[]) => { tournamentBracket = d }
export const getTournamentStandings = () => tournamentStandings
export const setTournamentStandings = (d: TournamentStanding[]) => { tournamentStandings = d }
export const getTournamentRules = () => tournamentRules
export const setTournamentRules = (d: TournamentRule[]) => { tournamentRules = d }
