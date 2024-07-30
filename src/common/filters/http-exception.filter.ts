import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Check if the response is an object or a string
    const message =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message
        : exceptionResponse;

    // Optional: Include any additional response data if available
    const data =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).data || null
        : null;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      data: data,
    });
  }
}
