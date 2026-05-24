from pydantic import BaseModel, Field
from enum import Enum

class BlacklistTicketType(str, Enum):
    HALF = "HALF"
    BLOCK = "BLOCK"

class BlacklistTicketBase(BaseModel):
    draw_id: int
    ticket: str = Field(..., pattern=r"^\d{3}$")
    type: BlacklistTicketType

class BlacklistTicketCreate(BlacklistTicketBase):
    pass

class BlacklistTicketResponse(BlacklistTicketBase):
    id: int

    class Config:
        from_attributes = True
