import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, UpdateAboutDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Put, Body, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class AboutGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.ABOUT) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPICS.ABOUT_GET)
    this.client.subscribeToResponseOf(KAFKA_TOPICS.ABOUT_UPDATE)
    await this.client.connect()
  }

  getAbout() { return this.send(this.client, KAFKA_TOPICS.ABOUT_GET, {}) }
  updateAbout(dto: UpdateAboutDto) { return this.send(this.client, KAFKA_TOPICS.ABOUT_UPDATE, dto) }
}

@ApiTags('About')
@ApiBearerAuth()
@Controller('about')
class AboutController {
  constructor(private readonly svc: AboutGatewayService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get about section data' })
  getAbout() { return this.svc.getAbout() }

  @Put()
  @ApiOperation({ summary: 'Update about section (admin)' })
  updateAbout(@Body() dto: UpdateAboutDto) { return this.svc.updateAbout(dto) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.ABOUT, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-about', brokers: [broker] }, consumer: { groupId: 'gateway-about-group' } } }])],
  controllers: [AboutController],
  providers: [AboutGatewayService],
})
export class AboutModule {}
