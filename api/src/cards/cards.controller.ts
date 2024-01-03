// Path: src/cards/cards.controller.ts

import {
  Query,
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param("deckId") deckId: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardsService.create(deckId, createCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    return this.cardsService.findAll(deckId, limit, offset);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":cardId")
  async findOne(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
  ) {
    return this.cardsService.findOne(deckId, cardId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":cardId")
  async update(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.update(deckId, cardId, updateCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":cardId")
  async remove(
    @Param("deckId") deckId: string,
    @Param("cardId") cardId: string,
  ) {
    return this.cardsService.remove(deckId, cardId);
  }
}
