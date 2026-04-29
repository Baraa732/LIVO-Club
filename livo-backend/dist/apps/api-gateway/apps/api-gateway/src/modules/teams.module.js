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
exports.TeamsModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let TeamsGatewayService = class TeamsGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        [common_2.KAFKA_TOPICS.TEAMS_GET_ALL, common_2.KAFKA_TOPICS.TEAMS_CREATE, common_2.KAFKA_TOPICS.TEAMS_UPDATE, common_2.KAFKA_TOPICS.TEAMS_DELETE]
            .forEach(t => this.client.subscribeToResponseOf(t));
        await this.client.connect();
    }
    getAll() { return this.send(this.client, common_2.KAFKA_TOPICS.TEAMS_GET_ALL, {}); }
    create(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.TEAMS_CREATE, dto); }
    update(rank, dto) { return this.send(this.client, common_2.KAFKA_TOPICS.TEAMS_UPDATE, { rank, ...dto }); }
    remove(rank) { return this.send(this.client, common_2.KAFKA_TOPICS.TEAMS_DELETE, { rank }); }
};
TeamsGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.TEAMS)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], TeamsGatewayService);
let TeamsController = class TeamsController {
    constructor(svc) {
        this.svc = svc;
    }
    getAll() { return this.svc.getAll(); }
    create(dto) { return this.svc.create(dto); }
    update(rank, dto) { return this.svc.update(rank, dto); }
    remove(rank) { return this.svc.remove(rank); }
};
__decorate([
    (0, common_2.Public)(),
    (0, common_3.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all teams' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "getAll", null);
__decorate([
    (0, common_3.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create team' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateTeamDto]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_3.Put)(':rank'),
    (0, swagger_1.ApiOperation)({ summary: 'Update team' }),
    __param(0, (0, common_3.Param)('rank')),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_2.UpdateTeamDto]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_3.Delete)(':rank'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete team' }),
    __param(0, (0, common_3.Param)('rank')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "remove", null);
TeamsController = __decorate([
    (0, swagger_1.ApiTags)('Teams'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('teams'),
    __metadata("design:paramtypes", [TeamsGatewayService])
], TeamsController);
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.TEAMS, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-teams', brokers: [broker] }, consumer: { groupId: 'gateway-teams-group' } } }])],
        controllers: [TeamsController],
        providers: [TeamsGatewayService],
    })
], TeamsModule);
//# sourceMappingURL=teams.module.js.map