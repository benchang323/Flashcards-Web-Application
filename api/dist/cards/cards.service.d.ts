import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDto } from "./card-create.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DecksService } from "src/decks/decks.service";
export declare class CardsService {
    private cardRepository;
    private decksService;
    constructor(cardRepository: Repository<Card>, decksService: DecksService);
    create(deckId: string, createCardDto: CreateCardDto): Promise<Card>;
    remove(deckId: string, cardId: string): Promise<void>;
    findAll(deckId: string, limit?: number, offset?: number): Promise<Card[]>;
    findOne(deckId: string, cardId: string): Promise<Card>;
    update(deckId: string, cardId: string, updateCardDto: UpdateCardDto): Promise<Card>;
}
