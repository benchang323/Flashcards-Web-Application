import { CardsService } from "./cards.service";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(deckId: string, createCardDto: CreateCardDto): Promise<import("./card.entity").Card>;
    findAll(deckId: string, limit: number, offset: number): Promise<import("./card.entity").Card[]>;
    findOne(deckId: string, cardId: string): Promise<import("./card.entity").Card>;
    update(deckId: string, cardId: string, updateCardDto: UpdateCardDto): Promise<import("./card.entity").Card>;
    remove(deckId: string, cardId: string): Promise<void>;
}
