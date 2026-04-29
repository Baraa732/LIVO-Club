import { bootstrapMicroservice } from '@livo/common'
import { GamesServiceModule } from './games.module'
bootstrapMicroservice(GamesServiceModule, 'games-service', 'games-group', 'GamesService')
