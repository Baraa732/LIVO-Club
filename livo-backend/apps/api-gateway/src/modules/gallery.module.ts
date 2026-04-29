import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES, KAFKA_TOPICS, CreateGalleryItemDto, UpdateGalleryItemDto, Public } from '@livo/common'
import { Inject, Injectable, Controller, Get, Post, Put, Delete, Body, Param, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { BaseGatewayService } from './base.gateway'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

@Injectable()
class GalleryGatewayService extends BaseGatewayService implements OnModuleInit {
  constructor(@Inject(SERVICES.GALLERY) private readonly client: ClientKafka) { super() }

  async onModuleInit() {
    [KAFKA_TOPICS.GALLERY_GET_ALL, KAFKA_TOPICS.GALLERY_CREATE, KAFKA_TOPICS.GALLERY_UPDATE, KAFKA_TOPICS.GALLERY_DELETE]
      .forEach(t => this.client.subscribeToResponseOf(t))
    await this.client.connect()
  }

  getAll()                                          { return this.send(this.client, KAFKA_TOPICS.GALLERY_GET_ALL, {}) }
  create(dto: CreateGalleryItemDto)                 { return this.send(this.client, KAFKA_TOPICS.GALLERY_CREATE, dto) }
  update(id: number, dto: UpdateGalleryItemDto)     { return this.send(this.client, KAFKA_TOPICS.GALLERY_UPDATE, { id, ...dto }) }
  remove(id: number)                                { return this.send(this.client, KAFKA_TOPICS.GALLERY_DELETE, { id }) }
}

@ApiTags('Gallery')
@ApiBearerAuth()
@Controller('gallery')
class GalleryController {
  constructor(private readonly svc: GalleryGatewayService) {}

  @Public() @Get()    @ApiOperation({ summary: 'Get all gallery items' })    getAll()                                                { return this.svc.getAll() }
  @Post()             @ApiOperation({ summary: 'Create gallery item' })      create(@Body() dto: CreateGalleryItemDto)               { return this.svc.create(dto) }
  @Put(':id')         @ApiOperation({ summary: 'Update gallery item' })      update(@Param('id') id: number, @Body() dto: UpdateGalleryItemDto) { return this.svc.update(id, dto) }
  @Delete(':id')      @ApiOperation({ summary: 'Delete gallery item' })      remove(@Param('id') id: number)                         { return this.svc.remove(id) }
}

@Module({
  imports: [ClientsModule.register([{ name: SERVICES.GALLERY, transport: Transport.KAFKA, options: { client: { clientId: 'gateway-gallery', brokers: [broker] }, consumer: { groupId: 'gateway-gallery-group' } } }])],
  controllers: [GalleryController],
  providers: [GalleryGatewayService],
})
export class GalleryModule {}
