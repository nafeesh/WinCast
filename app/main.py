from fastapi import FastAPI
from app.routers import auth, events, predictions, draw, leaderboard, admin
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="WinCast") # win + forecast // WinCast (short, sporty, future-proof)

# Allow frontend origins (update if needed)
origins = [
    "http://localhost:5173",  # Vite React
    "http://localhost:3000",  # CRA React
    "http://127.0.0.1:5173",
    # add your deployed frontend URL later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],          # allow all methods (GET, POST, etc.)
    allow_headers=["*"],          # allow all headers
)

# Register routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])
app.include_router(draw.router, prefix="/draw", tags=["Draw"])
app.include_router(leaderboard.router, prefix="/leaderboard", tags=["Leaderboard"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])


@app.get("/")
def root():
    return {"message": "Welcome to WinCast Prediction Draw API"}
