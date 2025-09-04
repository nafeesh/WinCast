from sqlalchemy import Column, Integer, ForeignKey, DateTime, func, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Winner(Base):
    __tablename__ = "winners"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    reward = Column(Float, default=0)  # how many entries gave them the win
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    event = relationship("Event", back_populates="winner")
    user = relationship("User", back_populates="winner")
