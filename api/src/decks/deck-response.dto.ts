// Path: src/decks/deck-response.dto.ts
// Some components are refactored or modified from classwork

import { UserResponseDTO } from "src/user/user-response.dto";

export class DeckResponseDto {
  id: string;
  title: string;
  createdAt: Date;
  image?: string;
  numberOfCards: number;
  user?: UserResponseDTO;
}
