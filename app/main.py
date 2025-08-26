from fastapi import FastAPI
from app.routers import auth, events, predictions

app = FastAPI(title="WinCast") # win + forecast // WinCast (short, sporty, future-proof)

# Register routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(events.router, prefix="/events", tags=["Events"])
app.include_router(predictions.router, prefix="/predictions", tags=["Predictions"])

@app.get("/")
def root():
    return {"message": "Welcome to WinCast Prediction Draw API"}
