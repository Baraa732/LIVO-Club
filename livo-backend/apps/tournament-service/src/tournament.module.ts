import { Module } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Controller, Injectable } from '@nestjs/common'
import { KAFKA_TOPICS } from '@livo/common'

@Injectable()
class TournamentRepository {
  private data = {
    meta: { name: 'CS2 Championship', season: 'Spring 2026', prizePool: '500 JD', game: 'CS2', format: 'Single Elimination', teams: 8, startDate: 'Feb 15, 2026' },
    bracket: [
      { id: 'qf', label: 'Quarter Finals', matches: [
        { id: 'qf1', team1: 'Alpha Squad', team2: 'Beta Force', score1: 2, score2: 0, status: 'done' },
        { id: 'qf2', team1: 'Cyber Wolves', team2: 'Storm Riders', score1: 1, score2: 2, status: 'done' },
        { id: 'qf3', team1: 'Neon Hawks', team2: 'Dark Matter', score1: null, score2: null, status: 'live', time: 'NOW' },
        { id: 'qf4', team1: 'Iron Fist', team2: 'Ghost Protocol', score1: null, score2: null, status: 'upcoming', time: '18:00' },
      ]},
      { id: 'sf', label: 'Semi Finals', matches: [
        { id: 'sf1', team1: 'Alpha Squad', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
        { id: 'sf2', team1: 'TBD', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 20' },
      ]},
      { id: 'gf', label: 'Grand Final', matches: [{ id: 'gf1', team1: 'TBD', team2: 'TBD', score1: null, score2: null, status: 'upcoming', time: 'Feb 25' }] },
    ],
    standings: [
      { rank: 1, name: 'Alpha Squad', played: 1, w: 1, l: 0, pts: 3, status: 'qualified' },
      { rank: 2, name: 'Storm Riders', played: 1, w: 1, l: 0, pts: 3, status: 'qualified' },
      { rank: 3, name: 'Neon Hawks', played: 1, w: 0, l: 0, pts: 0, status: 'pending' },
      { rank: 7, name: 'Beta Force', played: 1, w: 0, l: 1, pts: -1, status: 'eliminated' },
    ],
    rules: [
      { title: 'Match Format', desc: 'Best of 3 maps for all rounds. Grand Final is Best of 5.' },
      { title: 'Check-in', desc: 'Teams must check in 15 minutes before their scheduled match.' },
      { title: 'Fair Play', desc: 'Any form of cheating results in disqualification.' },
    ],
  }
  find() { return this.data }
  update(dto: Partial<typeof this.data>) { this.data = { ...this.data, ...dto }; return this.data }
}

@Injectable()
class TournamentService {
  constructor(private readonly repo: TournamentRepository) {}
  get() { return this.repo.find() }
  update(dto: unknown) { return this.repo.update(dto as any) }
}

@Controller()
class TournamentController {
  constructor(private readonly svc: TournamentService) {}
  @MessagePattern(KAFKA_TOPICS.TOURNAMENT_GET)    get()                           { return this.svc.get() }
  @MessagePattern(KAFKA_TOPICS.TOURNAMENT_UPDATE) update(@Payload() dto: unknown) { return this.svc.update(dto) }
}

@Module({ controllers: [TournamentController], providers: [TournamentService, TournamentRepository] })
export class TournamentServiceModule {}
