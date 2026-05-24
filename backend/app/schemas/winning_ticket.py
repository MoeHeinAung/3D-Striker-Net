from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional

class WinningTicketType(str, Enum):
    JACKPOT = "JACKPOT"
    MINOR = "MINOR"

class WinningTicketBase(BaseModel):
    draw_id: int
    ticket: str = Field(..., pattern=r"^\d{3}$")
    type: WinningTicketType
    amount: Optional[float] = None

class WinningTicketCreate(WinningTicketBase):
    pass

class WinningTicketResponse(WinningTicketBase):
    id: int

    class Config:
        from_attributes = True
