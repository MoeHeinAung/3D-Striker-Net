from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Offloaded(Base):
    __tablename__ = "offloaded"

    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, nullable=False)
    master_dealer_id = Column(Integer, nullable=False)
    batch_id = Column(Integer, nullable=False)
    ticket = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())
