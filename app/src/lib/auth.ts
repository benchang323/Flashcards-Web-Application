// Path: src/lib/auth.ts

import { User } from "./types";
import { jwtDecode } from "jwt-decode";

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem("token") as string;
  const decoded = jwtDecode<User>(token);
  return decoded;
};

export const setAuthenticatedUserToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getAuthenticatedUserToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeAuthenticatedUserToken = (): void => {
  localStorage.removeItem("token");
};

export const isTokenExpired = (): boolean => {
  try {
    const token = localStorage.getItem("token") as string;
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000;
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    return true;
  }
};
