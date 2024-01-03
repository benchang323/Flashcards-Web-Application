// Path: app/src/lib/store.ts

// Import dependencies
import { Deck, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Card } from "./types";

type State = {
  decks: Deck[];
  user: User | null;
  cards: Card[];
};

type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  addDeck: (deck: Deck) => void;
  modifyDeck: (id: string, deck: Deck) => void;
  // user actions
  setUser: (user: User) => void;
  clearUser: () => void;
  // card actions
  setCards: (cards: Card[]) => void;
  addCard: (deckId: string, card: Card) => void;
  removeCard: (cardId: string) => void;
  modifyCard: (cardId: string, front: string, back: string) => void;
};

const initialState: State = {
  decks: [],
  user: null,
  cards: [],
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },

    addDeck: (deck) => {
      const newDeck: Deck = {
        ...deck,
      };
      const newDecks = [...get().decks, newDeck];
      set({ decks: newDecks });
    },

    modifyDeck: (id, updatedDeck) => {
      const updatedDecks = get().decks.map((deck) => {
        if (deck.id === id) {
          return { ...deck, ...updatedDeck };
        }
        return deck;
      });
      set({ decks: updatedDecks });
    },

    setUser: (user: User) => {
      set({ user: user });
    },

    clearUser: () => {
      set({ user: null });
    },

    setCards: (cards) => set({ cards }),

    addCard: (deckId, card) => {
      const newCards = [...get().cards, card];
      set({ cards: newCards });
    },

    removeCard: (cardId) => {
      const newCards = get().cards.filter((card) => card.id !== cardId);
      set({ cards: newCards });
    },

    modifyCard: (cardId, front, back) => {
      const updatedCards = get().cards.map((card) => {
        if (card.id === cardId) {
          return { ...card, front, back };
        }
        return card;
      });
      set({ cards: updatedCards });
    },
  })),
);
