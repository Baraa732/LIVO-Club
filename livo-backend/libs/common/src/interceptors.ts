import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map, timeout } from 'rxjs/operators'
import { ApiResponse } from './response'

// ─── Response Transform Interceptor ──────────────────────────────────────────
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        if (data instanceof ApiResponse) return data
        return ApiResponse.ok(data)
      }),
    )
  }
}

// ─── Timeout Interceptor ──────────────────────────────────────────────────────
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(10000),
      catchError(err => {
        if (err.name === 'TimeoutError') {
          return throwError(() => new HttpException('Request timeout', HttpStatus.GATEWAY_TIMEOUT))
        }
        return throwError(() => err)
      }),
    )
  }
}
