from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.types import JSON
from app.database import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False)   # e.g., sports, finance, movies, weather
    options = Column(JSON, nullable=False)      # list[{"key": "A", "label": "271–290"}]
    start_time = Column(DateTime, nullable=False, default=datetime.now)
    end_time = Column(DateTime, nullable=False)
    is_closed = Column(Boolean, default=False)

    predictions = relationship("Prediction", back_populates="event")

