# 🏆 WinCast — Predict & Win Platform

**WinCast** is a gamified prediction platform built with **FastAPI** and **React (TypeScript)**.  
Users can join events, make predictions before deadlines, and compete on a leaderboard for top scores and rewards.  

---

## 🚀 Features

### 🎯 Core Functionality
- Browse and join upcoming events  
- Submit predictions before the event closes  
- View your joined events and prediction history  
- See results once events are closed  
- Auto-calculated scores and winner leaderboard  

### 🧠 Admin / Backend Features
- Event management (create, close, evaluate)  
- Auto-winner selection based on correct predictions  
- User score tracking  
- JWT authentication and role-based access  

### 🖥️ Frontend Features
- Responsive dashboard built with React + Tailwind CSS  
- Intuitive event cards and detailed event view  
- "My Events" section for all user submissions  
- Dynamic button text (“Predict Now” → “Results” after closing)  
- Reusable API layer for token-based calls  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Backend** | FastAPI, SQLAlchemy, Pydantic, JWT Auth |
| **Database** | PostgreSQL  |
| **Frontend** | React (TypeScript), Tailwind CSS, Axios |

---

## 📦 Project Structure

WinCast/
├── app/
│ ├── main.py # FastAPI entry point
│ ├── routers/
│ │ ├── auth.py # Authentication endpoints
│ │ ├── events.py # Event APIs
│ │ ├── predictions.py # Prediction endpoints
│ ├── models/
│ │ ├── user.py # User model
│ │ ├── event.py # Event & Winner models
│ │ └── prediction.py # Prediction model
│ ├── schemas/
│ │ ├── user.py
│ │ ├── event.py
│ │ └── prediction.py
│ ├── db.py # Database config & session
│ └── utils/
│ ├── auth.py # Token utilities
│ └── scoring.py # Winner evaluation logic
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── EventCard.tsx
│ │ │ ├── EventList.tsx
│ │ │ ├── MyEventsList.tsx
│ │ ├── services/
│ │ │ └── api.ts # Axios instance
│ │ ├── utils/
│ │ │ └── formatDate.ts
│ │ └── App.tsx
│ └── package.json
│
└── README.md



---

## ⚙️ Installation & Setup

### 🔧 Backend (FastAPI)
```bash
# Create a virtual environment
# you can use UV too.
python -m venv .venv
source .venv/bin/activate  # (Windows: .venv\Scripts\activate)


# Install dependencies
pip install -r requirements.txt

# Run database migrations (if using Alembic)
alembic upgrade head

# Start FastAPI server
uvicorn app.main:app --reload

### 🔧 Frontend (ReactJS)
cd frontend
npm install
npm run dev



Nafeesh Haider
💼 LinkedIn -> [LinkedIn](https://www.linkedin.com/in/nafeex/)
🌐 GitHub ->[GitHub](https://github.com/nafeesh)



🏁 Upcoming Development & TODO
- After Pridict Now button Click It should change Pridiciont or disable
- Winner Table integration in Leaderboard
- Admin Dashboard
- Email notifications for winners
- LLM Integration for Event generations
