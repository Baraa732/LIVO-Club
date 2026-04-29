import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable } from '@nestjs/common'
import { KAFKA_TOPICS, UpdateAboutDto } from '@livo/common'

@Injectable()
class AboutRepository {
  private data = {
    badge: 'About Us', title: 'More Than a Club —', titleGradient: 'A Movement',
    desc1: 'LIVO Club was founded to unite students passionate about esports and sports under one roof.',
    desc2: "Whether you're a seasoned pro or just starting out, there's a place for you here.",
    foundedYear: '2022',
    pillars: [
      { icon: 'Trophy', title: 'Competitions', desc: 'Regular tournaments across all disciplines.' },
      { icon: 'Users', title: 'Community', desc: 'A welcoming space for gamers and athletes.' },
      { icon: 'TrendingUp', title: 'Development', desc: 'Workshops, coaching sessions, and skill-building.' },
      { icon: 'Heart', title: 'Fun & Respect', desc: 'We play hard but always with sportsmanship.' },
    ],
  }
  find() { return this.data }
  update(dto: Partial<typeof this.data>) { this.data = { ...this.data, ...dto }; return this.data }
}

@Injectable()
class AboutService {
  constructor(private readonly repo: AboutRepository) {}
  getAbout() { return this.repo.find() }
  updateAbout(dto: UpdateAboutDto) { return this.repo.update(dto) }
}

@Controller()
class AboutController {
  constructor(private readonly svc: AboutService) {}
  @MessagePattern(KAFKA_TOPICS.ABOUT_GET)    getAbout()                              { return this.svc.getAbout() }
  @MessagePattern(KAFKA_TOPICS.ABOUT_UPDATE) updateAbout(@Payload() dto: UpdateAboutDto) { return this.svc.updateAbout(dto) }
}

@Module({ controllers: [AboutController], providers: [AboutService, AboutRepository] })
export class AboutServiceModule {}
