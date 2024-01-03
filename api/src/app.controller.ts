// Path: src/app.controller.ts
// Some components are refactored or modified from classwork

import { AppService } from "./app.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
