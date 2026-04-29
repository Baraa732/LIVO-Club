import { bootstrapMicroservice } from '@livo/common'
import { RulesServiceModule } from './rules.module'
bootstrapMicroservice(RulesServiceModule, 'rules-service', 'rules-group', 'RulesService')
