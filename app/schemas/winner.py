from pydantic import BaseModel
from datetime import datetime

class WinnerBase(BaseModel):
    event_id: int
    user_id: int
    entries_won: int

class WinnerCreate(WinnerBase):
    pass

class WinnerOut(WinnerBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
