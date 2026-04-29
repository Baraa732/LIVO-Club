"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapMicroservice = bootstrapMicroservice;
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrapMicroservice(module, clientId, groupId, label) {
    const broker = process.env.KAFKA_BROKER || 'localhost:9092';
    const app = await core_1.NestFactory.createMicroservice(module, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: { clientId, brokers: [broker] },
            consumer: { groupId },
        },
    });
    await app.listen();
    new common_1.Logger(label).log(`✅ ${label} microservice running`);
}
//# sourceMappingURL=bootstrap.js.map