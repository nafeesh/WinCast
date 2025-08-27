from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.event import Event
from app.schemas.event import EventCreate, EventOut
from app.database import get_db, Base, engine
from app.utils.deps import get_current_user  # You can add an is_admin check later
from app.services import evaluation


router = APIRouter()

@router.post("/", response_model=EventOut)
def create_event(payload: EventCreate, db: Session = Depends(get_db), _user=Depends(get_current_user)):
    if payload.end_time <= payload.start_time:
        raise HTTPException(status_code=400, detail="end_time must be after start_time")

    new_event = Event(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        options=[o.model_dump() for o in payload.options],  # store as JSON
        start_time=payload.start_time,
        end_time=payload.end_time,
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.get("/", response_model=list[EventOut])
def list_events(db: Session = Depends(get_db)):
    # Only open or all? For now, return all.
    return db.query(Event).order_by(Event.start_time.desc()).all()


@router.post("/{event_id}/close", response_model=EventOut)
def close_event(event_id: int, correct_value: str, db: Session = Depends(get_db), _user=Depends(get_current_user)):
    event = db.query(Event).get(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event.is_closed:
        raise HTTPException(status_code=400, detail="Event already closed")

    event.correct_value = correct_value
    db.commit()

    
    evaluation.evaluate_event(db, event_id)

    db.refresh(event)
    # This will couse error becouse response_model is alredy define so return should match EventOut
    # return {"message": "Event closed and evaluated", "event_id": evaluated_event.id}
    return event


