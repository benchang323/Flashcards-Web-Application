// Path: src/cards/card-update.dto.ts

import { IsOptional, IsString } from "class-validator";

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  front?: string;

  @IsOptional()
  @IsString()
  back?: string;
}
