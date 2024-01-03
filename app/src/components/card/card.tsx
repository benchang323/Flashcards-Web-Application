// Path: src/components/card/card.tsx

import { useState } from "react";
import type { Card as CardType } from "@/lib/types";
import CardActions from "./card-actions";

const Card = ({ card, deckId }: { card: CardType; deckId: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div
      className="max-w-md p-6 mx-auto my-4 bg-white border rounded-lg shadow-xl cursor-pointer border-slate-200"
      style={{ height: "150px" }}
      onClick={toggleFlip}
    >
      <div className="flex items-start justify-between">
        <div>
          {isFlipped ? (
            <div className="text-gray-700">Back: {card.back}</div>
          ) : (
            <div className="mb-2 text-lg font-bold text-gray-900">
              Front: {card.front}
            </div>
          )}
        </div>
        <CardActions deckId={deckId} cardId={card.id} />
      </div>
    </div>
  );
};

export default Card;
