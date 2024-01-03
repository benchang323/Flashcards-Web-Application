// Path: src/components/add-deck-dialog.tsx
// Modified/Imported from classwork codebase

import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";

export const AddDeckDialog = () => {
  const user = useStore((state) => state.user);
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const { makeNewDeck } = useMutationDecks();

  const handleSave = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Sorry! Title cannot be empty! 🙁",
        description: `Please enter a title for your deck.`,
      });
      return;
    }

    await makeNewDeck(title);
    setTitle("");
  };

  const handleCancel = () => {
    setTitle("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Deck"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Give a title to your deck here."
              : "Please log in to create a deck/card"}
          </DialogDescription>
        </DialogHeader>
        {user && (
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
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <div>
              <DialogClose asChild>
                <Button
                  variant={"secondary"}
                  type="reset"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button type="submit" onClick={handleSave}>
                  Save
                </Button>
              </DialogClose>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeckDialog;
