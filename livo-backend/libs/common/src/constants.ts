// ─── Kafka Topics ─────────────────────────────────────────────────────────────
export const KAFKA_TOPICS = {
  // Hero
  HERO_GET:        'hero.get',
  HERO_UPDATE:     'hero.update',
  // Events
  EVENTS_GET_ALL:  'events.getAll',
  EVENTS_CREATE:   'events.create',
  EVENTS_UPDATE:   'events.update',
  EVENTS_DELETE:   'events.delete',
  // Games
  GAMES_GET_ALL:   'games.getAll',
  GAMES_CREATE:    'games.create',
  GAMES_UPDATE:    'games.update',
  GAMES_DELETE:    'games.delete',
  // Teams
  TEAMS_GET_ALL:   'teams.getAll',
  TEAMS_CREATE:    'teams.create',
  TEAMS_UPDATE:    'teams.update',
  TEAMS_DELETE:    'teams.delete',
  // Champions
  CHAMPIONS_GET_ALL: 'champions.getAll',
  CHAMPIONS_CREATE:  'champions.create',
  CHAMPIONS_UPDATE:  'champions.update',
  CHAMPIONS_DELETE:  'champions.delete',
  // Gallery
  GALLERY_GET_ALL: 'gallery.getAll',
  GALLERY_CREATE:  'gallery.create',
  GALLERY_UPDATE:  'gallery.update',
  GALLERY_DELETE:  'gallery.delete',
  // Rules
  RULES_GET:       'rules.get',
  RULES_UPDATE:    'rules.update',
  // Tournament
  TOURNAMENT_GET:    'tournament.get',
  TOURNAMENT_UPDATE: 'tournament.update',
  // CTA
  CTA_GET:         'cta.get',
  CTA_UPDATE:      'cta.update',
  // About
  ABOUT_GET:       'about.get',
  ABOUT_UPDATE:    'about.update',
} as const

// ─── Service Names ────────────────────────────────────────────────────────────
export const SERVICES = {
  HERO:       'HERO_SERVICE',
  EVENTS:     'EVENTS_SERVICE',
  GAMES:      'GAMES_SERVICE',
  TEAMS:      'TEAMS_SERVICE',
  CHAMPIONS:  'CHAMPIONS_SERVICE',
  GALLERY:    'GALLERY_SERVICE',
  RULES:      'RULES_SERVICE',
  TOURNAMENT: 'TOURNAMENT_SERVICE',
  CTA:        'CTA_SERVICE',
  ABOUT:      'ABOUT_SERVICE',
} as const

// ─── Kafka Config ─────────────────────────────────────────────────────────────
export const kafkaConfig = (clientId: string, groupId: string) => ({
  transport: 4 as const, // Transport.KAFKA
  options: {
    client: {
      clientId,
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    },
    consumer: { groupId },
  },
})
