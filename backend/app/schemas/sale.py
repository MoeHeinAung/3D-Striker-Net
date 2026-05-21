from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class SaleBase(BaseModel):
    draw_id: int
    agent_id: str = Field(..., min_length=3, max_length=3)
    ticket: str = Field(..., pattern=r"^\d{3}$")
    amount: float
    batch_id: str
    note: Optional[str] = None

class SaleCreate(SaleBase):
    pass

class SaleResponse(SaleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
