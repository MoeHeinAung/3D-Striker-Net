from pydantic import BaseModel

class RiskSummary(BaseModel):
    draw_id: int
    ticket: str
    total_amount: float

    class Config:
        from_attributes = True
