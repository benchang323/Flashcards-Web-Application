// Path: src/decks/deck-create.dto.ts
// Some components are refactored or modified from classwork

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDeckDto {
  @IsString()
  @IsNotEmpty({ message: "The title can't be empty." })
  title: string;

  @IsOptional()
  @IsString()
  image?: string;
}
