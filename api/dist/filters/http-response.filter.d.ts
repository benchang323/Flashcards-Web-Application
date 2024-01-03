import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
export declare class HttpResponseFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
