import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable } from '@nestjs/common'
import { KAFKA_TOPICS, UpdateCtaDto } from '@livo/common'

@Injectable()
class CtaRepository {
  private data: UpdateCtaDto = {
    badge: 'Join the Club', title: 'Ready to', titleGradient: 'Level Up?',
    description: 'Become part of LIVO Club and compete at the highest level.',
    perks: ['Access to all club tournaments', 'Professional coaching', 'Exclusive member rewards', 'Network with 150+ players', 'Priority registration', 'Certificate of participation'],
    btnLabel: "Join Now — It's Free",
    card1Icon: '🏆', card1Title: 'Season Champion', card1Sub: 'Alpha Squad — CS2',
    card2Icon: '⚡', card2Title: 'Next Tournament', card2Sub: 'Feb 15 — 32 Spots Left',
    card3Icon: '🎮', card3Title: 'Active Members', card3Sub: '150+ and growing',
  }
  find() { return this.data }
  update(dto: UpdateCtaDto) { this.data = { ...this.data, ...dto }; return this.data }
}

@Injectable()
class CtaService {
  constructor(private readonly repo: CtaRepository) {}
  getCta() { return this.repo.find() }
  updateCta(dto: UpdateCtaDto) { return this.repo.update(dto) }
}

@Controller()
class CtaController {
  constructor(private readonly svc: CtaService) {}
  @MessagePattern(KAFKA_TOPICS.CTA_GET)    getCta()                                { return this.svc.getCta() }
  @MessagePattern(KAFKA_TOPICS.CTA_UPDATE) updateCta(@Payload() dto: UpdateCtaDto) { return this.svc.updateCta(dto) }
}

@Module({ controllers: [CtaController], providers: [CtaService, CtaRepository] })
export class CtaServiceModule {}
