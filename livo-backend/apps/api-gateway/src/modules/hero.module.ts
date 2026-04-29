import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS } from '@livo/common'
import { Inject, Injectable, Controller, Get, Put, Body, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { UpdateHeroDto, Public } from '@livo/common'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class HeroGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.HERO) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPICS.HERO_GET)
    this.client.subscribeToResponseOf(KAFKA_TOPICS.HERO_UPDATE)
    await this.client.connect()
  }

  getHero() { return this.send(this.client, KAFKA_TOPICS.HERO_GET, {}) }
  updateHero(dto: UpdateHeroDto) { return this.send(this.client, KAFKA_TOPICS.HERO_UPDATE, dto) }
}

@ApiTags('Hero')
@ApiBearerAuth()
@Controller('hero')
class HeroController {
  constructor(private readonly svc: HeroGatewayService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get hero section data' })
  getHero() { return this.svc.getHero() }

  @Put()
  @ApiOperation({ summary: 'Update hero section (admin)' })
  updateHero(@Body() dto: UpdateHeroDto) { return this.svc.updateHero(dto) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.HERO, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-hero', brokers: [broker] }, consumer: { groupId: 'gateway-hero-group' } } }])],
  controllers: [HeroController],
  providers: [HeroGatewayService],
})
export class HeroModule {}
