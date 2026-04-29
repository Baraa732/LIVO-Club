"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let EventsGatewayService = class EventsGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        [common_2.KAFKA_TOPICS.EVENTS_GET_ALL, common_2.KAFKA_TOPICS.EVENTS_CREATE, common_2.KAFKA_TOPICS.EVENTS_UPDATE, common_2.KAFKA_TOPICS.EVENTS_DELETE]
            .forEach(t => this.client.subscribeToResponseOf(t));
        await this.client.connect();
    }
    getAll() { return this.send(this.client, common_2.KAFKA_TOPICS.EVENTS_GET_ALL, {}); }
    create(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.EVENTS_CREATE, dto); }
    update(id, dto) { return this.send(this.client, common_2.KAFKA_TOPICS.EVENTS_UPDATE, { id, ...dto }); }
    remove(id) { return this.send(this.client, common_2.KAFKA_TOPICS.EVENTS_DELETE, { id }); }
};
EventsGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.EVENTS)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], EventsGatewayService);
let EventsController = class EventsController {
    constructor(svc) {
        this.svc = svc;
    }
    getAll() { return this.svc.getAll(); }
    create(dto) { return this.svc.create(dto); }
    update(id, dto) { return this.svc.update(id, dto); }
    remove(id) { return this.svc.remove(id); }
};
__decorate([
    (0, common_2.Public)(),
    (0, common_3.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all events' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getAll", null);
__decorate([
    (0, common_3.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create event (admin)' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_3.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update event (admin)' }),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_2.UpdateEventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_3.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete event (admin)' }),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
EventsController = __decorate([
    (0, swagger_1.ApiTags)('Events'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('events'),
    __metadata("design:paramtypes", [EventsGatewayService])
], EventsController);
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.EVENTS, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-events', brokers: [broker] }, consumer: { groupId: 'gateway-events-group' } } }])],
        controllers: [EventsController],
        providers: [EventsGatewayService],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map