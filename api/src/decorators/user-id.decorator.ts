// Path: src/decorators/user-id.decorator.ts
// Some components are refactored or modified from classwork

import { Request } from "express";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface RequestWithUser extends Request {
  user: {
    userId: number;
    username: string;
  };
}

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request as RequestWithUser).user;
    return user ? user.userId : null;
  },
);
