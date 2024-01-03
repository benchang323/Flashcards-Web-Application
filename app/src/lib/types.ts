// Path: src/lib/types.ts
// Modified/Imported from assignment website

export type Deck = {
  id: string;
  title: string;
  createdAt: string;
  image?: string;
  numberOfCards: number;
  userId: number;
};

export type User = {
  id: number;
  userName: string;
  displayName: string;
  avatar?: string;
};

export type Card = {
  id: string;
  front: string;
  back: string;
  createdAt: string;
  updatedAt?: string;
  deckId: string;
};

export type CardData = {
  front: string;
  back: string;
};

export type DeckWithUserData = Deck & { user?: User };
