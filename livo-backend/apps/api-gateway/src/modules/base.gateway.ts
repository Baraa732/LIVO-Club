import { Inject, NotFoundException } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { firstValueFrom, timeout, catchError, throwError } from 'rxjs'

export abstract class BaseGatewayService {
  protected async send<T>(client: ClientKafka, pattern: string, payload: unknown): Promise<T> {
    return firstValueFrom(
      client.send<T>(pattern, payload).pipe(
        timeout(8000),
        catchError(err => throwError(() => err)),
      ),
    )
  }
}
