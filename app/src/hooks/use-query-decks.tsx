// Path: src/hooks/use-query-decks.tsx

// Import dependencies
import { useEffect } from "react";
import { Deck } from "@/lib/types";
import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useQueryDeck() {
  // State management using Zustand
  const { toast } = useToast();
  const decks: Deck[] = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);
  const user = useStore((state) => state.user);

  // Fetch all decks
  const loadDecks = async (): Promise<void> => {
    if (!user) {
      return;
    }
    try {
      const fetchedDecks = await fetchDecks();
      setDecks(fetchedDecks);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch decks",
        description:
          (error as Error).message ||
          "There was an error loading the decks. Please try again later.",
      });
    }
  };

  useEffect(() => {
    loadDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    decks,
  };
}

export default useQueryDeck;
