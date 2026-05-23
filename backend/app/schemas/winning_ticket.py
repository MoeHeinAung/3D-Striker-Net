from pydantic import BaseModel, Field

class WinningTicketBase(BaseModel):
    draw_id: int
    ticket: str = Field(..., pattern=r"^\d{3}$")
    amount: float

class WinningTicketCreate(WinningTicketBase):
    pass

class WinningTicketResponse(WinningTicketBase):
    id: int

    class Config:
        from_attributes = True
