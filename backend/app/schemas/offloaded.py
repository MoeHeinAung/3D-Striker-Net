from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OffloadedBase(BaseModel):
    draw_id: int
    master_dealer_id: int
    batch_id: int
    ticket: str
    amount: float
    note: Optional[str] = None

class OffloadedCreate(OffloadedBase):
    pass

class Offloaded(OffloadedBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
