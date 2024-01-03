// Path: src/decks/deck.controller.ts
// Some components are refactored or modified from classwork

import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
// import { DeckOwnershipGuard } from 'src/guards/deck-owner.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

type DeckResponseWithPagination = {
  search?: string;
  data: DeckResponseDto[];
  pagination: {
    limit: number;
    offset: number;
  };
};

@Controller("decks")
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @UseGuards(JwtAuthGuard)
  // @UseGuards(DeckOwnershipGuard)
  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const createdDeck = await this.decksService.create(createDeckDto, userId);

    return createdDeck;
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(DeckOwnershipGuard)
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id, userId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    return deck;
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(DeckOwnershipGuard)
  @Get()
  async findAll(
    @UserId() userId: number,
    @Query("limit") limit?: number,
    @Query("offset") offset?: number,
    @Query("search") search?: string,
    @Query("withUserData") withUserData?: boolean,
  ): Promise<DeckResponseWithPagination> {
    const decks = await this.decksService.findAll(
      userId,
      limit,
      offset,
      search,
      withUserData,
    );
    return {
      search,
      data: decks.map((deck) => {
        delete deck.userId;
        if (deck.user) {
          delete deck.user.password;
        }
        return deck;
      }),
      pagination: {
        limit,
        offset,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(DeckOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
    @UserId() userId: number,
  ): Promise<void> {
    await this.decksService.remove(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDeckDto: UpdateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.update(id, updateDeckDto, userId);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found.`);
    }
    return deck;
  }
}
