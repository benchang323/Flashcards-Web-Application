// Path: src/user/user-login.dto.ts
// Some components are refactored or modified from classwork

import { IsString, IsNotEmpty } from "class-validator";

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
