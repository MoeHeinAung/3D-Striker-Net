from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class Offloaded(Base):
    __tablename__ = "offloaded"

    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    master_dealer_id = Column(String(3), ForeignKey("master_dealers.id"), nullable=False)
    page_no = Column(Integer)
    ticket = Column(String(3), nullable=False)
    amount = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
