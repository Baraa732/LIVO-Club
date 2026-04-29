import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, UpdateCtaDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Put, Body, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class CtaGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.CTA) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPICS.CTA_GET)
    this.client.subscribeToResponseOf(KAFKA_TOPICS.CTA_UPDATE)
    await this.client.connect()
  }

  getCta()                    { return this.send(this.client, KAFKA_TOPICS.CTA_GET, {}) }
  updateCta(dto: UpdateCtaDto) { return this.send(this.client, KAFKA_TOPICS.CTA_UPDATE, dto) }
}

@ApiTags('CTA')
@ApiBearerAuth()
@Controller('cta')
class CtaController {
  constructor(private readonly svc: CtaGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get CTA section data' })      getCta()                          { return this.svc.getCta() }
  @Put()              @ApiOperation({ summary: 'Update CTA section (admin)' }) updateCta(@Body() dto: UpdateCtaDto) { return this.svc.updateCta(dto) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.CTA, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-cta', brokers: [broker] }, consumer: { groupId: 'gateway-cta-group' } } }])],
  controllers: [CtaController],
  providers: [CtaGatewayService],
})
export class CtaModule {}
