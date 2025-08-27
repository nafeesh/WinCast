# app/routers/leaderboard.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import LeaderboardEntry, UserOut

router = APIRouter()

@router.get("/", response_model=list[LeaderboardEntry])
def get_leaderboard(limit: int = 10, db: Session = Depends(get_db)):
    users = db.query(User).order_by(User.score.desc()).limit(limit).all()
    return users


@router.get("/v2", response_model=list[UserOut])
def get_leaderboard(limit: int = 10, db: Session = Depends(get_db)):
    return db.query(User).order_by(User.total_score.desc()).limit(limit).all()
