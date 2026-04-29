import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable, NotFoundException } from '@nestjs/common'
import { KAFKA_TOPICS, CreateEventDto, UpdateEventDto } from '@livo/common'

interface Event { id: string; day: string; month: string; title: string; mode: string; type: string; spots: string; color: string }

@Injectable()
class EventsRepository {
  private items: Event[] = [
    { id: '1', day: '15', month: 'Feb', title: 'CS2 Spring Championship', mode: 'Online', type: 'FPS', spots: '32 Teams', color: '#FF6B35' },
    { id: '2', day: '22', month: 'Feb', title: 'Chess Grand Prix', mode: 'On-Campus', type: 'Strategy', spots: '64 Players', color: '#7A3CFF' },
    { id: '3', day: '01', month: 'Mar', title: 'Ping Pong Open', mode: 'On-Campus', type: 'Sports', spots: '48 Players', color: '#00FFD5' },
    { id: '4', day: '10', month: 'Mar', title: 'Football League S2', mode: 'On-Campus', type: 'Sports', spots: '8 Teams', color: '#19E28F' },
  ]
  findAll() { return this.items }
  create(dto: CreateEventDto) { const e = { ...dto, id: Date.now().toString() }; this.items.push(e); return e }
  update(id: string, dto: Partial<Event>) { const i = this.items.findIndex(e => e.id === id); if (i < 0) throw new NotFoundException(); this.items[i] = { ...this.items[i], ...dto }; return this.items[i] }
  remove(id: string) { this.items = this.items.filter(e => e.id !== id); return { deleted: true } }
}

@Injectable()
class EventsService {
  constructor(private readonly repo: EventsRepository) {}
  getAll()                              { return this.repo.findAll() }
  create(dto: CreateEventDto)           { return this.repo.create(dto) }
  update(id: string, dto: UpdateEventDto) { return this.repo.update(id, dto) }
  remove(id: string)                    { return this.repo.remove(id) }
}

@Controller()
class EventsController {
  constructor(private readonly svc: EventsService) {}
  @MessagePattern(KAFKA_TOPICS.EVENTS_GET_ALL) getAll()                                                    { return this.svc.getAll() }
  @MessagePattern(KAFKA_TOPICS.EVENTS_CREATE)  create(@Payload() dto: CreateEventDto)                      { return this.svc.create(dto) }
  @MessagePattern(KAFKA_TOPICS.EVENTS_UPDATE)  update(@Payload() p: { id: string } & UpdateEventDto)       { const { id, ...dto } = p; return this.svc.update(id, dto) }
  @MessagePattern(KAFKA_TOPICS.EVENTS_DELETE)  remove(@Payload() p: { id: string })                        { return this.svc.remove(p.id) }
}

@Module({ controllers: [EventsController], providers: [EventsService, EventsRepository] })
export class EventsServiceModule {}
