// Path: src/interceptors/http-response.interceptor.ts
// Some components are refactored or modified from classwork

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (response && "data" in response) {
          return {
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: "Success",
            ...response,
          };
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: "Success",
          data: response,
        };
      }),
    );
  }
}
