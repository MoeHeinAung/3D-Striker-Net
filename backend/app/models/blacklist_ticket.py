from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.db.base import Base

class BlacklistTicket(Base):
    __tablename__ = "blacklist_tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket = Column(String(3), nullable=False, index=True)
    reason = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
