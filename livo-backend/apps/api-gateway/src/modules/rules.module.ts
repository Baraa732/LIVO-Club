import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, RuleSectionDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Put, Body, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class RulesGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.RULES) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPICS.RULES_GET)
    this.client.subscribeToResponseOf(KAFKA_TOPICS.RULES_UPDATE)
    await this.client.connect()
  }

  getRules()                        { return this.send(this.client, KAFKA_TOPICS.RULES_GET, {}) }
  updateRules(dto: RuleSectionDto[]) { return this.send(this.client, KAFKA_TOPICS.RULES_UPDATE, dto) }
}

@ApiTags('Rules')
@ApiBearerAuth()
@Controller('rules')
class RulesController {
  constructor(private readonly svc: RulesGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get all rules' })      getRules()                              { return this.svc.getRules() }
  @Put()              @ApiOperation({ summary: 'Update rules (admin)' }) updateRules(@Body() dto: RuleSectionDto[]) { return this.svc.updateRules(dto) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.RULES, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-rules', brokers: [broker] }, consumer: { groupId: 'gateway-rules-group' } } }])],
  controllers: [RulesController],
  providers: [RulesGatewayService],
})
export class RulesModule {}
