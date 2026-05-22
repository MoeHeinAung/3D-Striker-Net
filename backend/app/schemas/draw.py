from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.draw import DrawStatus

class DrawBase(BaseModel):
    open_date: datetime
    cutoff_time: str
    house_holding_amount: float = 0.0
    note: Optional[str] = None

class DrawCreate(DrawBase):
    pass

class DrawUpdate(BaseModel):
    open_date: Optional[datetime] = None
    cutoff_time: Optional[str] = None
    status: Optional[DrawStatus] = None
    house_holding_amount: Optional[float] = None
    note: Optional[str] = None

class DrawResponse(DrawBase):
    id: int
    status: DrawStatus
    created_at: datetime

    class Config:
        from_attributes = True
