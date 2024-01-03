// Path: src/decks/deck.service.spec.ts
// Some components are refactored or modified from classwork

import { Deck } from "./deck.entity";
import { DecksService } from "./decks.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

describe("DecksService", () => {
  let service: DecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DecksService,
        {
          provide: getRepositoryToken(Deck),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DecksService>(DecksService);
  });

  it("Must be defined", () => {
    expect(service).toBeDefined();
  });
});
