// Path: src/decks/deck.controller.spec.ts
// Some components are refactored or modified from classwork

import { DecksService } from "./decks.service";
import { DecksController } from "./decks.controller";
import { Test, TestingModule } from "@nestjs/testing";

describe("DecksController", () => {
  let controller: DecksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecksController],
      providers: [
        {
          provide: DecksService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DecksController>(DecksController);
  });

  it("Should be defined.", () => {
    expect(controller).toBeDefined();
  });
});
