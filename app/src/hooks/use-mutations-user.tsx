// Path: src/hooks/use-mutations-user.tsx
// Modified/Imported from classwork codebase

import { useToast } from "@/components/ui/use-toast";
import { login, logout, register } from "@/lib/api";
import { getAuthenticatedUser } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useMutationUser() {
  const { toast } = useToast();
  const clearUser = useStore((state) => state.clearUser);
  const setUser = useStore((state) => state.setUser);

  const registerUser = async (
    username: string,
    password: string,
    displayName: string,
    avatar?: string,
  ) => {
    try {
      const requestBody = {
        username,
        password,
        displayName,
        avatar,
      };

      await register(requestBody);
      toast({
        variant: "default",
        title: "Registration successful.",
        description: "Please login with your credentials.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to register.",
        description:
          (error as Error).message ||
          "There was an error registering you. Please try again later.",
      });
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      clearUser();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to logout",
        description:
          (error as Error).message ||
          "There was an error logging you out. Please try again later.",
      });
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      setUser(user);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to log into the app.",
        description:
          (error as Error).message ||
          "There was an error signing you in. Please try again later.",
      });
    }
  };

  useEffect(() => {
    try {
      const user = getAuthenticatedUser();
      setUser(user);
    } catch (error) {
      clearUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loginUser, logoutUser, registerUser };
}

export default useMutationUser;
