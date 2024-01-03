// Path: src/filters/http-response.filter.ts
// Some components are refactored or modified from classwork

import { Response } from "express";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: (exceptionResponse as any).message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
