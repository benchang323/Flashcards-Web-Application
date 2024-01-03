// Path: src/components/card/edit-card-dialog.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useMutationCards from "@/hooks/use-mutation-cards";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Card } from "@/lib/types";

interface EditCardDialogProps {
  cardId: string;
  deckId: string;
  EC_Open: boolean;
  set_EC_Open: (EC_Open: boolean) => void;
}

export const EditCardDialog: React.FC<EditCardDialogProps> = ({
  cardId,
  deckId,
  EC_Open,
  set_EC_Open,
}) => {
  const { toast } = useToast();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { modifyExistingCard } = useMutationCards();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get<Card>(`/api/cards/${cardId}`);
        setFront(response.data.front);
        setBack(response.data.back);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message || error.message;
          toast({
            variant: "destructive",
            title: "Error fetching card data",
            description: message,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred.",
          });
        }
      }
    };

    if (EC_Open) {
      fetchCardData();
    }
  }, [cardId, EC_Open, toast]);

  const saveCard = async () => {
    if (!front || !back) {
      toast({
        variant: "destructive",
        title: "Sorry! Both sides cannot be empty! 🙁",
        description: "Please enter content for both sides of the card.",
      });
      return;
    }

    try {
      await modifyExistingCard(deckId, cardId, front, back);
      set_EC_Open(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || error.message;
        toast({
          variant: "destructive",
          title: "Error updating card",
          description: message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  const handleCancel = () => {
    set_EC_Open(false);
  };

  return (
    <Dialog open={EC_Open} onOpenChange={set_EC_Open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Edit the content of your card here.
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={saveCard}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCardDialog;
