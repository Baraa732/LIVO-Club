export declare const KAFKA_TOPICS: {
    readonly HERO_GET: "hero.get";
    readonly HERO_UPDATE: "hero.update";
    readonly EVENTS_GET_ALL: "events.getAll";
    readonly EVENTS_CREATE: "events.create";
    readonly EVENTS_UPDATE: "events.update";
    readonly EVENTS_DELETE: "events.delete";
    readonly GAMES_GET_ALL: "games.getAll";
    readonly GAMES_CREATE: "games.create";
    readonly GAMES_UPDATE: "games.update";
    readonly GAMES_DELETE: "games.delete";
    readonly TEAMS_GET_ALL: "teams.getAll";
    readonly TEAMS_CREATE: "teams.create";
    readonly TEAMS_UPDATE: "teams.update";
    readonly TEAMS_DELETE: "teams.delete";
    readonly CHAMPIONS_GET_ALL: "champions.getAll";
    readonly CHAMPIONS_CREATE: "champions.create";
    readonly CHAMPIONS_UPDATE: "champions.update";
    readonly CHAMPIONS_DELETE: "champions.delete";
    readonly GALLERY_GET_ALL: "gallery.getAll";
    readonly GALLERY_CREATE: "gallery.create";
    readonly GALLERY_UPDATE: "gallery.update";
    readonly GALLERY_DELETE: "gallery.delete";
    readonly RULES_GET: "rules.get";
    readonly RULES_UPDATE: "rules.update";
    readonly TOURNAMENT_GET: "tournament.get";
    readonly TOURNAMENT_UPDATE: "tournament.update";
    readonly CTA_GET: "cta.get";
    readonly CTA_UPDATE: "cta.update";
    readonly ABOUT_GET: "about.get";
    readonly ABOUT_UPDATE: "about.update";
};
export declare const SERVICES: {
    readonly HERO: "HERO_SERVICE";
    readonly EVENTS: "EVENTS_SERVICE";
    readonly GAMES: "GAMES_SERVICE";
    readonly TEAMS: "TEAMS_SERVICE";
    readonly CHAMPIONS: "CHAMPIONS_SERVICE";
    readonly GALLERY: "GALLERY_SERVICE";
    readonly RULES: "RULES_SERVICE";
    readonly TOURNAMENT: "TOURNAMENT_SERVICE";
    readonly CTA: "CTA_SERVICE";
    readonly ABOUT: "ABOUT_SERVICE";
};
export declare const kafkaConfig: (clientId: string, groupId: string) => {
    transport: 4;
    options: {
        client: {
            clientId: string;
            brokers: string[];
        };
        consumer: {
            groupId: string;
        };
    };
};
