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
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let GamesGatewayService = class GamesGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        [common_2.KAFKA_TOPICS.GAMES_GET_ALL, common_2.KAFKA_TOPICS.GAMES_CREATE, common_2.KAFKA_TOPICS.GAMES_UPDATE, common_2.KAFKA_TOPICS.GAMES_DELETE]
            .forEach(t => this.client.subscribeToResponseOf(t));
        await this.client.connect();
    }
    getAll() { return this.send(this.client, common_2.KAFKA_TOPICS.GAMES_GET_ALL, {}); }
    create(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.GAMES_CREATE, dto); }
    update(id, dto) { return this.send(this.client, common_2.KAFKA_TOPICS.GAMES_UPDATE, { id, ...dto }); }
    remove(id) { return this.send(this.client, common_2.KAFKA_TOPICS.GAMES_DELETE, { id }); }
};
GamesGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.GAMES)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], GamesGatewayService);
let GamesController = class GamesController {
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all games' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getAll", null);
__decorate([
    (0, common_3.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create game' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateGameDto]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "create", null);
__decorate([
    (0, common_3.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update game' }),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, common_2.UpdateGameDto]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "update", null);
__decorate([
    (0, common_3.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete game' }),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "remove", null);
GamesController = __decorate([
    (0, swagger_1.ApiTags)('Games'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('games'),
    __metadata("design:paramtypes", [GamesGatewayService])
], GamesController);
let GamesModule = class GamesModule {
};
exports.GamesModule = GamesModule;
exports.GamesModule = GamesModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.GAMES, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-games', brokers: [broker] }, consumer: { groupId: 'gateway-games-group' } } }])],
        controllers: [GamesController],
        providers: [GamesGatewayService],
    })
], GamesModule);
//# sourceMappingURL=games.module.js.map