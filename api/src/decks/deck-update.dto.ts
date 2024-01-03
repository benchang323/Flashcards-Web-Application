// Path: src/decks/deck-update.dto.ts
// Some components are refactored or modified from classwork

import { IsOptional, IsString } from "class-validator";

export class UpdateDeckDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
