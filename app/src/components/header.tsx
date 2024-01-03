// Path: src/components/header.tsx

import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  const onDecksPage =
    location.pathname === "/decks" || location.pathname === "/";
  const onCardsPage = location.pathname.includes("/cards");

  return (
    <div className="flex justify-center gap-3 p-4 border-b-2 border-slate-400">
      <Button variant={"link"} disabled={onCardsPage}>
        Decks
      </Button>
      <Button variant={"link"} disabled={onDecksPage}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
