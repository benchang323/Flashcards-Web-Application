// Path: src/components/card/card-actions.tsx
// Imported and modified from classwork codebase

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditCardDialog } from "./edit-card-dialog";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationCards from "@/hooks/use-mutation-cards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CardActions = ({
  deckId,
  cardId,
}: {
  deckId: string;
  cardId: string;
}) => {
  const [EC_Open, setEC_Open] = useState(false);
  const { removeCardById } = useMutationCards();

  const handleEditClick = () => {
    setEC_Open(true);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <DotsVerticalIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600 hover:bg-red-600"
            onClick={() => {
              removeCardById(deckId, cardId);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {EC_Open && (
        <EditCardDialog
          deckId={deckId}
          cardId={cardId}
          EC_Open={EC_Open}
          set_EC_Open={setEC_Open}
        />
      )}
    </div>
  );
};

export default CardActions;
