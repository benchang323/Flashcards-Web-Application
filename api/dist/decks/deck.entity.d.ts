import { User } from "src/user/user.entity";
import { Card } from "src/cards/card.entity";
export declare class Deck {
    id: string;
    title: string;
    image: string;
    user: User;
    userId: number;
    numberOfCards: number;
    createdAt: Date;
    cards: Card[];
}
