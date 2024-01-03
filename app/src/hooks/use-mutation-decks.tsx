// Path: src/hooks/use-mutation-decks.tsx
// Modified/Imported from classwork codebase

// Import dependencies
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { createDeck, deleteDeck, editDeck } from "@/lib/api";

function useMutationDecks() {
  // State management using Zustand
  const { toast } = useToast();
  const addDeck = useStore((state) => state.addDeck);
  const removeDeck = useStore((state) => state.removeDeck);
  const modifyDeck = useStore((state) => state.modifyDeck);

  // Create a new deck
  const makeNewDeck = async (title: string, image?: string): Promise<void> => {
    try {
      const newDeck = await createDeck(title, image);
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create a deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };

  // Remove a deck
  const removeDeckById = async (deckId: string): Promise<void> => {
    try {
      await deleteDeck(deckId);
      removeDeck(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete a deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  // Update a deck
  const modifyExistingDeck = async (
    deckId: string,
    title: string,
  ): Promise<void> => {
    try {
      const updatedDeck = await editDeck(deckId, title);
      modifyDeck(deckId, updatedDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit a deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  return {
    makeNewDeck,
    removeDeckById,
    modifyExistingDeck,
  };
}

export default useMutationDecks;
