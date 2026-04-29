import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { GlobalExceptionFilter, TransformInterceptor, TimeoutInterceptor } from '@livo/common'

async function bootstrap() {
  const logger = new Logger('API-Gateway')
  const app = await NestFactory.create(AppModule)

  // ── Global Prefix ──────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1')

  // ── CORS ───────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: [
      process.env.WEBSITE_URL || 'http://localhost:3000',
      process.env.DASHBOARD_URL || 'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  // ── Global Pipes ───────────────────────────────────────────────────────────
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }))

  // ── Global Filters & Interceptors ──────────────────────────────────────────
  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor(), new TimeoutInterceptor())

  // ── Swagger ────────────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
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
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.GATEWAY_PORT || 4000
  await app.listen(port)
  logger.log(`🚀 API Gateway running on http://localhost:${port}/api/v1`)
  logger.log(`📚 Swagger docs at http://localhost:${port}/api/docs`)
}

bootstrap()
