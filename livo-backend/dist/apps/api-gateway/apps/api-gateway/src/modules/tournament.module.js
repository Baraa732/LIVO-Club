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
exports.TournamentModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let TournamentGatewayService = class TournamentGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        this.client.subscribeToResponseOf(common_2.KAFKA_TOPICS.TOURNAMENT_GET);
        this.client.subscribeToResponseOf(common_2.KAFKA_TOPICS.TOURNAMENT_UPDATE);
        await this.client.connect();
    }
    getTournament() { return this.send(this.client, common_2.KAFKA_TOPICS.TOURNAMENT_GET, {}); }
    updateTournament(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.TOURNAMENT_UPDATE, dto); }
};
TournamentGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.TOURNAMENT)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], TournamentGatewayService);
let TournamentController = class TournamentController {
    constructor(svc) {
        this.svc = svc;
    }
    getTournament() { return this.svc.getTournament(); }
    updateTournament(dto) { return this.svc.updateTournament(dto); }
};
__decorate([
    (0, common_2.Public)(),
    (0, common_3.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get tournament data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "getTournament", null);
__decorate([
    (0, common_3.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update tournament (admin)' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "updateTournament", null);
TournamentController = __decorate([
    (0, swagger_1.ApiTags)('Tournament'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('tournament'),
    __metadata("design:paramtypes", [TournamentGatewayService])
], TournamentController);
let TournamentModule = class TournamentModule {
};
exports.TournamentModule = TournamentModule;
exports.TournamentModule = TournamentModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.TOURNAMENT, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-tournament', brokers: [broker] }, consumer: { groupId: 'gateway-tournament-group' } } }])],
        controllers: [TournamentController],
        providers: [TournamentGatewayService],
    })
], TournamentModule);
//# sourceMappingURL=tournament.module.js.map