from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db, Base, engine
from app.models.event import Event
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionOut
from app.utils.deps import get_current_user
from app.models.user import User

Base.metadata.create_all(bind=engine)
router = APIRouter()

@router.post("/", response_model=PredictionOut, status_code=status.HTTP_201_CREATED)
def submit_prediction(payload: PredictionCreate, 
                      db: Session = Depends(get_db),
                      user: User = Depends(get_current_user)):
    event = db.query(Event).get(payload.event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Validate event status/time
    now = datetime.now()
    if event.is_closed or now >= event.end_time:
        raise HTTPException(status_code=400, detail="Event is closed for predictions")

    # Validate option exists
    valid_keys = {opt["key"] for opt in event.options}
    if payload.option_key not in valid_keys:
        raise HTTPException(status_code=400, detail="Invalid option_key for this event")

    # Enforce one prediction per user/event
    existing = db.query(Prediction).filter(
        Prediction.user_id == user.id, Prediction.event_id == event.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already submitted a prediction for this event")

    pred = Prediction(
        user_id=user.id,
        event_id=event.id,
        option_key=payload.option_key,
    )
    db.add(pred)
    db.commit()
    db.refresh(pred)
    return pred

@router.get("/me", response_model=list[PredictionOut])
def my_predictions(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Prediction).filter(Prediction.user_id == user.id) \
             .order_by(Prediction.submitted_at.desc()).all()
