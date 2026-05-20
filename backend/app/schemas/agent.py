from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class AgentBase(BaseModel):
    name: str
    commission: float
    jp_factor: float
    sp_factor: float
    note: Optional[str] = None

class AgentCreate(AgentBase):
    id: str = Field(..., min_length=3, max_length=3, pattern="^[a-zA-Z]{3}$")

class AgentResponse(AgentBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
