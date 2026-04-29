import { bootstrapMicroservice } from '@livo/common'
import { CtaServiceModule } from './cta.module'
bootstrapMicroservice(CtaServiceModule, 'cta-service', 'cta-group', 'CtaService')
