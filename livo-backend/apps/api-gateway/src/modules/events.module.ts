import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, CreateEventDto, UpdateEventDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class EventsGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.EVENTS) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    [KAFKA_TOPICS.EVENTS_GET_ALL, KAFKA_TOPICS.EVENTS_CREATE, KAFKA_TOPICS.EVENTS_UPDATE, KAFKA_TOPICS.EVENTS_DELETE]
      .forEach(t => this.client.subscribeToResponseOf(t))
    await this.client.connect()
  }

  getAll()                                    { return this.send(this.client, KAFKA_TOPICS.EVENTS_GET_ALL, {}) }
  create(dto: CreateEventDto)                 { return this.send(this.client, KAFKA_TOPICS.EVENTS_CREATE, dto) }
  update(id: string, dto: UpdateEventDto)     { return this.send(this.client, KAFKA_TOPICS.EVENTS_UPDATE, { id, ...dto }) }
  remove(id: string)                          { return this.send(this.client, KAFKA_TOPICS.EVENTS_DELETE, { id }) }
}

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
class EventsController {
  constructor(private readonly svc: EventsGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get all events' })                    getAll()                                          { return this.svc.getAll() }
  @Post()             @ApiOperation({ summary: 'Create event (admin)' })              create(@Body() dto: CreateEventDto)               { return this.svc.create(dto) }
  @Put(':id')         @ApiOperation({ summary: 'Update event (admin)' })              update(@Param('id') id: string, @Body() dto: UpdateEventDto) { return this.svc.update(id, dto) }
  @Delete(':id')      @ApiOperation({ summary: 'Delete event (admin)' })              remove(@Param('id') id: string)                   { return this.svc.remove(id) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.EVENTS, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-events', brokers: [broker] }, consumer: { groupId: 'gateway-events-group' } } }])],
  controllers: [EventsController],
  providers: [EventsGatewayService],
})
export class EventsModule {}
