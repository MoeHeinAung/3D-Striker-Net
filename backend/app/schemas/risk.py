from pydantic import BaseModel, Field

class RiskSummary(BaseModel):
    draw_id: int
    ticket: str
    total_amount: float
    holding: float = Field(..., alias="holding")

    class Config:
        from_attributes = True
        populate_by_name = True
