// Path: src/cards/find-cards-query.dto.ts

import { IsOptional, IsInt, Min, IsString } from "class-validator";

export class FindCardsQueryDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @IsString()
  search?: string;
}
