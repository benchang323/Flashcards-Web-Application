// Path: src/lib/api.ts

// Import dependencies and types
import type { Deck, DeckWithUserData, User, Card } from "./types";
import {
  getAuthenticatedUser,
  getAuthenticatedUserToken,
  removeAuthenticatedUserToken,
  setAuthenticatedUserToken,
} from "./auth";

const API_URL = import.meta.env.VITE_API_URL;

console.log("API_URL", API_URL);

export const deleteDeck = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const responseJson = responseText ? JSON.parse(responseText) : {};
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};

export const register = async (userData: {
  username: string;
  password: string;
  displayName: string;
  avatar?: string;
}): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    let responseJson;
    try {
      const responseText = await response.text();
      responseJson = responseText ? JSON.parse(responseText) : {};
    } catch (error) {
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      responseJson = {};
    }

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${
          responseJson.message || response.statusText
        }`,
      );
    }

    console.log("Registration successful", responseJson);
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};

export const fetchDecks = async (): Promise<Deck[]> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks?withUserData=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const editDeck = async (id: string, title: string): Promise<Deck> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const login = async (
  username: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;
  if (!access_token) {
    throw new Error("Authentication token is missing");
  }
  setAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();

  return user;
};

export const createDeck = async (
  title: string,
  image?: string,
): Promise<DeckWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, image }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user,
  };
};

export const logout = async (): Promise<void> => {
  removeAuthenticatedUserToken();
};

export const createCard = async (
  deckId: string,
  front: string,
  back: string,
): Promise<Card> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front, back }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const editCard = async (
  deckId: string,
  cardId: string,
  front: string,
  back: string,
): Promise<Card> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ front, back }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const deleteCard = async (
  deckId: string,
  cardId: string,
): Promise<void> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const responseJson = responseText ? JSON.parse(responseText) : {};
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }
};

export const fetchCard = async (
  deckId: string,
  cardId: string,
): Promise<Card> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/decks/${deckId}/cards/${cardId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const responseJson = responseText ? JSON.parse(responseText) : {};
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const responseJson = await response.json();
  return responseJson.data;
};

export const fetchCards = async (
  deckId: string,
  limit: number,
  offset: number,
  search?: string,
): Promise<Card[]> => {
  const token = getAuthenticatedUserToken();
  let apiUrl = `${API_URL}/decks/${deckId}/cards?limit=${limit}&offset=${offset}`;
  if (search) {
    apiUrl += `&search=${encodeURIComponent(search)}`;
  }
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    const responseJson = responseText ? JSON.parse(responseText) : {};
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  const responseJson = await response.json();
  return responseJson.data;
};
