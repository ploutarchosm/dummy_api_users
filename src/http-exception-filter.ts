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
      let message: any;
        if (exception.getResponse) {
          message = exception.getResponse();
        } else if (exception.message) {
          message = exception.message
        } else {
          message =  'Internal Server Error';
        }
    
      if (typeof message === 'object' && message['message']) {
        message = message['message'];
      }
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }