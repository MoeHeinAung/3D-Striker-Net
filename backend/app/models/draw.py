from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.sql import func
import enum
from app.db.base import Base

class DrawStatus(str, enum.Enum):
    OPEN = "OPEN"
    CLOSED = "CLOSED"
    SETTLED = "SETTLED"

class Draw(Base):
    __tablename__ = "draws"

    id = Column(Integer, primary_key=True, index=True)
    open_date = Column(DateTime, nullable=False)
    cutoff_time = Column(String, nullable=False) # Time as string for simplicity, or Time type
    status = Column(String, default=DrawStatus.OPEN.value)
    house_holding_amount = Column(Float, default=0.0)
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
