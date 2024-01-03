import { UserResponseDTO } from "src/user/user-response.dto";
export declare class DeckResponseDto {
    id: string;
    title: string;
    createdAt: Date;
    image?: string;
    numberOfCards: number;
    user?: UserResponseDTO;
}
