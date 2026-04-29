import { bootstrapMicroservice } from '@livo/common'
import { TeamsServiceModule } from './teams.module'
bootstrapMicroservice(TeamsServiceModule, 'teams-service', 'teams-group', 'TeamsService')
