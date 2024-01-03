// Path: src/decks/deck.module.ts
// Some components are refactored or modified from classwork

import { Deck } from "./deck.entity";
import { Module } from "@nestjs/common";
import { DecksService } from "./decks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DecksController } from "./decks.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  providers: [DecksService],
  controllers: [DecksController],
  exports: [DecksService],
})
export class DecksModule {}
