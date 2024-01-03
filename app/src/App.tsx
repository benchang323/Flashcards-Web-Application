// Path: src/App.tsx

import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useStore } from "./lib/store";
import {
  getAuthenticatedUserToken,
  isTokenExpired,
  removeAuthenticatedUserToken,
} from "./lib/auth";
import { useToast } from "./components/ui/use-toast";
import CardView from "./components/views/card-view";
import ErrorPage from "./components/views/error-page";
import MainView from "./components/views/main-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/decks/:deckId/cards",
    element: <CardView />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const clearUser = useStore((state) => state.clearUser);
  const { toast } = useToast();

  useEffect(() => {
    const token = getAuthenticatedUserToken();
    if (token) {
      const isExpired = isTokenExpired();
      if (isExpired) {
        removeAuthenticatedUserToken();
        clearUser();
        toast({
          variant: "destructive",
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
        });
      }
    }
  }, [clearUser, toast]);

  return (
    <div className="flex justify-center min-h-screen">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
