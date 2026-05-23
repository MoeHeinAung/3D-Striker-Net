from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class WinningTicket(Base):
    __tablename__ = "winning_tickets"

    id = Column(Integer, primary_key=True, index=True)
    draw_id = Column(Integer, ForeignKey("draws.id"), nullable=False)
    ticket = Column(String(3), nullable=False)
    type = Column(String, nullable=False) # 'JACKPOT' or 'MINOR'
    created_at = Column(DateTime, server_default=func.now())
