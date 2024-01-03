// Path: src/guards/deck-owner.guard.ts
// Some components are refactored or modified from classwork

import { Reflector } from "@nestjs/core";
import { DecksService } from "src/decks/decks.service";
import { RequestWithUser } from "src/decorators/user-id.decorator";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class DeckOwnershipGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private decksService: DecksService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new BadRequestException("User not authenticated.");
    }

    const user = (request as RequestWithUser).user;
    const userId = user.userId;
    const deckId = request.params.id;

    if (!deckId) {
      throw new BadRequestException("Invalid/missing deck ID.");
    }

    const deck = await this.decksService.findOne(deckId, userId);

    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found.`);
    }

    if (deck.userId === userId) {
      return true;
    } else {
      throw new BadRequestException("User does not have ownership of deck.");
    }
  }
}
