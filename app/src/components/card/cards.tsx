// Path: src/components/card/cards.tsx

import React from "react";
import Card from "./card";
import useQueryCards from "@/hooks/use-query-cards";
import { useStore } from "@/lib/store";
import type { Card as CardType } from "@/lib/types";

interface CardsProps {
  deckId: string;
}

const Cards: React.FC<CardsProps> = ({ deckId }) => {
  const user = useStore((state) => state.user);
  const { cards } = useQueryCards(deckId, 10, 1, "");

  const renderContent = () => {
    if (!user) {
      return (
        <div className="mt-8 text-center">
          Please login to view your cards or register to use this app.
        </div>
      );
    }

    if (cards.length === 0) {
      return (
        <div className="mt-8 text-center">
          No cards found in this deck. Add some new cards!
        </div>
      );
    }

    return (
      <div>
        {cards.map((card: CardType) => (
          <Card key={card.id} card={card} deckId={deckId} />
        ))}
      </div>
    );
  };

  return renderContent();
};

export default Cards;
