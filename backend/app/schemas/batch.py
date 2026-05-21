from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
from app.schemas.sale import SaleResponse

class BatchBase(BaseModel):
    draw_id: int
    agent_id: str = Field(..., min_length=3, max_length=3)
    total_amount: float = 0.0
    note: Optional[str] = None

class BatchCreate(BatchBase):
    pass

class BatchResponse(BatchBase):
    id: int
    created_at: datetime
    sales: List[SaleResponse] = []

    class Config:
        from_attributes = True
