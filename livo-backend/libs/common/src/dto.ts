import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsEnum, Min } from 'class-validator'
import { Type } from 'class-transformer'

// ─── Hero ─────────────────────────────────────────────────────────────────────
export class HeroStatDto {
  @IsNumber() value: number
  @IsString() suffix: string
  @IsString() label: string
}

export class UpdateHeroDto {
  @IsString() @IsNotEmpty() badge: string
  @IsString() line1: string
  @IsString() line2: string
  @IsString() line3: string
  @IsString() description: string
  @IsString() ctaLabel: string
  @IsString() videoLabel: string
  @IsArray() stats: HeroStatDto[]
}

// ─── About ────────────────────────────────────────────────────────────────────
export class AboutPillarDto {
  @IsString() icon: string
  @IsString() title: string
  @IsString() desc: string
}

export class UpdateAboutDto {
  @IsString() badge: string
  @IsString() title: string
  @IsString() titleGradient: string
  @IsString() desc1: string
  @IsString() desc2: string
  @IsString() foundedYear: string
  @IsArray() pillars: AboutPillarDto[]
}

// ─── Event ────────────────────────────────────────────────────────────────────
export class CreateEventDto {
  @IsString() @IsNotEmpty() day: string
  @IsString() @IsNotEmpty() month: string
  @IsString() @IsNotEmpty() title: string
  @IsString() mode: string
  @IsString() type: string
  @IsString() spots: string
  @IsString() color: string
}

export class UpdateEventDto {
  @IsString() @IsOptional() day?: string
  @IsString() @IsOptional() month?: string
  @IsString() @IsOptional() title?: string
  @IsString() @IsOptional() mode?: string
  @IsString() @IsOptional() type?: string
  @IsString() @IsOptional() spots?: string
  @IsString() @IsOptional() color?: string
}

// ─── Game ─────────────────────────────────────────────────────────────────────
export class CreateGameDto {
  @IsString() @IsNotEmpty() id: string
  @IsString() @IsNotEmpty() name: string
  @IsString() category: string
  @IsString() players: string
  @IsString() color: string
  @IsString() emoji: string
  @IsString() image: string
  @IsString() desc: string
  @IsArray() tags: string[]
  @IsNumber() activePlayers: number
  @IsNumber() tournaments: number
}

export class UpdateGameDto {
  @IsString() @IsOptional() name?: string
  @IsString() @IsOptional() category?: string
  @IsString() @IsOptional() players?: string
  @IsString() @IsOptional() color?: string
  @IsString() @IsOptional() emoji?: string
  @IsString() @IsOptional() image?: string
  @IsString() @IsOptional() desc?: string
  @IsArray() @IsOptional() tags?: string[]
  @IsNumber() @IsOptional() activePlayers?: number
  @IsNumber() @IsOptional() tournaments?: number
}

// ─── Team ─────────────────────────────────────────────────────────────────────
export type TeamStatus = 'Champion' | 'Qualified' | 'Pending' | 'Eliminated'

export class CreateTeamDto {
  @IsNumber() rank: number
  @IsString() @IsNotEmpty() name: string
  @IsString() game: string
  @IsNumber() players: number
  @IsNumber() w: number
  @IsNumber() l: number
  @IsNumber() pts: number
  @IsString() status: TeamStatus
}

export class UpdateTeamDto {
  @IsString() @IsOptional() name?: string
  @IsString() @IsOptional() game?: string
  @IsNumber() @IsOptional() players?: number
  @IsNumber() @IsOptional() w?: number
  @IsNumber() @IsOptional() l?: number
  @IsNumber() @IsOptional() pts?: number
  @IsString() @IsOptional() status?: TeamStatus
}

// ─── Champion ─────────────────────────────────────────────────────────────────
export class CreateChampionDto {
  @IsString() @IsNotEmpty() name: string
  @IsString() title: string
  @IsString() season: string
  @IsString() game: string
  @IsNumber() rank: number
}

export class UpdateChampionDto {
  @IsString() @IsOptional() name?: string
  @IsString() @IsOptional() title?: string
  @IsString() @IsOptional() season?: string
  @IsString() @IsOptional() game?: string
  @IsNumber() @IsOptional() rank?: number
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export type GallerySize = 'large' | 'medium' | 'small'

export class CreateGalleryItemDto {
  @IsString() @IsNotEmpty() label: string
  @IsString() size: GallerySize
  @IsString() color: string
}

export class UpdateGalleryItemDto {
  @IsString() @IsOptional() label?: string
  @IsString() @IsOptional() size?: GallerySize
  @IsString() @IsOptional() color?: string
}

// ─── Rules ────────────────────────────────────────────────────────────────────
export class RuleItemDto {
  @IsString() title: string
  @IsString() desc: string
}

export class RuleSectionDto {
  @IsString() category: string
  @IsArray() rules: RuleItemDto[]
}

// ─── Tournament ───────────────────────────────────────────────────────────────
export class TournamentMetaDto {
  @IsString() name: string
  @IsString() season: string
  @IsString() prizePool: string
  @IsString() game: string
  @IsString() format: string
  @IsNumber() teams: number
  @IsString() startDate: string
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export class UpdateCtaDto {
  @IsString() badge: string
  @IsString() title: string
  @IsString() titleGradient: string
  @IsString() description: string
  @IsArray() perks: string[]
  @IsString() btnLabel: string
  @IsString() card1Icon: string
  @IsString() card1Title: string
  @IsString() card1Sub: string
  @IsString() card2Icon: string
  @IsString() card2Title: string
  @IsString() card2Sub: string
  @IsString() card3Icon: string
  @IsString() card3Title: string
  @IsString() card3Sub: string
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export class LoginDto {
  @IsString() @IsNotEmpty() email: string
  @IsString() @IsNotEmpty() password: string
}
