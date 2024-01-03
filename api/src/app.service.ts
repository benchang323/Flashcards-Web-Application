// Path: src/app.service.ts
// Some components are refactored or modified from classwork

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
