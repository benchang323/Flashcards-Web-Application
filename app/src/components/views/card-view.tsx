// Path: src/components/views/card-view.tsx

import { useParams } from "react-router-dom";
import Cards from "../card/cards";
import { useToast } from "../ui/use-toast";
import Sidebar from "../sidebar";
import Header from "../header";
import Aside from "../aside";

const CardView = () => {
  const { deckId } = useParams();
  const { toast } = useToast();

  if (!deckId) {
    toast({
      variant: "destructive",
      title: "No Deck ID",
      description: "Deck ID is missing from the URL",
    });
    return (
      <>
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
          <Header />
          <div className="mt-8 text-center">Deck ID is missing</div>
        </div>
        <Aside />
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
        <Header />
        <Cards deckId={deckId} />
      </div>
      <Aside />
    </>
  );
};

export default CardView;
