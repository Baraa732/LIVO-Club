"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@livo/common");
const auth_module_1 = require("./auth/auth.module");
const hero_module_1 = require("./modules/hero.module");
const about_module_1 = require("./modules/about.module");
const events_module_1 = require("./modules/events.module");
const games_module_1 = require("./modules/games.module");
const teams_module_1 = require("./modules/teams.module");
const champions_module_1 = require("./modules/champions.module");
const gallery_module_1 = require("./modules/gallery.module");
const rules_module_1 = require("./modules/rules.module");
const tournament_module_1 = require("./modules/tournament.module");
const cta_module_1 = require("./modules/cta.module");
const health_controller_1 = require("./health.controller");
const broker = process.env.KAFKA_BROKER || 'localhost:9092';
const makeKafkaClient = (name, clientId, groupId) => ({
    name,
    transport: microservices_1.Transport.KAFKA,
    options: {
        client: { clientId, brokers: [broker] },
        consumer: { groupId },
    },
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            microservices_1.ClientsModule.register([
                makeKafkaClient(common_2.SERVICES.HERO, 'gateway-hero', 'gateway-hero-group'),
                makeKafkaClient(common_2.SERVICES.EVENTS, 'gateway-events', 'gateway-events-group'),
                makeKafkaClient(common_2.SERVICES.GAMES, 'gateway-games', 'gateway-games-group'),
                makeKafkaClient(common_2.SERVICES.TEAMS, 'gateway-teams', 'gateway-teams-group'),
                makeKafkaClient(common_2.SERVICES.CHAMPIONS, 'gateway-champions', 'gateway-champions-group'),
                makeKafkaClient(common_2.SERVICES.GALLERY, 'gateway-gallery', 'gateway-gallery-group'),
                makeKafkaClient(common_2.SERVICES.RULES, 'gateway-rules', 'gateway-rules-group'),
                makeKafkaClient(common_2.SERVICES.TOURNAMENT, 'gateway-tournament', 'gateway-tournament-group'),
                makeKafkaClient(common_2.SERVICES.CTA, 'gateway-cta', 'gateway-cta-group'),
                makeKafkaClient(common_2.SERVICES.ABOUT, 'gateway-about', 'gateway-about-group'),
            ]),
            auth_module_1.AuthModule,
            hero_module_1.HeroModule,
            about_module_1.AboutModule,
            events_module_1.EventsModule,
            games_module_1.GamesModule,
            teams_module_1.TeamsModule,
            champions_module_1.ChampionsModule,
            gallery_module_1.GalleryModule,
            rules_module_1.RulesModule,
            tournament_module_1.TournamentModule,
            cta_module_1.CtaModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map