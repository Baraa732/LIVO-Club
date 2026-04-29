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
exports.RulesModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let RulesGatewayService = class RulesGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        this.client.subscribeToResponseOf(common_2.KAFKA_TOPICS.RULES_GET);
        this.client.subscribeToResponseOf(common_2.KAFKA_TOPICS.RULES_UPDATE);
        await this.client.connect();
    }
    getRules() { return this.send(this.client, common_2.KAFKA_TOPICS.RULES_GET, {}); }
    updateRules(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.RULES_UPDATE, dto); }
};
RulesGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.RULES)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], RulesGatewayService);
let RulesController = class RulesController {
    constructor(svc) {
        this.svc = svc;
    }
    getRules() { return this.svc.getRules(); }
    updateRules(dto) { return this.svc.updateRules(dto); }
};
__decorate([
    (0, common_2.Public)(),
    (0, common_3.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all rules' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "getRules", null);
__decorate([
    (0, common_3.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update rules (admin)' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "updateRules", null);
RulesController = __decorate([
    (0, swagger_1.ApiTags)('Rules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('rules'),
    __metadata("design:paramtypes", [RulesGatewayService])
], RulesController);
let RulesModule = class RulesModule {
};
exports.RulesModule = RulesModule;
exports.RulesModule = RulesModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.RULES, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-rules', brokers: [broker] }, consumer: { groupId: 'gateway-rules-group' } } }])],
        controllers: [RulesController],
        providers: [RulesGatewayService],
    })
], RulesModule);
//# sourceMappingURL=rules.module.js.map