// Path: src/cards/card-response.dto.ts

import { CardResponseDto } from "./card-response.dto";

export class FindCardsResponseDto {
  data: CardResponseDto[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}
