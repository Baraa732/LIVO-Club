'use client'
import { useState, useEffect, useCallback, useTransition, memo } from 'react'
import Image from 'next/image'
import { ChevronRight, Users, Gamepad2, Zap } from 'lucide-react'
import styles from './Games.module.scss'

export const GAMES_FALLBACK = [
  {
    id: 'cs2', name: 'CS2', category: 'FPS', players: '5v5', color: '#FF6B35',
    emoji: '/images/games-opt/cs2-logo.jpg', image: '/images/games-opt/Counter-Strike 2.jpg',
    desc: 'The most competitive tactical shooter. Precision, strategy, and teamwork define every round.',
    tags: ['Tactical', 'Team-based', 'Competitive'], activePlayers: 24, tournaments: 8,
  },
  {
    id: 'cs-source', name: 'CS Source', category: 'FPS', players: '5v5', color: '#00E6FF',
    emoji: '/images/games-opt/cs-source-logo.jpg', image: '/images/games-opt/cs-source.jpg',
    desc: 'The classic that started it all. Fast-paced gunplay with deep mechanical skill expression.',
    tags: ['Classic', 'Team-based', 'Skill'], activePlayers: 18, tournaments: 5,
  },
  {
    id: 'ping-pong', name: 'Ping Pong', category: 'Sports', players: '1v1', color: '#00FFD5',
    emoji: '/images/games-opt/ping-pong-logo2.jpg', image: '/images/games-opt/ping-pong.jpg',
    desc: 'Lightning reflexes meet tactical spin. Our most active physical sport with weekly matches.',
    tags: ['Physical', 'Reflexes', 'Weekly'], activePlayers: 32, tournaments: 12,
  },
  {
    id: 'chess', name: 'Chess', category: 'Strategy', players: '1v1', color: '#7A3CFF',
    emoji: '/images/games-opt/chess-logo.jpg', image: '/images/games-opt/chess.jpg',
    desc: 'Pure mental warfare. Outsmart your opponent across 64 squares in timed tournament play.',
    tags: ['Mental', 'Strategy', 'Timed'], activePlayers: 20, tournaments: 6,
  },
  {
    id: 'football', name: 'Football', category: 'Sports', players: '11v11', color: '#19E28F',
    emoji: '/images/games-opt/football-logo.jpg', image: '/images/games-opt/football.jpg',
    desc: 'The beautiful game. Inter-department leagues with full match days every semester.',
    tags: ['Team Sport', 'League', 'Seasonal'], activePlayers: 44, tournaments: 3,
  },
  {
    id: 'running', name: 'Marathon', category: 'Athletics', players: 'Solo', color: '#FFB020',
    emoji: '/images/games-opt/marathon-logo.jpg', image: '/images/games-opt/marathon.jpg',
    desc: 'Push your limits. Campus sprint events and endurance challenges open to all fitness levels.',
    tags: ['Solo', 'Endurance', 'Open'], activePlayers: 28, tournaments: 4,
  },
] as const

export const GAMES = GAMES_FALLBACK

interface Game {
  id: string; name: string; category: string; players: string; color: string
  emoji: string; image: string; desc: string; tags: string[]
  activePlayers: number; tournaments: number
}

// Memoized panel — never re-renders after mount, visibility toggled by CSS only
const GamePanel = memo(function GamePanel({ game, active }: { game: Game; active: boolean }) {
  return (
    <div
      className={styles.panel}
      style={{ '--accent': game.color } as React.CSSProperties}
      aria-hidden={!active}
      data-active={active}
    >
      <div className={styles.panelBg} style={{ background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${game.color}18, transparent 70%)` }} />
      <Image
        src={game.image}
        alt={game.name}
        fill
        className={styles.panelImg}
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={game.id === 'cs2'}
        loading={game.id === 'cs2' ? undefined : 'lazy'}
      />
      <div className={styles.panelTop}>
        <span className={styles.panelCategory}>{game.category}</span>
        <span className={styles.panelPlayers}><Users size={13} /> {game.players}</span>
      </div>
      <div className={styles.panelEmoji}>
        <Image src={game.emoji} alt={game.name} width={100} height={100} className={styles.panelLogo} loading="lazy" />
      </div>
      <h3 className={styles.panelName}>{game.name}</h3>
      <p className={styles.panelDesc}>{game.desc}</p>
      <div className={styles.panelTags}>
        {game.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
      </div>
      <div className={styles.panelStats}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{game.activePlayers}</span>
          <span className={styles.statLabel}>Active Players</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>{game.tournaments}</span>
          <span className={styles.statLabel}>Tournaments</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>{game.players}</span>
          <span className={styles.statLabel}>Format</span>
        </div>
      </div>
      <button className={styles.panelCta}>
        View Details <ChevronRight size={16} />
      </button>
      <div className={styles.panelGlow} style={{ background: `radial-gradient(circle, ${game.color}22 0%, transparent 70%)` }} />
      <div className={styles.panelAccentLine} style={{ background: `linear-gradient(90deg, ${game.color}, transparent)` }} />
    </div>
  )
})

export default function Games() {
  const [games, setGames] = useState<Game[]>(GAMES_FALLBACK as unknown as Game[])
  const [activeId, setActiveId] = useState<string>('cs2')
  const [, startTransition] = useTransition()

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'
    fetch(`${base}/games`)
      .then(r => r.json())
      .then(json => {
        const data = json?.data ?? json
        if (Array.isArray(data) && data.length > 0) {
          setGames(data)
          setActiveId(data[0].id)
        }
      })
      .catch(() => {})
  }, [])

  const activateById = useCallback((id: string) => {
    const found = games.find(g => g.id === id)
    if (found) setActiveId(found.id)
  }, [games])

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Record<string, string>>).detail
      if (detail?.game) activateById(detail.game)
    }
    window.addEventListener('section:select', handler)
    return () => window.removeEventListener('section:select', handler)
  }, [activateById])

  return (
    <div className={styles.showcase}>
      {/* All panels pre-rendered, visibility toggled via CSS data-active — zero React re-render on click */}
      <div className={styles.panelStack}>
        {games.map(g => (
          <GamePanel key={g.id} game={g} active={g.id === activeId} />
        ))}
      </div>

      <div className={styles.list}>
        {games.map(g => (
          <button
            key={g.id}
            className={`${styles.listItem} ${g.id === activeId ? styles.listItemActive : ''}`}
            style={{ '--accent': g.color } as React.CSSProperties}
            onClick={() => startTransition(() => setActiveId(g.id))}
            aria-pressed={g.id === activeId}
          >
            <div className={styles.listLeft}>
              <span className={styles.listEmoji}>
                <Image src={g.emoji} alt={g.name} width={30} height={30} className={styles.logoImg} priority loading="eager" />
              </span>
              <div className={styles.listInfo}>
                <span className={styles.listName}>{g.name}</span>
                <span className={styles.listMeta}>{g.category} · {g.players}</span>
              </div>
            </div>
            <div className={styles.listRight}>
              <span className={styles.listPlayers}><Gamepad2 size={12} /> {g.activePlayers}</span>
              {g.id === activeId && <Zap size={14} className={styles.listActiveIcon} />}
            </div>
            <div className={styles.listBar} />
          </button>
        ))}
      </div>
    </div>
  )
}
