import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common'

export async function bootstrapMicroservice(
  module: unknown,
  clientId: string,
  groupId: string,
  label: string,
) {
  const broker = process.env.KAFKA_BROKER || 'localhost:9092'
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(module as any, {
    transport: Transport.KAFKA,
    options: {
      client: { clientId, brokers: [broker] },
      consumer: { groupId },
    },
  })
  await app.listen()
  new Logger(label).log(`✅ ${label} microservice running`)
}
