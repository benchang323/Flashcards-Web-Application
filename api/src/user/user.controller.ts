// Path: src/user/user.controller.ts
// Some components are refactored or modified from classwork

import { UserService } from "./user.service";
import { UserLoginDTO } from "./user-login.dto";
import { CreateUserDTO } from "./create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { UserResponseDTO } from "./user-response.dto";
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from "@nestjs/common";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() userLoginDto: UserLoginDTO): Promise<{
    access_token: string;
  }> {
    const user = await this.authService.validateUser(
      userLoginDto.username,
      userLoginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials.");
    }
    return this.authService.login(user);
  }

  @Post("register")
  async createUser(
    @Body()
    userDto: CreateUserDTO,
  ): Promise<UserResponseDTO> {
    try {
      const user = await this.userService.createUser(userDto);
      delete user.password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
