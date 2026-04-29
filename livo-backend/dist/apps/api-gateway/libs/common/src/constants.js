"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConfig = exports.SERVICES = exports.KAFKA_TOPICS = void 0;
exports.KAFKA_TOPICS = {
    HERO_GET: 'hero.get',
    HERO_UPDATE: 'hero.update',
    EVENTS_GET_ALL: 'events.getAll',
    EVENTS_CREATE: 'events.create',
    EVENTS_UPDATE: 'events.update',
    EVENTS_DELETE: 'events.delete',
    GAMES_GET_ALL: 'games.getAll',
    GAMES_CREATE: 'games.create',
    GAMES_UPDATE: 'games.update',
    GAMES_DELETE: 'games.delete',
    TEAMS_GET_ALL: 'teams.getAll',
    TEAMS_CREATE: 'teams.create',
    TEAMS_UPDATE: 'teams.update',
    TEAMS_DELETE: 'teams.delete',
    CHAMPIONS_GET_ALL: 'champions.getAll',
    CHAMPIONS_CREATE: 'champions.create',
    CHAMPIONS_UPDATE: 'champions.update',
    CHAMPIONS_DELETE: 'champions.delete',
    GALLERY_GET_ALL: 'gallery.getAll',
    GALLERY_CREATE: 'gallery.create',
    GALLERY_UPDATE: 'gallery.update',
    GALLERY_DELETE: 'gallery.delete',
    RULES_GET: 'rules.get',
    RULES_UPDATE: 'rules.update',
    TOURNAMENT_GET: 'tournament.get',
    TOURNAMENT_UPDATE: 'tournament.update',
    CTA_GET: 'cta.get',
    CTA_UPDATE: 'cta.update',
    ABOUT_GET: 'about.get',
    ABOUT_UPDATE: 'about.update',
};
exports.SERVICES = {
    HERO: 'HERO_SERVICE',
    EVENTS: 'EVENTS_SERVICE',
    GAMES: 'GAMES_SERVICE',
    TEAMS: 'TEAMS_SERVICE',
    CHAMPIONS: 'CHAMPIONS_SERVICE',
    GALLERY: 'GALLERY_SERVICE',
    RULES: 'RULES_SERVICE',
    TOURNAMENT: 'TOURNAMENT_SERVICE',
    CTA: 'CTA_SERVICE',
    ABOUT: 'ABOUT_SERVICE',
};
const kafkaConfig = (clientId, groupId) => ({
    transport: 4,
    options: {
        client: {
            clientId,
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        },
        consumer: { groupId },
    },
});
exports.kafkaConfig = kafkaConfig;
//# sourceMappingURL=constants.js.map