// Path: src/hooks/use-mutation-cards.tsx

// Import dependencies
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { createCard, editCard, deleteCard } from "@/lib/api";

function useMutationCards() {
  // State management using Zustand
  const { toast } = useToast();
  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const modifyCard = useStore((state) => state.modifyCard);

  // Create a new card
  const makeNewCard = async (
    deckId: string,
    front: string,
    back: string,
  ): Promise<void> => {
    try {
      const newCard = await createCard(deckId, front, back);
      addCard(deckId, newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create a card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  // Remove a card
  const removeCardById = async (
    cardId: string,
    deckId: string,
  ): Promise<void> => {
    try {
      await deleteCard(deckId, cardId);
      removeCard(cardId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete a card",
        description:
          (error as Error).message ||
          "There was an error deleting the card. Please try again later.",
      });
    }
  };

  // Update a card
  const modifyExistingCard = async (
    deckId: string,
    cardId: string,
    front: string,
    back: string,
  ): Promise<void> => {
    try {
      await editCard(deckId, cardId, front, back);
      modifyCard(cardId, front, back);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit a card",
        description:
          (error as Error).message ||
          "There was an error editing the card. Please try again later.",
      });
    }
  };

  return {
    makeNewCard,
    removeCardById,
    modifyExistingCard,
  };
}

export default useMutationCards;
