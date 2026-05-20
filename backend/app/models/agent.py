from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String(3), primary_key=True, index=True)
    name = Column(String, nullable=False)
    commission = Column(Float, nullable=False)
    jp_factor = Column(Float, nullable=False)
    sp_factor = Column(Float, nullable=False)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
