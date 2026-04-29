import { bootstrapMicroservice } from '@livo/common'
import { GalleryServiceModule } from './gallery.module'
bootstrapMicroservice(GalleryServiceModule, 'gallery-service', 'gallery-group', 'GalleryService')
