// Path: src/decks/deck.service.ts
// Some components are refactored or modified from classwork

import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
  ) {}

  async findOne(id: string, userId: number): Promise<Deck | null> {
    const deck = await this.deckRepository.findOneBy({ id });
    if (!deck) {
      throw new NotFoundException();
    }
    if (deck.userId !== userId) {
      throw new ForbiddenException();
    }
    return deck;
  }

  async addCard(deckId: string): Promise<void> {
    const deck = await this.deckRepository.findOneBy({ id: deckId });
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    deck.numberOfCards += 1;
    await this.deckRepository.save(deck);
  }

  async removeCard(deckId: string): Promise<void> {
    const deck = await this.deckRepository.findOneBy({ id: deckId });
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    deck.numberOfCards = Math.max(0, deck.numberOfCards - 1);
    await this.deckRepository.save(deck);
  }

  async create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck> {
    const deck = this.deckRepository.create({ ...createDeckDto, userId });
    return this.deckRepository.save(deck);
  }

  async findAll(
    userId: number,
    limit?: number,
    offset?: number,
    search?: string,
    withUserData?: boolean,
  ): Promise<Deck[]> {
    const queryBuilder = this.deckRepository.createQueryBuilder("deck");

    if (withUserData) {
      queryBuilder.leftJoinAndSelect("deck.user", "user");
    }

    queryBuilder.where("deck.userId = :userId", { userId });

    if (limit) {
      queryBuilder.limit(limit);
    }
    if (offset) {
      queryBuilder.offset(offset);
    }
    if (search) {
      queryBuilder.andWhere("deck.title LIKE :search", {
        search: `%${search}%`,
      });
    }

    return await queryBuilder.getMany();
  }

  async update(
    id: string,
    updateDeckDto: UpdateDeckDto,
    userId: number,
  ): Promise<Deck | null> {
    let deck = await this.findOne(id, userId);
    if (!deck) {
      throw new NotFoundException();
    }
    deck = this.deckRepository.merge(deck, updateDeckDto);
    return this.deckRepository.save(deck);
  }

  async remove(id: string, userId: number): Promise<void> {
    const deck = await this.findOne(id, userId);
    if (!deck) {
      throw new NotFoundException();
    }
    await this.deckRepository.remove(deck);
  }

  async incrementCardCount(deckId: string): Promise<void> {
    const deck = await this.deckRepository.findOneBy({ id: deckId });
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    deck.numberOfCards += 1;
    await this.deckRepository.save(deck);
  }

  async decrementCardCount(deckId: string): Promise<void> {
    const deck = await this.deckRepository.findOneBy({ id: deckId });
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${deckId} not found`);
    }
    deck.numberOfCards = Math.max(0, deck.numberOfCards - 1);
    await this.deckRepository.save(deck);
  }
}
