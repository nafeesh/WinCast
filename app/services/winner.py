import random
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.event import Event
from app.models.user import User
from app.models.winner import Winner


def pick_winner(event_id: int, db: Session):
    
    event = db.query(Event).get(event_id)

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if not event.is_closed:
        raise HTTPException(status_code=400, detail="Event must be closed before drawing a winner")

    winner = db.query(Winner).filter(Winner.event_id == event_id).first()

    if winner is not None:
        raise HTTPException(status_code=400, detail="Winner is alredy draw")
    # Build weighted lottery pool
    pool = []
    for prediction in event.predictions:
        if prediction.entries > 0:   # only users who predicted correctly or close
            pool.extend([prediction.user_id] * prediction.entries)

    print(pool)
    if not pool:
        return {"message": "No eligible predictions for this event"}

    winner_id = random.choice(pool)

    winner = Winner(event_id=event.id, user_id=winner_id, reward=len(pool))
    db.add(winner)

    # Reward winner (example: +100 points)
    winner_user = db.query(User).get(winner_id)
    winner_user.balance += 100

    db.commit()
    db.refresh(winner_user)

    return {
        "event": event.title,
        "user": winner_user.username,
        "total_participants": len(set([p.user_id for p in event.predictions])),
        "pool_size": len(pool)
    }
