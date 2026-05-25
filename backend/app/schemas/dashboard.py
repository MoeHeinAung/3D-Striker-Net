from pydantic import BaseModel

class RiskMetrics(BaseModel):
    totalSaleAmount: float
    totalHouseHoldingAmount: float
    pendingAmount: float
    offloadedAmount: float

class NextDraw(BaseModel):
    cutoffDatetime: str
