"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const common_2 = require("@livo/common");
async function bootstrap() {
    const logger = new common_1.Logger('API-Gateway');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: [
            process.env.WEBSITE_URL || 'http://localhost:3000',
            process.env.DASHBOARD_URL || 'http://localhost:3001',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new common_2.GlobalExceptionFilter());
    app.useGlobalInterceptors(new common_2.TransformInterceptor(), new common_2.TimeoutInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LIVO Club API')
        .setDescription('Full API for LIVO Club website and dashboard')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth')
        .addTag('Hero')
        .addTag('About')
        .addTag('Events')
        .addTag('Games')
        .addTag('Teams')
        .addTag('Champions')
        .addTag('Gallery')
        .addTag('Rules')
        .addTag('Tournament')
        .addTag('CTA')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.GATEWAY_PORT || 4000;
    await app.listen(port);
    logger.log(`🚀 API Gateway running on http://localhost:${port}/api/v1`);
    logger.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map