import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, CreateChampionDto, UpdateChampionDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class ChampionsGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.CHAMPIONS) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    [KAFKA_TOPICS.CHAMPIONS_GET_ALL, KAFKA_TOPICS.CHAMPIONS_CREATE, KAFKA_TOPICS.CHAMPIONS_UPDATE, KAFKA_TOPICS.CHAMPIONS_DELETE]
      .forEach(t => this.client.subscribeToResponseOf(t))
    await this.client.connect()
  }

  getAll()                                        { return this.send(this.client, KAFKA_TOPICS.CHAMPIONS_GET_ALL, {}) }
  create(dto: CreateChampionDto)                  { return this.send(this.client, KAFKA_TOPICS.CHAMPIONS_CREATE, dto) }
  update(id: string, dto: UpdateChampionDto)      { return this.send(this.client, KAFKA_TOPICS.CHAMPIONS_UPDATE, { id, ...dto }) }
  remove(id: string)                              { return this.send(this.client, KAFKA_TOPICS.CHAMPIONS_DELETE, { id }) }
}

@ApiTags('Champions')
@ApiBearerAuth()
@Controller('champions')
class ChampionsController {
  constructor(private readonly svc: ChampionsGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get all champions' })    getAll()                                              { return this.svc.getAll() }
  @Post()             @ApiOperation({ summary: 'Create champion' })      create(@Body() dto: CreateChampionDto)                { return this.svc.create(dto) }
  @Put(':id')         @ApiOperation({ summary: 'Update champion' })      update(@Param('id') id: string, @Body() dto: UpdateChampionDto) { return this.svc.update(id, dto) }
  @Delete(':id')      @ApiOperation({ summary: 'Delete champion' })      remove(@Param('id') id: string)                       { return this.svc.remove(id) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.CHAMPIONS, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-champions', brokers: [broker] }, consumer: { groupId: 'gateway-champions-group' } } }])],
  controllers: [ChampionsController],
  providers: [ChampionsGatewayService],
})
export class ChampionsModule {}
