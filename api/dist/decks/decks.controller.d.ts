import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { DeckResponseDto } from "./deck-response.dto";
type DeckResponseWithPagination = {
    search?: string;
    data: DeckResponseDto[];
    pagination: {
        limit: number;
        offset: number;
    };
};
export declare class DecksController {
    private readonly decksService;
    constructor(decksService: DecksService);
    create(createDeckDto: CreateDeckDto, userId: number): Promise<DeckResponseDto>;
    findOne(id: string, userId: number): Promise<DeckResponseDto>;
    findAll(userId: number, limit?: number, offset?: number, search?: string, withUserData?: boolean): Promise<DeckResponseWithPagination>;
    remove(id: string, userId: number): Promise<void>;
    update(id: string, updateDeckDto: UpdateDeckDto, userId: number): Promise<DeckResponseDto>;
}
export {};
