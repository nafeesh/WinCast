from fastapi import FastAPI
from app.routers import auth, events, predictions, draw, leaderboard, admin

app = FastAPI(title="WinCast") # win + forecast // WinCast (short, sporty, future-proof)

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
