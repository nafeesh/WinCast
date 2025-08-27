from sqlalchemy import Column, Integer, String, Float
from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)

    predictions = relationship("Prediction", back_populates="user")

    total_score = Column(Float, default=0.0)  # cumulative score across predictions
    balance = Column(Float, default=0.0)

