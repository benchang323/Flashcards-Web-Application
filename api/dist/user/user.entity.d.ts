import { Deck } from "../decks/deck.entity";
export declare class User {
    id: number;
    displayName: string;
    avatar: string;
    username: string;
    decks: Deck[];
    password: string;
}
