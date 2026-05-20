from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.sql import func
import enum
from backend.app.db.base import Base

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
    note = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
