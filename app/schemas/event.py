from pydantic import BaseModel
from datetime import datetime


class EventOption(BaseModel):
    key: str       # e.g., "A"
    label: str     # e.g., "271–290 runs"



class EventCreate(BaseModel):
    title: str
    description: str | None = None
    category: str
    # options: list[EventOption]   # JSON string or comma-separated values
    options: list[int]   # JSON string or comma-separated values
    start_time: datetime
    end_time: datetime


class EventOut(BaseModel):
    id: int
    title: str
    description: str | None
    category: str
    # options: list[EventOption]
    options: list[int]
    start_time: datetime
    end_time: datetime
    is_closed: bool

    class Config:
        from_attributes = True



class UserResponse(BaseModel):
    id: int
    name: str
    score: float | None = None   # if you want score inside user

    class Config:
        from_attributes = True


class WinnerResponse(BaseModel):
    id: int
    reward: float
    user: UserResponse   # 👈 nested user object

    class Config:
        from_attributes = True
    

class EventResponse(BaseModel):
    id: int
    title: str
    description: str | None
    category: str
    start_time: datetime
    end_time: datetime
    options: list[str|int] = []

    is_closed: bool
    winner: list[WinnerResponse] = []

    class Config:
        from_attributes = True
