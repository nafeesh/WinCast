from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    option_key = Column(String, nullable=False)
    score = Column(Float, default=0.0)  # accuracy score
    entries = Column(Integer, default=0)  # tickets earned

    user = relationship("User", back_populates="predictions")
    event = relationship("Event", back_populates="predictions")
