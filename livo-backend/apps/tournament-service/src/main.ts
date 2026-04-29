import { bootstrapMicroservice } from '@livo/common'
import { TournamentServiceModule } from './tournament.module'
bootstrapMicroservice(TournamentServiceModule, 'tournament-service', 'tournament-group', 'TournamentService')
