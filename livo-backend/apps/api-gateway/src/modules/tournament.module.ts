import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Put, Body, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class TournamentGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.TOURNAMENT) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    this.client.subscribeToResponseOf(KAFKA_TOPICS.TOURNAMENT_GET)
    this.client.subscribeToResponseOf(KAFKA_TOPICS.TOURNAMENT_UPDATE)
    await this.client.connect()
  }

  getTournament()           { return this.send(this.client, KAFKA_TOPICS.TOURNAMENT_GET, {}) }
  updateTournament(dto: unknown) { return this.send(this.client, KAFKA_TOPICS.TOURNAMENT_UPDATE, dto) }
}

@ApiTags('Tournament')
@ApiBearerAuth()
@Controller('tournament')
class TournamentController {
  constructor(private readonly svc: TournamentGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get tournament data' })      getTournament()                   { return this.svc.getTournament() }
  @Put()              @ApiOperation({ summary: 'Update tournament (admin)' }) updateTournament(@Body() dto: unknown) { return this.svc.updateTournament(dto) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.TOURNAMENT, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-tournament', brokers: [broker] }, consumer: { groupId: 'gateway-tournament-group' } } }])],
  controllers: [TournamentController],
  providers: [TournamentGatewayService],
})
export class TournamentModule {}
