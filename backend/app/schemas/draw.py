from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from backend.app.models.draw import DrawStatus

class DrawBase(BaseModel):
    open_date: datetime
    cutoff_time: str
    note: Optional[str] = None

class DrawCreate(DrawBase):
    pass

class DrawUpdate(BaseModel):
    status: Optional[DrawStatus] = None
    note: Optional[str] = None

class DrawResponse(DrawBase):
    id: int
    status: DrawStatus
    created_at: datetime

    class Config:
        from_attributes = True
