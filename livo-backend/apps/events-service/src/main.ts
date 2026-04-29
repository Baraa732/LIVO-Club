import { bootstrapMicroservice } from '@livo/common'
import { EventsServiceModule } from './events.module'
bootstrapMicroservice(EventsServiceModule, 'events-service', 'events-group', 'EventsService')
