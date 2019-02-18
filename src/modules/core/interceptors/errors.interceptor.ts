import {
  Injectable, NestInterceptor, ExecutionContext, HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorsService } from '../../shared/errors/errors.service';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  
  constructor(
    private errorsService: ErrorsService,
  ) {
  }
  
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    return call$.pipe(
      catchError(err => {
        const error = this.errorsService.parse(err);
        return throwError(
          new HttpException(
            error.message || error.response,
            error.status || error.statusCode || error.errorNumber,
          ),
        );
      }),
    );
  }
  
}
