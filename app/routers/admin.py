# app/routers/admin.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import BalanceUpdate

router = APIRouter()

@router.post("/balance/update")
def update_user_balance(data: BalanceUpdate, db: Session = Depends(get_db)):
    user = db.query(User).get(data.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_balance = user.balance + data.amount
    if new_balance < 0:
        raise HTTPException(status_code=400, detail="Insufficient balance")

    user.balance = new_balance
    db.commit()
    db.refresh(user)
    return {"message": "Balance updated", "user_id": user.id, "new_balance": user.balance}
