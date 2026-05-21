from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    agent_id = Column(String(3), ForeignKey("agents.id"), nullable=False)
    ticket = Column(String(3), nullable=False)
    amount = Column(Float, nullable=False)
    batch_id = Column(String, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
