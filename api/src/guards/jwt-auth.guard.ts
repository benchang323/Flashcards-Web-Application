// Path: src/guards/jwt-auth.guard.ts
// Some components are refactored or modified from classwork

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
