import { bootstrapMicroservice } from '@livo/common'
import { ChampionsServiceModule } from './champions.module'
bootstrapMicroservice(ChampionsServiceModule, 'champions-service', 'champions-group', 'ChampionsService')
