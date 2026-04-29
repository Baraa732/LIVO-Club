import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable, NotFoundException } from '@nestjs/common'
import { KAFKA_TOPICS, CreateChampionDto, UpdateChampionDto } from '@livo/common'

interface Champion { id: string; name: string; title: string; season: string; game: string; rank: number }

@Injectable()
class ChampionsRepository {
  private items: Champion[] = [
    { id: '1', name: 'Khalid Al-Rashid', title: 'CS2 Champion', season: 'S1 2024', game: 'CS2', rank: 1 },
    { id: '2', name: 'Omar Nasser', title: 'Chess Master', season: 'S1 2024', game: 'Chess', rank: 2 },
    { id: '3', name: 'Lina Haddad', title: 'Ping Pong Queen', season: 'S1 2024', game: 'Ping Pong', rank: 3 },
    { id: '4', name: 'Faris Yousef', title: 'Football MVP', season: 'S1 2024', game: 'Football', rank: 4 },
  ]
  findAll() { return this.items }
  create(dto: CreateChampionDto) { const c = { ...dto, id: Date.now().toString() }; this.items.push(c); return c }
  update(id: string, dto: Partial<Champion>) { const i = this.items.findIndex(c => c.id === id); if (i < 0) throw new NotFoundException(); this.items[i] = { ...this.items[i], ...dto }; return this.items[i] }
  remove(id: string) { this.items = this.items.filter(c => c.id !== id); return { deleted: true } }
}

@Injectable()
class ChampionsService {
  constructor(private readonly repo: ChampionsRepository) {}
  getAll()                                    { return this.repo.findAll() }
  create(dto: CreateChampionDto)              { return this.repo.create(dto) }
  update(id: string, dto: UpdateChampionDto)  { return this.repo.update(id, dto) }
  remove(id: string)                          { return this.repo.remove(id) }
}

@Controller()
class ChampionsController {
  constructor(private readonly svc: ChampionsService) {}
  @MessagePattern(KAFKA_TOPICS.CHAMPIONS_GET_ALL) getAll()                                                      { return this.svc.getAll() }
  @MessagePattern(KAFKA_TOPICS.CHAMPIONS_CREATE)  create(@Payload() dto: CreateChampionDto)                     { return this.svc.create(dto) }
  @MessagePattern(KAFKA_TOPICS.CHAMPIONS_UPDATE)  update(@Payload() p: { id: string } & UpdateChampionDto)      { const { id, ...dto } = p; return this.svc.update(id, dto) }
  @MessagePattern(KAFKA_TOPICS.CHAMPIONS_DELETE)  remove(@Payload() p: { id: string })                          { return this.svc.remove(p.id) }
}

@Module({ controllers: [ChampionsController], providers: [ChampionsService, ChampionsRepository] })
export class ChampionsServiceModule {}
