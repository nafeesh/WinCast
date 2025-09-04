from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from app.database import get_db, Base, engine
from app.models.event import Event
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionCreate, PredictionOut
from app.utils.deps import get_current_user
from app.models.user import User

router = APIRouter()

ENTRY_FEE = 10  # flat fee


@router.post("/predict", response_model=PredictionCreate, status_code=status.HTTP_201_CREATED)
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
    # This logic needs to be improve it shpuld allow predictions if event has no option kind
    # valid_keys = {opt["key"] for opt in event.options}
    valid_keys = {opt for opt in event.options}
    if payload.predicted_value not in valid_keys:
        raise HTTPException(status_code=400, detail="Invalid predictions for this event")

    # Enforce one prediction per user/event
    existing = db.query(Prediction).filter(
        Prediction.user_id == user.id, Prediction.event_id == event.id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already submitted a prediction for this event")

    # 3. Deduct entry fee
    if (user.balance - ENTRY_FEE) <= 0:
        raise HTTPException(status_code=400, detail="Insufficent Balance")
    
    pred = Prediction(
        user_id=user.id,
        event_id=event.id,
        predicted_value=payload.predicted_value,
        entries = ENTRY_FEE
    )
    user.balance -= ENTRY_FEE
    
    db.add(pred)
    db.add(user)
    db.commit()
    db.refresh(pred)
    db.refresh(user)
    return pred

@router.get("/me", response_model=list[PredictionOut])
def my_predictions(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    my_predictions = (
        db.query(Prediction)
        .join(Event, Event.id == Prediction.event_id)
        .filter(Prediction.user_id == User.id)
        .all()
    )
    return my_predictions
