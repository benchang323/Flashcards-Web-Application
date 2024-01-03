// Path: src/components/deck-actions.tsx
// Modified/Imported from classwork codebase

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditDeckDialog } from "./edit-deck-dialog";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DeckActions = ({ deckId }: { deckId: string }) => {
  const [ED_Open, setED_Open] = useState(false);
  const { removeDeckById } = useMutationDecks();

  const handleEditClick = () => {
    setED_Open(true);
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
              removeDeckById(deckId);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {ED_Open && (
        <EditDeckDialog
          deckId={deckId}
          ED_Open={ED_Open}
          set_ED_Open={setED_Open}
        />
      )}
    </div>
  );
};

export default DeckActions;
