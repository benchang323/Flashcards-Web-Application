import { Deck } from "src/decks/deck.entity";
export declare class Card {
    id: string;
    front: string;
    back: string;
    deck: Deck;
    createdAt: Date;
    updatedAt: Date;
}
