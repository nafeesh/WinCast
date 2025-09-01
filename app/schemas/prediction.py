from pydantic import BaseModel
from datetime import datetime

class PredictionCreate(BaseModel):
    event_id: int
    predicted_value: str | int  # must be one of event.options

class PredictionOut(BaseModel):
    id: int
    event_id: int
    predicted_value: str | int
    submitted_at: datetime
    is_correct: int | None = None
    score: int | None = None

    class Config:
        from_attributes = True
