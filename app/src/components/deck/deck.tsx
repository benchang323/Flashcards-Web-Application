// Path: src/components/deck.tsx
// Modified/Imported from classwork codebase

import type { Deck } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import DeckActions from "./deck-actions";

const Deck = ({ deck }: { deck: Deck }) => {
  const { id, title, numberOfCards } = deck;
  const navigate = useNavigate();

  const goToDeckCards = () => {
    navigate(`/decks/${id}/cards`);
  };

  return (
    <div
      className="max-w-md p-6 mx-auto my-8 bg-white border rounded-lg shadow-2xl border-slate-200"
      style={{ height: "200px" }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className="mb-4 text-lg font-bold text-gray-900">{title}</div>
          <DeckActions deckId={id} />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-gray-700">{numberOfCards} cards</div>
          <button
            onClick={goToDeckCards}
            className="text-gray-700 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deck;
