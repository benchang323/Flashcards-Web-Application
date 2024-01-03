// Path: src/components/feed.tsx
// Modified/Imported from classwork codebase

// Import dependencies
import Decks from "./deck/decks";
import Header from "./header";

const Feed = () => {
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
      <Header />
      <Decks />
    </div>
  );
};

export default Feed;
