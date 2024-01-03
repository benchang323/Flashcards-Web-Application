// Path: src/cards/cards.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { Deck } from "src/decks/deck.entity";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DecksService } from "src/decks/decks.service";
@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private decksService: DecksService,
  ) {}

  async create(deckId: string, createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      deck: { id: deckId } as Deck,
    });
    const savedCard = await this.cardRepository.save(card);
    await this.decksService.incrementCardCount(deckId);
    return savedCard;
  }

  async remove(deckId: string, cardId: string): Promise<void> {
    const card = await this.cardRepository.findOneBy({
      id: cardId,
      deck: { id: deckId } as Deck,
    });
    if (!card) {
      throw new NotFoundException(
        `Card with ID ${cardId} not found in deck ${deckId}`,
      );
    }
    await this.cardRepository.remove(card);
    await this.decksService.decrementCardCount(deckId);
  }

  async findAll(
    deckId: string,
    limit?: number,
    offset?: number,
  ): Promise<Card[]> {
    return this.cardRepository.find({
      where: { deck: { id: deckId } },
      take: limit,
      skip: offset,
    });
  }

  async findOne(deckId: string, cardId: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: {
        id: cardId,
        deck: { id: deckId },
      },
    });
    if (!card) {
      throw new NotFoundException(
        `Card with ID ${cardId} not found in deck ${deckId}`,
      );
    }
    return card;
  }

  async update(
    deckId: string,
    cardId: string,
    updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    const card = await this.findOne(deckId, cardId);
    return this.cardRepository.save({ ...card, ...updateCardDto });
  }
}
