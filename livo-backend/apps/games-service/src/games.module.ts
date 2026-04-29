import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable, NotFoundException } from '@nestjs/common'
import { KAFKA_TOPICS, CreateGameDto, UpdateGameDto } from '@livo/common'

interface Game { id: string; name: string; category: string; players: string; color: string; emoji: string; image: string; desc: string; tags: string[]; activePlayers: number; tournaments: number }

@Injectable()
class GamesRepository {
  private items: Game[] = [
    { id: 'cs2', name: 'CS2', category: 'FPS', players: '5v5', color: '#FF6B35', emoji: '/images/games/cs2-logo.jpg', image: '/images/games/Counter-Strike 2.jpg', desc: 'The most competitive tactical shooter.', tags: ['Tactical', 'Team-based', 'Competitive'], activePlayers: 24, tournaments: 8 },
    { id: 'chess', name: 'Chess', category: 'Strategy', players: '1v1', color: '#7A3CFF', emoji: '/images/games/chess-logo.jpg', image: '/images/games/chess.jpg', desc: 'Pure mental warfare.', tags: ['Mental', 'Strategy', 'Timed'], activePlayers: 20, tournaments: 6 },
    { id: 'ping-pong', name: 'Ping Pong', category: 'Sports', players: '1v1', color: '#00FFD5', emoji: '/images/games/ping-pong-logo2.jpg', image: '/images/games/ping-pong.jpg', desc: 'Lightning reflexes meet tactical spin.', tags: ['Physical', 'Reflexes', 'Weekly'], activePlayers: 32, tournaments: 12 },
    { id: 'football', name: 'Football', category: 'Sports', players: '11v11', color: '#19E28F', emoji: '/images/games/football-logo.jpg', image: '/images/games/football.jpg', desc: 'The beautiful game.', tags: ['Team Sport', 'League', 'Seasonal'], activePlayers: 44, tournaments: 3 },
    { id: 'cs-source', name: 'CS Source', category: 'FPS', players: '5v5', color: '#00E6FF', emoji: '/images/games/cs-source-logo.jpg', image: '/images/games/cs-source.jpg', desc: 'The classic that started it all.', tags: ['Classic', 'Team-based', 'Skill'], activePlayers: 18, tournaments: 5 },
    { id: 'running', name: 'Marathon', category: 'Athletics', players: 'Solo', color: '#FFB020', emoji: '/images/games/marathon-logo.jpg', image: '/images/games/marathon.jpg', desc: 'Push your limits.', tags: ['Solo', 'Endurance', 'Open'], activePlayers: 28, tournaments: 4 },
  ]
  findAll() { return this.items }
  create(dto: CreateGameDto) { this.items.push(dto); return dto }
  update(id: string, dto: Partial<Game>) { const i = this.items.findIndex(g => g.id === id); if (i < 0) throw new NotFoundException(); this.items[i] = { ...this.items[i], ...dto }; return this.items[i] }
  remove(id: string) { this.items = this.items.filter(g => g.id !== id); return { deleted: true } }
}

@Injectable()
class GamesService {
  constructor(private readonly repo: GamesRepository) {}
  getAll()                              { return this.repo.findAll() }
  create(dto: CreateGameDto)            { return this.repo.create(dto) }
  update(id: string, dto: UpdateGameDto) { return this.repo.update(id, dto) }
  remove(id: string)                    { return this.repo.remove(id) }
}

@Controller()
class GamesController {
  constructor(private readonly svc: GamesService) {}
  @MessagePattern(KAFKA_TOPICS.GAMES_GET_ALL) getAll()                                                  { return this.svc.getAll() }
  @MessagePattern(KAFKA_TOPICS.GAMES_CREATE)  create(@Payload() dto: CreateGameDto)                    { return this.svc.create(dto) }
  @MessagePattern(KAFKA_TOPICS.GAMES_UPDATE)  update(@Payload() p: { id: string } & UpdateGameDto)     { const { id, ...dto } = p; return this.svc.update(id, dto) }
  @MessagePattern(KAFKA_TOPICS.GAMES_DELETE)  remove(@Payload() p: { id: string })                     { return this.svc.remove(p.id) }
}

@Module({ controllers: [GamesController], providers: [GamesService, GamesRepository] })
export class GamesServiceModule {}
