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
exports.ChampionsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let ChampionsGatewayService = class ChampionsGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        [common_2.KAFKA_TOPICS.CHAMPIONS_GET_ALL, common_2.KAFKA_TOPICS.CHAMPIONS_CREATE, common_2.KAFKA_TOPICS.CHAMPIONS_UPDATE, common_2.KAFKA_TOPICS.CHAMPIONS_DELETE]
            .forEach(t => this.client.subscribeToResponseOf(t));
        await this.client.connect();
    }
    getAll() { return this.send(this.client, common_2.KAFKA_TOPICS.CHAMPIONS_GET_ALL, {}); }
    create(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.CHAMPIONS_CREATE, dto); }
    update(id, dto) { return this.send(this.client, common_2.KAFKA_TOPICS.CHAMPIONS_UPDATE, { id, ...dto }); }
    remove(id) { return this.send(this.client, common_2.KAFKA_TOPICS.CHAMPIONS_DELETE, { id }); }
};
ChampionsGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.CHAMPIONS)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], ChampionsGatewayService);
let ChampionsController = class ChampionsController {
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all champions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChampionsController.prototype, "getAll", null);
__decorate([
    (0, common_3.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create champion' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateChampionDto]),
    __metadata("design:returntype", void 0)
], ChampionsController.prototype, "create", null);
__decorate([
    (0, common_3.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update champion' }),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_2.UpdateChampionDto]),
    __metadata("design:returntype", void 0)
], ChampionsController.prototype, "update", null);
__decorate([
    (0, common_3.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete champion' }),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChampionsController.prototype, "remove", null);
ChampionsController = __decorate([
    (0, swagger_1.ApiTags)('Champions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('champions'),
    __metadata("design:paramtypes", [ChampionsGatewayService])
], ChampionsController);
let ChampionsModule = class ChampionsModule {
};
exports.ChampionsModule = ChampionsModule;
exports.ChampionsModule = ChampionsModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.CHAMPIONS, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-champions', brokers: [broker] }, consumer: { groupId: 'gateway-champions-group' } } }])],
        controllers: [ChampionsController],
        providers: [ChampionsGatewayService],
    })
], ChampionsModule);
//# sourceMappingURL=champions.module.js.map