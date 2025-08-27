from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.winner import pick_winner
# from app.schemas.winner import WinnerOut

router = APIRouter()

@router.post("/{event_id}/draw")
def draw_winner(event_id: int, db: Session = Depends(get_db)):
    return pick_winner(event_id, db)
