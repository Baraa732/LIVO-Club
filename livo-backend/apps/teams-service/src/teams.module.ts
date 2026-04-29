import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable, NotFoundException } from '@nestjs/common'
import { KAFKA_TOPICS, CreateTeamDto, UpdateTeamDto } from '@livo/common'

interface Team { rank: number; name: string; game: string; players: number; w: number; l: number; pts: number; status: string }

@Injectable()
class TeamsRepository {
  private items: Team[] = [
    { rank: 1, name: 'Alpha Squad', game: 'CS2', players: 5, w: 12, l: 2, pts: 38, status: 'Champion' },
    { rank: 2, name: 'Storm Riders', game: 'CS2', players: 5, w: 10, l: 4, pts: 32, status: 'Qualified' },
    { rank: 3, name: 'Neon Hawks', game: 'CS2', players: 5, w: 9, l: 5, pts: 29, status: 'Qualified' },
    { rank: 4, name: 'Cyber Wolves', game: 'CS2', players: 5, w: 8, l: 6, pts: 26, status: 'Qualified' },
    { rank: 5, name: 'Iron Fist', game: 'CS2', players: 5, w: 6, l: 8, pts: 20, status: 'Pending' },
    { rank: 6, name: 'Ghost Protocol', game: 'CS2', players: 5, w: 4, l: 10, pts: 14, status: 'Pending' },
    { rank: 7, name: 'Dark Matter', game: 'CS2', players: 5, w: 3, l: 11, pts: 10, status: 'Eliminated' },
    { rank: 8, name: 'Beta Force', game: 'CS2', players: 5, w: 2, l: 12, pts: 7, status: 'Eliminated' },
  ]
  findAll() { return this.items }
  create(dto: CreateTeamDto) { this.items.push(dto); return dto }
  update(rank: number, dto: Partial<Team>) { const i = this.items.findIndex(t => t.rank === rank); if (i < 0) throw new NotFoundException(); this.items[i] = { ...this.items[i], ...dto }; return this.items[i] }
  remove(rank: number) { this.items = this.items.filter(t => t.rank !== rank); return { deleted: true } }
}

@Injectable()
class TeamsService {
  constructor(private readonly repo: TeamsRepository) {}
  getAll()                                { return this.repo.findAll() }
  create(dto: CreateTeamDto)              { return this.repo.create(dto) }
  update(rank: number, dto: UpdateTeamDto) { return this.repo.update(rank, dto) }
  remove(rank: number)                    { return this.repo.remove(rank) }
}

@Controller()
class TeamsController {
  constructor(private readonly svc: TeamsService) {}
  @MessagePattern(KAFKA_TOPICS.TEAMS_GET_ALL) getAll()                                                    { return this.svc.getAll() }
  @MessagePattern(KAFKA_TOPICS.TEAMS_CREATE)  create(@Payload() dto: CreateTeamDto)                       { return this.svc.create(dto) }
  @MessagePattern(KAFKA_TOPICS.TEAMS_UPDATE)  update(@Payload() p: { rank: number } & UpdateTeamDto)      { const { rank, ...dto } = p; return this.svc.update(rank, dto) }
  @MessagePattern(KAFKA_TOPICS.TEAMS_DELETE)  remove(@Payload() p: { rank: number })                      { return this.svc.remove(p.rank) }
}

@Module({ controllers: [TeamsController], providers: [TeamsService, TeamsRepository] })
export class TeamsServiceModule {}
