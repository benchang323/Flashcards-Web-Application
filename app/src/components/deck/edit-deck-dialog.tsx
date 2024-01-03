// Path: src/components/edit-deck-dialog.tsx
// Modified/Imported from classwork codebase

import Deck from "./deck";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useToast } from "../ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useMutationDecks from "@/hooks/use-mutation-decks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const EditDeckDialog = ({
  deckId,
  ED_Open,
  set_ED_Open,
}: {
  deckId: string;
  ED_Open: boolean;
  set_ED_Open: (ED_Open: boolean) => void;
}) => {
  const decks: Deck[] = useStore((state) => state.decks);
  const deck: Deck = decks.find((deck) => deck.id === deckId)!;
  const { toast } = useToast();
  const [title, setTitle] = useState(deck.title);
  const { modifyExistingDeck } = useMutationDecks();

  const saveDeck = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter a title for your deck.`,
      });
      return;
    }

    await modifyExistingDeck(deckId, title);
    setTitle("");
    set_ED_Open(false);
  };

  const handleCancel = () => {
    setTitle("");
    set_ED_Open(false);
  };

  return (
    <Dialog open={ED_Open} onOpenChange={set_ED_Open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>
            Edit the title to your deck here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={saveDeck}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeckDialog;
