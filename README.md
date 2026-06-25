<<<<<<< HEAD
# MindMate App

MindMate is a full-stack mental-wellness web app providing mood logging, journaling, an AI assistant, and anonymous mood-matching chat.

## Features
- Mood logging and history
- Personal journaling
- AI chat assistant (rule-based fallback; optional Gemini/OpenAI integration)
- Anonymous realtime mood matching (Socket.IO)
- Email/password auth with JWT

## Tech stack
- Frontend: React + Vite, axios, socket.io-client, recharts
- Backend: Node.js, Express, MongoDB (Mongoose), Socket.IO
- Auth: bcryptjs + JSON Web Tokens
- Optional: Google Gemini / OpenAI generative models

## Project structure (high level)
- frontend/ — React app (pages: Dashboard, AIChat, MoodHistory, Journal, Match, Login, Register)
  - src/services/api.js — axios instance (baseURL: http://localhost:5000/api)
- backend/ — Express API and Socket.IO server
  - server.js — entrypoint
  - routes/, controllers/, models/, config/, socket/

## API endpoints (examples)
- POST /api/auth/register — register { name, email, password }
- POST /api/auth/login — login { email, password } => { token }
- POST /api/mood/save — save mood (protected)
- GET /api/mood/history — get user mood history (protected)
- POST /api/journal/add — add journal entry (protected)
- GET /api/journal/all — list journals (protected)
- POST /api/ai/chat — { message } => { reply } (protected)

## Realtime matching (Socket.IO)
- Client emits `joinMood` with a mood string to queue for pairing
- Server pairs two waiting users with same mood and emits `matched` with roomId
- Chat events: `sendMessage`, `receiveMessage`, `leaveChat`, `partnerLeft`

## Environment variables (.env)
- MONGO_URI — MongoDB connection string
- JWT_SECRET — JWT signing secret
- PORT — optional, defaults to 5000
- GEMINI_API_KEY — optional (enable Google generative AI integration)

## Setup
1. Backend
   - cd backend
   - npm install
   - create a .env with MONGO_URI and JWT_SECRET
   - npm run dev
2. Frontend
   - cd frontend
   - npm install
   - npm run dev

Open the frontend dev server (Vite) and ensure the backend runs at http://localhost:5000.

## Notes & next steps
- Add input validation, tests, and better error handling
- Secure CORS origins and use HTTPS in production
- Enable Gemini/OpenAI integration by adding keys and uncommenting code in backend/controllers/aiController.js

---
Created by project maintainer tools. For committing and pushing this README, say "commit" and I will create a git commit for you.
=======
# Mindmate
Mental Wellness AI Assistant Using GEN-AI
>>>>>>> 0352127b897fc4fe36a55cffa4b79602e9f5999a
