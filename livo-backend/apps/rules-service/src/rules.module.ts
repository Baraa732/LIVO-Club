import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable } from '@nestjs/common'
import { KAFKA_TOPICS, RuleSectionDto } from '@livo/common'

@Injectable()
class RulesRepository {
  private data = [
    { category: 'General', rules: [{ title: 'Membership', desc: 'All participants must be enrolled students.' }, { title: 'Code of Conduct', desc: 'Respect all players, staff, and spectators.' }, { title: 'Fair Play', desc: 'Any form of cheating is strictly prohibited.' }] },
    { category: 'Tournaments', rules: [{ title: 'Registration', desc: 'Teams must register at least 48 hours before.' }, { title: 'Check-in', desc: 'All players must check in 15 minutes before.' }, { title: 'Match Format', desc: 'Best of 3 for all rounds. Grand Finals are Best of 5.' }] },
    { category: 'Prizes & Awards', rules: [{ title: 'Prize Distribution', desc: 'Prizes distributed within 7 days.' }, { title: 'Certificates', desc: 'All participants receive a digital certificate.' }] },
  ]
  find() { return this.data }
  update(dto: typeof this.data) { this.data = dto; return this.data }
}

@Injectable()
class RulesService {
  constructor(private readonly repo: RulesRepository) {}
  getRules() { return this.repo.find() }
  updateRules(dto: RuleSectionDto[]) { return this.repo.update(dto as any) }
}

@Controller()
class RulesController {
  constructor(private readonly svc: RulesService) {}
  @MessagePattern(KAFKA_TOPICS.RULES_GET)    getRules()                                  { return this.svc.getRules() }
  @MessagePattern(KAFKA_TOPICS.RULES_UPDATE) updateRules(@Payload() dto: RuleSectionDto[]) { return this.svc.updateRules(dto) }
}

@Module({ controllers: [RulesController], providers: [RulesService, RulesRepository] })
export class RulesServiceModule {}
