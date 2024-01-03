// Path: src/components/sidebar.tsx

import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import AddDeckDialog from "./deck/add-deck-dialog";
import AddCardDialog from "./card/add-card-dialog";

const Sidebar = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const isOnCardsPage = window.location.pathname.includes("/cards");

  const handleHomeClick = () => navigate("/");

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm" onClick={handleHomeClick}>
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button variant={"ghost"} size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {isOnCardsPage && deckId ? (
        <AddCardDialog deckId={deckId} />
      ) : (
        <AddDeckDialog />
      )}
    </div>
  );
};

export default Sidebar;
