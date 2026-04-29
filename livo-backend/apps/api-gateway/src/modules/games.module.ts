import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, CreateGameDto, UpdateGameDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class GamesGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.GAMES) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    [KAFKA_TOPICS.GAMES_GET_ALL, KAFKA_TOPICS.GAMES_CREATE, KAFKA_TOPICS.GAMES_UPDATE, KAFKA_TOPICS.GAMES_DELETE]
      .forEach(t => this.client.subscribeToResponseOf(t))
    await this.client.connect()
  }

  getAll()                                  { return this.send(this.client, KAFKA_TOPICS.GAMES_GET_ALL, {}) }
  create(dto: CreateGameDto)                { return this.send(this.client, KAFKA_TOPICS.GAMES_CREATE, dto) }
  update(id: string, dto: UpdateGameDto)    { return this.send(this.client, KAFKA_TOPICS.GAMES_UPDATE, { id, ...dto }) }
  remove(id: string)                        { return this.send(this.client, KAFKA_TOPICS.GAMES_DELETE, { id }) }
}

@ApiTags('Games')
@ApiBearerAuth()
@Controller('games')
class GamesController {
  constructor(private readonly svc: GamesGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get all games' })    getAll()                                        { return this.svc.getAll() }
  @Post()             @ApiOperation({ summary: 'Create game' })      create(@Body() dto: CreateGameDto)              { return this.svc.create(dto) }
  @Put(':id')         @ApiOperation({ summary: 'Update game' })      update(@Param('id') id: string, @Body() dto: UpdateGameDto) { return this.svc.update(id, dto) }
  @Delete(':id')      @ApiOperation({ summary: 'Delete game' })      remove(@Param('id') id: string)                 { return this.svc.remove(id) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.GAMES, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-games', brokers: [broker] }, consumer: { groupId: 'gateway-games-group' } } }])],
  controllers: [GamesController],
  providers: [GamesGatewayService],
})
export class GamesModule {}
