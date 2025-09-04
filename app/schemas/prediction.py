from optparse import Option
from typing import Any
from pydantic import BaseModel
from datetime import datetime


class EventBase(BaseModel):
    id: int
    title: str
    description: str
    category: str
    start_time: datetime
    end_time: datetime
    correct_value: str | int

    class Config:
        from_attributes = True


class PredictionCreate(BaseModel):
    event_id: int
    predicted_value: str | int  # must be one of event.options

class PredictionOut(BaseModel):
    id: int
    event_id: int
    predicted_value: str | int
    submitted_at: datetime
    is_correct: int | None = None
    score: float | None = None
    event: EventBase   


    class Config:
        from_attributes = True
