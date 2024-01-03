import { Observable } from "rxjs";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
