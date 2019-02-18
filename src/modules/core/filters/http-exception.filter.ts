import { HttpException, ExceptionFilter, Catch, HttpStatus, ArgumentsHost } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message || 'exception filter';
    response
    .status(status)
    .json({
      error: {
        message,
        statusCode: status,
      },
    });
  }
}
