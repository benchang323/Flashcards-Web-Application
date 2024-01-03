// Path: src/main.ts
// Some components are refactored or modified from classwork

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpResponseFilter } from "./filters/http-response.filter";
import { HttpResponseInterceptor } from "./interceptors/http-response.interceptor";

console.log();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpResponseFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  await app.listen(3000);
}

bootstrap();
