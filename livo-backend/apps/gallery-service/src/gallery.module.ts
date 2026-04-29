import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable, NotFoundException } from '@nestjs/common'
import { KAFKA_TOPICS, CreateGalleryItemDto, UpdateGalleryItemDto } from '@livo/common'

interface GalleryItem { id: number; label: string; size: string; color: string }

@Injectable()
class GalleryRepository {
  private items: GalleryItem[] = [
    { id: 1, label: 'CS2 Finals', size: 'large', color: '#00E6FF' },
    { id: 2, label: 'Chess Tournament', size: 'small', color: '#7A3CFF' },
    { id: 3, label: 'Award Ceremony', size: 'small', color: '#00FFD5' },
    { id: 4, label: 'Team Practice', size: 'medium', color: '#FFB020' },
    { id: 5, label: 'Opening Night', size: 'medium', color: '#FF4D6D' },
    { id: 6, label: 'Ping Pong Open', size: 'small', color: '#19E28F' },
    { id: 7, label: 'Football Match', size: 'large', color: '#2F7BFF' },
    { id: 8, label: 'Club Meeting', size: 'small', color: '#00C2FF' },
  ]
  findAll() { return this.items }
  create(dto: CreateGalleryItemDto) { const g = { ...dto, id: Date.now() }; this.items.push(g); return g }
  update(id: number, dto: Partial<GalleryItem>) { const i = this.items.findIndex(g => g.id === id); if (i < 0) throw new NotFoundException(); this.items[i] = { ...this.items[i], ...dto }; return this.items[i] }
  remove(id: number) { this.items = this.items.filter(g => g.id !== id); return { deleted: true } }
}

@Injectable()
class GalleryService {
  constructor(private readonly repo: GalleryRepository) {}
  getAll()                                        { return this.repo.findAll() }
  create(dto: CreateGalleryItemDto)               { return this.repo.create(dto) }
  update(id: number, dto: UpdateGalleryItemDto)   { return this.repo.update(id, dto) }
  remove(id: number)                              { return this.repo.remove(id) }
}

@Controller()
class GalleryController {
  constructor(private readonly svc: GalleryService) {}
  @MessagePattern(KAFKA_TOPICS.GALLERY_GET_ALL) getAll()                                                      { return this.svc.getAll() }
  @MessagePattern(KAFKA_TOPICS.GALLERY_CREATE)  create(@Payload() dto: CreateGalleryItemDto)                  { return this.svc.create(dto) }
  @MessagePattern(KAFKA_TOPICS.GALLERY_UPDATE)  update(@Payload() p: { id: number } & UpdateGalleryItemDto)   { const { id, ...dto } = p; return this.svc.update(id, dto) }
  @MessagePattern(KAFKA_TOPICS.GALLERY_DELETE)  remove(@Payload() p: { id: number })                          { return this.svc.remove(p.id) }
}

@Module({ controllers: [GalleryController], providers: [GalleryService, GalleryRepository] })
export class GalleryServiceModule {}
