// Path: src/cards/cards.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./card.entity";
import { CardsService } from "./cards.service";
import { CardsController } from "./cards.controller";
import { DecksModule } from "src/decks/decks.module";

@Module({
  imports: [TypeOrmModule.forFeature([Card]), DecksModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
