// Path: src/hooks/use-query-cards.tsx

import { useEffect } from "react";
import { Card } from "@/lib/types";
import { fetchCards } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useQueryCards(
  deckId: string,
  limit: number,
  offset: number,
  search?: string,
) {
  // State management using Zustand
  const { toast } = useToast();
  const cards: Card[] = useStore((state) => state.cards);
  const setCards = useStore((state) => state.setCards);
  const user = useStore((state) => state.user);

  // Fetch cards for a specific deck
  const loadCards = async (): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      const fetchedCards = await fetchCards(deckId, limit, offset, search);
      setCards(fetchedCards);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch cards",
        description:
          (error as Error).message ||
          "There was an error loading the cards. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, limit, offset, search]);

  return {
    cards,
  };
}

export default useQueryCards;
