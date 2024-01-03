// Path: src/components/card/add-card-dialog.tsx
// Imported and modified from classwork codebase

// Import dependencies
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationCards from "@/hooks/use-mutation-cards";
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

interface AddCardDialogProps {
  deckId: string;
}

export const AddCardDialog: React.FC<AddCardDialogProps> = ({ deckId }) => {
  const user = useStore((state) => state.user);
  const { toast } = useToast();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { makeNewCard } = useMutationCards();

  const handleSave = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! Both sides cannot be empty! 🙁",
        description: `Please enter content for both sides of the card.`,
      });
      return;
    }

    await makeNewCard(deckId, front, back);
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Add Card"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user
              ? "Fill in the front and back of your card here."
              : "Please log in to add a card."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="front" className="text-right">
                Front
              </Label>
              <Input
                id="front"
                value={front}
                className="col-span-3"
                onChange={(e) => setFront(e.target.value)}
              />
              <Label htmlFor="back" className="text-right">
                Back
              </Label>
              <Input
                id="back"
                value={back}
                className="col-span-3"
                onChange={(e) => setBack(e.target.value)}
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

export default AddCardDialog;
