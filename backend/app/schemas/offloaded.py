from pydantic import BaseModel
from datetime import datetime

class OffloadedBase(BaseModel):
    draw_id: int
    master_dealer_id: str
    page_no: int
    ticket: str
    amount: float
    note: str | None = None

class OffloadedCreate(OffloadedBase):
    pass

class OffloadedResponse(OffloadedBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
