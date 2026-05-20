from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class MasterDealerBase(BaseModel):
    name: str
    commission: float
    jp_factor: float
    sp_factor: float
    note: Optional[str] = None

class MasterDealerCreate(MasterDealerBase):
    id: str = Field(..., min_length=3, max_length=3, pattern="^[a-zA-Z]{3}$")

class MasterDealerResponse(MasterDealerBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
