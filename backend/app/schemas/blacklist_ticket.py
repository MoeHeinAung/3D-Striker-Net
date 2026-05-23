from pydantic import BaseModel, Field
from typing import Optional

class BlacklistTicketBase(BaseModel):
    ticket: str = Field(..., pattern=r"^\d{3}$")
    reason: Optional[str] = None

class BlacklistTicketCreate(BlacklistTicketBase):
    pass

class BlacklistTicketResponse(BlacklistTicketBase):
    id: int

    class Config:
        from_attributes = True
