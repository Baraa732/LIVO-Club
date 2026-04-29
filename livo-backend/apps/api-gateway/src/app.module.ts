import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { SERVICES } from '@livo/common'
import { AuthModule } from './auth/auth.module'
import { HeroModule } from './modules/hero.module'
import { AboutModule } from './modules/about.module'
import { EventsModule } from './modules/events.module'
import { GamesModule } from './modules/games.module'
import { TeamsModule } from './modules/teams.module'
import { ChampionsModule } from './modules/champions.module'
import { GalleryModule } from './modules/gallery.module'
import { RulesModule } from './modules/rules.module'
import { TournamentModule } from './modules/tournament.module'
import { CtaModule } from './modules/cta.module'
import { HealthController } from './health.controller'

const broker = process.env.KAFKA_BROKER || 'localhost:9092'

const makeKafkaClient = (name: string, clientId: string, groupId: string) => ({
  name,
  transport: Transport.KAFKA as any,
  options: {
    client: { clientId, brokers: [broker] },
    consumer: { groupId },
  },
} as any)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),

    ClientsModule.register([
      makeKafkaClient(SERVICES.HERO,       'gateway-hero',       'gateway-hero-group'),
      makeKafkaClient(SERVICES.EVENTS,     'gateway-events',     'gateway-events-group'),
      makeKafkaClient(SERVICES.GAMES,      'gateway-games',      'gateway-games-group'),
      makeKafkaClient(SERVICES.TEAMS,      'gateway-teams',      'gateway-teams-group'),
      makeKafkaClient(SERVICES.CHAMPIONS,  'gateway-champions',  'gateway-champions-group'),
      makeKafkaClient(SERVICES.GALLERY,    'gateway-gallery',    'gateway-gallery-group'),
      makeKafkaClient(SERVICES.RULES,      'gateway-rules',      'gateway-rules-group'),
      makeKafkaClient(SERVICES.TOURNAMENT, 'gateway-tournament', 'gateway-tournament-group'),
      makeKafkaClient(SERVICES.CTA,        'gateway-cta',        'gateway-cta-group'),
      makeKafkaClient(SERVICES.ABOUT,      'gateway-about',      'gateway-about-group'),
    ]),

    AuthModule,
    HeroModule,
    AboutModule,
    EventsModule,
    GamesModule,
    TeamsModule,
    ChampionsModule,
    GalleryModule,
    RulesModule,
    TournamentModule,
    CtaModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
