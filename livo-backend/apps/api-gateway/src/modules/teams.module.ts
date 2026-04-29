import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, CreateTeamDto, UpdateTeamDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class TeamsGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.TEAMS) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    [KAFKA_TOPICS.TEAMS_GET_ALL, KAFKA_TOPICS.TEAMS_CREATE, KAFKA_TOPICS.TEAMS_UPDATE, KAFKA_TOPICS.TEAMS_DELETE]
      .forEach(t => this.client.subscribeToResponseOf(t))
    await this.client.connect()
  }

  getAll()                                    { return this.send(this.client, KAFKA_TOPICS.TEAMS_GET_ALL, {}) }
  create(dto: CreateTeamDto)                  { return this.send(this.client, KAFKA_TOPICS.TEAMS_CREATE, dto) }
  update(rank: number, dto: UpdateTeamDto)    { return this.send(this.client, KAFKA_TOPICS.TEAMS_UPDATE, { rank, ...dto }) }
  remove(rank: number)                        { return this.send(this.client, KAFKA_TOPICS.TEAMS_DELETE, { rank }) }
}

@ApiTags('Teams')
@ApiBearerAuth()
@Controller('teams')
class TeamsController {
  constructor(private readonly svc: TeamsGatewayService) {}

  @Public() @Get()        @ApiOperation({ summary: 'Get all teams' })    getAll()                                              { return this.svc.getAll() }
  @Post()                 @ApiOperation({ summary: 'Create team' })      create(@Body() dto: CreateTeamDto)                    { return this.svc.create(dto) }
  @Put(':rank')           @ApiOperation({ summary: 'Update team' })      update(@Param('rank') rank: number, @Body() dto: UpdateTeamDto) { return this.svc.update(rank, dto) }
  @Delete(':rank')        @ApiOperation({ summary: 'Delete team' })      remove(@Param('rank') rank: number)                   { return this.svc.remove(rank) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.TEAMS, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-teams', brokers: [broker] }, consumer: { groupId: 'gateway-teams-group' } } }])],
  controllers: [TeamsController],
  providers: [TeamsGatewayService],
})
export class TeamsModule {}
