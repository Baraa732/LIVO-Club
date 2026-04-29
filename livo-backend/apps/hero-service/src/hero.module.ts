import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable } from '@nestjs/common'
import { KAFKA_TOPICS, UpdateHeroDto } from '@livo/common'

// ─── Repository (Single Responsibility) ──────────────────────────────────────
@Injectable()
class HeroRepository {
  private data = {
    badge: 'Season 2026 — Now Active',
    line1: 'Compete.', line2: 'Connect.', line3: 'Conquer.',
    description: 'The official esports & sports club of the College of Computer Engineering Informatics.',
    ctaLabel: 'Join Now', videoLabel: 'Watch Video',
    stats: [
      { value: 7, suffix: '+', label: 'Games' },
      { value: 25, suffix: '+', label: 'Tournaments' },
      { value: 150, suffix: '+', label: 'Members' },
    ],
  }

  find() { return this.data }
  update(dto: Partial<typeof this.data>) { this.data = { ...this.data, ...dto }; return this.data }
}

// ─── Service (Business Logic) ─────────────────────────────────────────────────
@Injectable()
class HeroService {
  constructor(private readonly repo: HeroRepository) {}
  getHero() { return this.repo.find() }
  updateHero(dto: UpdateHeroDto) { return this.repo.update(dto) }
}

// ─── Controller (Message Handling) ───────────────────────────────────────────
@Controller()
class HeroController {
  constructor(private readonly svc: HeroService) {}

  @MessagePattern(KAFKA_TOPICS.HERO_GET)
  getHero() { return this.svc.getHero() }

  @MessagePattern(KAFKA_TOPICS.HERO_UPDATE)
  updateHero(@Payload() dto: UpdateHeroDto) { return this.svc.updateHero(dto) }
}

@Module({ controllers: [HeroController], providers: [HeroService, HeroRepository] })
export class HeroServiceModule {}
