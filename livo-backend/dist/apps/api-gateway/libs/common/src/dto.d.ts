export declare class HeroStatDto {
    value: number;
    suffix: string;
    label: string;
}
export declare class UpdateHeroDto {
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    description: string;
    ctaLabel: string;
    videoLabel: string;
    stats: HeroStatDto[];
}
export declare class AboutPillarDto {
    icon: string;
    title: string;
    desc: string;
}
export declare class UpdateAboutDto {
    badge: string;
    title: string;
    titleGradient: string;
    desc1: string;
    desc2: string;
    foundedYear: string;
    pillars: AboutPillarDto[];
}
export declare class CreateEventDto {
    day: string;
    month: string;
    title: string;
    mode: string;
    type: string;
    spots: string;
    color: string;
}
export declare class UpdateEventDto {
    day?: string;
    month?: string;
    title?: string;
    mode?: string;
    type?: string;
    spots?: string;
    color?: string;
}
export declare class CreateGameDto {
    id: string;
    name: string;
    category: string;
    players: string;
    color: string;
    emoji: string;
    image: string;
    desc: string;
    tags: string[];
    activePlayers: number;
    tournaments: number;
}
export declare class UpdateGameDto {
    name?: string;
    category?: string;
    players?: string;
    color?: string;
    emoji?: string;
    image?: string;
    desc?: string;
    tags?: string[];
    activePlayers?: number;
    tournaments?: number;
}
export type TeamStatus = 'Champion' | 'Qualified' | 'Pending' | 'Eliminated';
export declare class CreateTeamDto {
    rank: number;
    name: string;
    game: string;
    players: number;
    w: number;
    l: number;
    pts: number;
    status: TeamStatus;
}
export declare class UpdateTeamDto {
    name?: string;
    game?: string;
    players?: number;
    w?: number;
    l?: number;
    pts?: number;
    status?: TeamStatus;
}
export declare class CreateChampionDto {
    name: string;
    title: string;
    season: string;
    game: string;
    rank: number;
}
export declare class UpdateChampionDto {
    name?: string;
    title?: string;
    season?: string;
    game?: string;
    rank?: number;
}
export type GallerySize = 'large' | 'medium' | 'small';
export declare class CreateGalleryItemDto {
    label: string;
    size: GallerySize;
    color: string;
}
export declare class UpdateGalleryItemDto {
    label?: string;
    size?: GallerySize;
    color?: string;
}
export declare class RuleItemDto {
    title: string;
    desc: string;
}
export declare class RuleSectionDto {
    category: string;
    rules: RuleItemDto[];
}
export declare class TournamentMetaDto {
    name: string;
    season: string;
    prizePool: string;
    game: string;
    format: string;
    teams: number;
    startDate: string;
}
export declare class UpdateCtaDto {
    badge: string;
    title: string;
    titleGradient: string;
    description: string;
    perks: string[];
    btnLabel: string;
    card1Icon: string;
    card1Title: string;
    card1Sub: string;
    card2Icon: string;
    card2Title: string;
    card2Sub: string;
    card3Icon: string;
    card3Title: string;
    card3Sub: string;
}
export declare class LoginDto {
    username: string;
    password: string;
}
