# app/services/evaluation.py
from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.prediction import Prediction

def evaluate_event(db: Session, event_id: int):
    """Evaluate all predictions for a closed event and assign entries."""
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise ValueError("Event not found")

    if event.is_closed:
        raise ValueError("Event already closed")

    if event.correct_value is None:
        raise HTTPException(status_code=400, detail="Correct value not set")

    # Evaluate predictions
    for prediction in event.predictions:
        error = abs(int(prediction.predicted_value) - int(event.correct_value))

        if error == 0:
            prediction.entries = 10   # max tickets
            prediction.score = 1.0    # perfect accuracy
        elif error <= 5:  # 🔹 Example "close guess" rule
            prediction.entries = 5
            prediction.score = 0.7
        elif error <= 10:
            prediction.entries = 2
            prediction.score = 0.4
        else:
            prediction.entries = 0
            prediction.score = 0.0

        # Update user total_score
        prediction.user.total_score += prediction.score

    event.is_closed = True
    db.commit()
    db.refresh(event)
    return event
