import { bootstrapMicroservice } from '@livo/common'
import { AboutServiceModule } from './about.module'
bootstrapMicroservice(AboutServiceModule, 'about-service', 'about-group', 'AboutService')
