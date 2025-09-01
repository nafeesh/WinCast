import email
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    total_score: float   
    balance : float


    class Config:
        from_attributes = True  # replaces orm_mode=True in Pydantic v2


class UserResponse(BaseModel):
    username: str
    email: str
    total_score: float
    balance: float | None = None

    class Config:
        from_attributes = True    

class LeaderboardEntry(BaseModel):
    user_id: int
    username: str
    score: float

    class Config:
        from_attributes = True


class BalanceUpdate(BaseModel):
    user_id: int
    amount: float   # positive = add, negative = deduct
    reason: str | None = None


