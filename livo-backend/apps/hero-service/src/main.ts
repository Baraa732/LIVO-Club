import { bootstrapMicroservice } from '@livo/common'
import { HeroServiceModule } from './hero.module'
bootstrapMicroservice(HeroServiceModule, 'hero-service', 'hero-group', 'HeroService')
