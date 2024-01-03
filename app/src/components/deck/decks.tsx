// Path: src/components/decks.tsx

import Deck from "./deck";
import useQueryDeck from "../../hooks/use-query-decks";
import { useStore } from "@/lib/store";

const Decks = () => {
  const user = useStore((state) => state.user);
  const { decks } = useQueryDeck();

  if (!user) {
    return (
      <div className="mt-8 text-center">
        Please login to view your decks or register to use this app.
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="mt-8 text-center">
        No decks found. Add some new decks!
      </div>
    );
  }

  return (
    <div className="">
      {decks
        .slice()
        .reverse()
        .map((deck) => (
          <Deck key={deck.id} deck={deck} />
        ))}
    </div>
  );
};

export default Decks;
