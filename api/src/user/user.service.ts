// Path: src/user/user.service.ts
// Some components are refactored or modified from classwork

import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDTO): Promise<User> {
    const user = new User();
    user.username = userDto.username;
    user.password = await bcrypt.hash(userDto.password, 10);
    return this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }
}
