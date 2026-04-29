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
exports.GalleryModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const common_3 = require("@nestjs/common");
const microservices_2 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
const base_gateway_1 = require("./base.gateway");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
let GalleryGatewayService = class GalleryGatewayService extends base_gateway_1.BaseGatewayService {
    constructor(client) {
        super();
        this.client = client;
    }
    async onModuleInit() {
        [common_2.KAFKA_TOPICS.GALLERY_GET_ALL, common_2.KAFKA_TOPICS.GALLERY_CREATE, common_2.KAFKA_TOPICS.GALLERY_UPDATE, common_2.KAFKA_TOPICS.GALLERY_DELETE]
            .forEach(t => this.client.subscribeToResponseOf(t));
        await this.client.connect();
    }
    getAll() { return this.send(this.client, common_2.KAFKA_TOPICS.GALLERY_GET_ALL, {}); }
    create(dto) { return this.send(this.client, common_2.KAFKA_TOPICS.GALLERY_CREATE, dto); }
    update(id, dto) { return this.send(this.client, common_2.KAFKA_TOPICS.GALLERY_UPDATE, { id, ...dto }); }
    remove(id) { return this.send(this.client, common_2.KAFKA_TOPICS.GALLERY_DELETE, { id }); }
};
GalleryGatewayService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, common_3.Inject)(common_2.SERVICES.GALLERY)),
    __metadata("design:paramtypes", [microservices_2.ClientKafka])
], GalleryGatewayService);
let GalleryController = class GalleryController {
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
    (0, swagger_1.ApiOperation)({ summary: 'Get all gallery items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "getAll", null);
__decorate([
    (0, common_3.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create gallery item' }),
    __param(0, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_2.CreateGalleryItemDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "create", null);
__decorate([
    (0, common_3.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update gallery item' }),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_3.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_2.UpdateGalleryItemDto]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "update", null);
__decorate([
    (0, common_3.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete gallery item' }),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "remove", null);
GalleryController = __decorate([
    (0, swagger_1.ApiTags)('Gallery'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_3.Controller)('gallery'),
    __metadata("design:paramtypes", [GalleryGatewayService])
], GalleryController);
let GalleryModule = class GalleryModule {
};
exports.GalleryModule = GalleryModule;
exports.GalleryModule = GalleryModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_1.ClientsModule.register([{ name: common_2.SERVICES.GALLERY, transport: microservices_1.Transport.KAFKA, options: { client: { clientId: 'gateway-gallery', brokers: [broker] }, consumer: { groupId: 'gateway-gallery-group' } } }])],
        controllers: [GalleryController],
        providers: [GalleryGatewayService],
    })
], GalleryModule);
//# sourceMappingURL=gallery.module.js.map