# Flashcards Web Application

## Overview
The Flashcards Web Application is a full-stack solution for creating, managing, and using flashcards for learning and revision purposes. It features a React frontend and a NestJS backend.

## Backend Features
- **JWT Authentication**: Secures API endpoints to ensure data integrity and user privacy.
- **Database Integration**: Utilizes PostgreSQL for persistent storage of flashcards and decks.
- **RESTful API**: Offers comprehensive endpoints for CRUD operations, user management, and more.

## Frontend Features
- **Interactive UI**: Enables users to seamlessly create, view, edit, and delete flashcards and decks.
- **User Authentication**: Manages user registration, login, and session handling.
- **Dynamic Data Interaction**: Communicates with the backend to fetch and display flashcard data.

## Overall Functionality
- **User Management**: Supports account creation, login, and account settings.
- **Deck and Card Operations**: Users can manage decks and their associated flashcards with ease.
- **Responsive Design**: The app's design ensures usability across different devices and screen sizes.

## API Endpoints
- **Card Management**
  - `POST /decks/:deckId/cards`: Create a new card.
  - `PATCH /decks/:deckId/cards/:cardId`: Update an existing card.
  - `DELETE /decks/:deckId/cards/:cardId`: Remove a card from a deck.
- **Deck Management**
  - `POST /decks`: Create a new deck.
  - `GET /decks`: List all decks with pagination.
  - `GET /decks/:deckId`: Retrieve a specific deck.
  - `PATCH /decks/:deckId`: Update a deck's details.
  - `DELETE /decks/:deckId`: Delete a deck.

## Tech Stack
- **Frontend**: React with TypeScript, Tailwind CSS, Vite.
- **Backend**: NestJS with TypeScript, PostgreSQL for the database, Docker for containerization.
- **Testing and QA**: Jest for backend testing, ESLint and Prettier for code quality.

## Libraries/Dependencies
- Dependencies are listed in `package.json` in both `api/` and `app/` directories.

## Installation
```
git clone https://github.com/benchang323/Flashcards-Web-Application.git
cd Flashcards-Web-Application
```
