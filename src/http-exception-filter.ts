import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;
    let message = exception.getResponse
      ? exception.getResponse()
      : exception.message
        ? exception.message
        : 'Internal Server Error';

    if (typeof message === 'object' && message['message']) {
      message = message['message'];
    }
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
