// Path: src/auth/auth.service.ts
// Some components are refactored or modified from classwork

import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UserResponseDTO } from "src/user/user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDTO | null> {
    const user = await this.userService.findOne(username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: UserResponseDTO) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}