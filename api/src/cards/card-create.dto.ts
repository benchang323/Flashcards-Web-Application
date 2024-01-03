// Path: src/cards/card-create.dto.ts

import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  front: string;

  @IsString()
  @IsNotEmpty()
  back: string;
}
