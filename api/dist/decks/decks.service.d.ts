import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";
export declare class DecksService {
    private deckRepository;
    constructor(deckRepository: Repository<Deck>);
    findOne(id: string, userId: number): Promise<Deck | null>;
    addCard(deckId: string): Promise<void>;
    removeCard(deckId: string): Promise<void>;
    create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck>;
    findAll(userId: number, limit?: number, offset?: number, search?: string, withUserData?: boolean): Promise<Deck[]>;
    update(id: string, updateDeckDto: UpdateDeckDto, userId: number): Promise<Deck | null>;
    remove(id: string, userId: number): Promise<void>;
    incrementCardCount(deckId: string): Promise<void>;
    decrementCardCount(deckId: string): Promise<void>;
}
